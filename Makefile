.PHONY: build compile test clean essentials release_major release_minor patch publish

name:=$$(cat package.json | grep name | awk '{print $3}' | sed -E 's/\"|,//g')

define MAKE_HELP
Usage: make
  \033[0;34m essentials \033[0m\
	\t\t\t\t\
	\033[0;33m Install essentials packages required in the build process \033[0m
endef

define SERVER_HEADERS
"access-control-expose-headers": "content-length",\
"Access-Control-Allow-Origin": "*",\
"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Range, Content-Length, If-None-Match",\
"Cache-Control": "no-cache, must-revalidate",\
"Content-Type": "text/html; charset=utf-8"
endef
#--transform varify
define BROWSERIFY_FLAGS
./index.js \
--standalone MVD \
--plugin browserify-varify \
--debug \
--outfile ./dist/bundle.js \
--verbose
endef

define UGLIFYJS_FLAGS
--output ./dist/bundle.min.js \
--compress \
--mangle \
--screw-ie8 \
--stats \
--mangle-props \
--verbose
endef

export MAKE_HELP

check_defined = \
		$(foreach 1,$1,$(__check_defined))
__check_defined = \
		$(if $(value $1),, \
			$(error Undefined $1$(if $(value 2), ($(strip $2)))))

all: clean essentials build

essentials:
	if [  ! -d ./node_modules ] ; then npm install; fi;

watch:
	mkdir -p ./dist/
	./node_modules/.bin/watchify $(BROWSERIFY_FLAGS)

compile: essentials
	mkdir -p ./dist/
	./node_modules/.bin/browserify $(BROWSERIFY_FLAGS)

build: compile
	cat ./dist/bundle.js \
	| ./node_modules/uglifyjs/bin/uglifyjs $(UGLIFYJS_FLAGS)

server_start: server_stop
	@./node_modules/.bin/static .\
		-c 0 \
		-a 0.0.0.0 \
		-p 3000 \
		-H '{$(SERVER_HEADERS)}' \
		> /tmp/${name}-server.log & \
		echo $$! > /tmp/${name}-server.pid

server_stop:
	-@[ -f "/tmp/${name}-server.pid" ] && kill `cat "/tmp/${name}-server.pid"` && rm -f "/tmp/${name}-server.pid";

release: release_major

publish: release_major

release_minor:
	./node_modules/.bin/npm-bump minor

release_major:
	./node_modules/.bin/npm-bump major

patch:
	./node_modules/.bin/npm-bump patch

clean:
	@rm -rf ./dist/

help:
	@echo "$$MAKE_HELP"

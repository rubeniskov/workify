.PHONY: all test build watch_stop watch dev major minor patch env

PROJECT_NAME := $(shell node_modules/.bin/miniquery -p 'name' ./package.json)

BABEL_FLAGS = \
src \
--out-dir lib \
--copy-files

BROWSERIFY_FLAGS = \
./index.js \
--standalone workify \
--debug \
--outfile ./dist/bundle.js \
--verbose

UGLIFYJS_FLAGS = \
./dist/bundle.js \
--output ./dist/bundle.min.js \
--noerr \
--mangle \
--mangle-props \
--stats

SERVER_HEADERS = \
"Access-Control-Expose-Headers": "content-length", \
"Access-Control-Allow-Origin": "*", \
"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Range, Content-Length, If-None-Match", \
"Cache-Control": "no-cache, must-revalidate", \
"Content-Type": "text/html; charset=utf-8"

define kill_process
$(eval TIM := $(shell echo "$(1)"))
$(eval FID := $(shell echo "/tmp/${PROJECT_NAME}-$(TIM).pid"))
@if [ -f $(FID) ]; then \
PID=$$(cat $(FID)) \
TIMEOUT=6 \
&& while ((TIMEOUT > 0)) && kill -9 $$(ps -axo pid,ppid | grep $$PID | awk '{print $$1}') 2>/dev/null; do ((TIMEOUT -= 1)); sleep 1; done \
&& echo "\033[0;34m[${PROJECT_NAME}]\033[0m Stopping $(TIM) process $$PID" \
&& rm -f $(FID); \
fi
endef

define log_trace
$(eval 2 ?= 34)
@echo "\033[0;$(2)m[${PROJECT_NAME}]\033[0m $(1)"
endef

compile: build minify

build:
	$(call log_trace,Building)
	@mkdir -p ./lib/ \
	&& ./node_modules/.bin/babel $(BABEL_FLAGS) \
	&& mkdir -p ./dist/ \
	&& ./node_modules/.bin/browserify $(BROWSERIFY_FLAGS)

minify:
	$(call log_trace,Minifing build)
	@./node_modules/.bin/uglifyjs \
	$(UGLIFYJS_FLAGS) 2>&1 >/dev/null | grep -v 'DeprecationWarning'
	$(call log_trace,Done! 🍻,32)

watch_tests_stop:
	$(call kill_process,watch-tests);

watch_tests:
	$(call log_trace,Watching tests)
	@sleep 5 \
	&& ./node_modules/.bin/mocha --watch -- test/specs.js & \
	echo $$! > "/tmp/${PROJECT_NAME}-watch-tests.pid"
	$(call log_trace,Done!,32)

watch_files_stop:
	$(call kill_process,watch-files);

watch_files:
	$(call log_trace,Watching files)
	@mkdir -p ./lib/ \
	&& ./node_modules/.bin/babel --watch $(BABEL_FLAGS) & \
	echo $$! > "/tmp/${PROJECT_NAME}-watch-files.pid"
	$(call log_trace,Done!,32)

watch: watch_tests watch_files
	$(call log_trace,Watching project,32)
	@trap 'echo "\n" && for pid in $$(cat /tmp/${PROJECT_NAME}-*.pid 2>/dev/null); do \
				echo "\033[0;35m[${PROJECT_NAME}]\033[0m Kill process $$pid" && kill -9 $$pid 2>/dev/null; \
				done; rm -f /tmp/${PROJECT_NAME}-*.pid' EXIT; \
	sleep 172800 > /dev/null & pid=$$!; echo $$pid > "/tmp/${PROJECT_NAME}-live.pid"; wait $$pid;

watch_stop: watch_tests_stop watch_files_stop
	$(call log_trace,Watch stopped,32)

test: test_node test_browser server_stop
	$(call log_trace,Testing finished,32)

test_node: server_start
	$(call log_trace,Testing NodeJS)
	@./node_modules/.bin/istanbul cover \
		 ./node_modules/.bin/mocha -- test/specs.js \
  && node_modules/.bin/codecov

test_browser: server_start
	$(call log_trace,Testing Browser)
	@./node_modules/.bin/karma start ./.karma.conf.js

server_start: server_stop
	$(call log_trace,Starting Server)
	@rm -f /tmp/${PROJECT_NAME}-server.log \
	&& ./node_modules/.bin/static .\
		-c 0 \
		-a 0.0.0.0 \
		-p 3000 \
		-H '{${SERVER_HEADERS}}' \
		> /tmp/${PROJECT_NAME}-server.log & \
		echo $$! > "/tmp/${PROJECT_NAME}-server.pid"

server_stop:
	$(call log_trace,Sopping Server)
	$(call kill_process,server)
	@[ -f "/tmp/${PROJECT_NAME}-server.log" ] \
	&& cat /tmp/${PROJECT_NAME}-server.log || \
	echo > /dev/null

major:
	./node_modules/.bin/npm-bump major

minor:
	./node_modules/.bin/npm-bump minor

patch:
	@./node_modules/.bin/npm-bump patch

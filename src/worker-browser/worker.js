import Process from './process';
import utils from './utils';
import http from 'stream-http';

var bundleFn = utils.bundleFn;
var sources = utils.sources;
var cache = utils.cache;
var stringify = JSON.stringify;

export default class WebWorker extends Process {
    constructor(worker, options) {
        super(options);
        var self = this;
        self._worker = worker instanceof(global.DedicatedWorkerGlobalScope || utils.noop);
        self._async = false;
        self.once('initialized', function(worker){
            this.stdio.ipc.channel = worker;
        });

        if (self._worker) {
            self.emit('initialized', worker);
        } else {
            if (typeof(worker) === 'string') {
                try {
                    worker = require(worker);
                } catch (ex) {
                    self._async = true;
                    http.get(worker, function(res) {
                        worker = '';
                        res.on('data', function(buf) {
                            worker += buf.toString('utf8');
                        });

                        res.on('end', function() {
                            self.instantiate(worker, options);
                        });
                    });
                }
            }
            self._async === false && self.instantiate(worker, options);
        }
    }
    instantiate(worker, options) {
        var self = this,
            type = typeof(worker),
            wkey;

        var injects = {
            'self': 'w',
            'process': 'w',
            'postMessage': 'w.postMessage.bind(w)',
            'addEventListener': 'w.addEventListener.bind(w)',
            'removeEventListener': 'w.removeEventListener.bind(w)',
            'onmessage': 'w.onmessage',
            'onerror': 'w.onerror'
        }

        var ckey = utils.moduleKey(WebWorker);

        var cacheKeys = Object.keys(cache);

        if (type === 'function' || type === 'object')
            wkey = utils.moduleKey(worker);

        if (!wkey) {
            wkey = utils.uid();
            var wcache = {};
            for (var i = 0, l = cacheKeys.length; i < l; i++) {
                var key = cacheKeys[i];
                wcache[key] = key;
            }
            sources[wkey] = [
                Function(['require', 'module', 'exports'], [
                    'module.exports = function(' + Object.keys(injects) + '){',
                    worker,
                    'self.onmessage = onmessage;',
                    'self.onerror = onerror;',
                    '}'
                ].join('\n')),
                wcache
            ];
        }
        var skey = utils.uid();

        var scache = {};
        scache[wkey] = wkey;
        scache['_worker'] = ckey;
        sources[skey] = [
            Function(['require'], (
                'var f = require(' + stringify(wkey) + '),' +
                '    w = require("_worker");' +
                '(f.default ? f.default : f).call((w = new (w.default ? w.default : w)(self)), '+ Object.keys(injects).map(key=>injects[key]) +');'
            )),
            scache
        ];

        var workerSources = {};
        resolveSources(skey);

        function resolveSources(key) {
            workerSources[key] = true;

            for (var depPath in sources[key][1]) {
                var depKey = sources[key][1][depPath];
                if (!workerSources[depKey]) {
                    resolveSources(depKey);
                }
            }
        }

        var src = utils.bundle(workerSources, skey);

        var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

        var blob = new Blob([src], {
            type: 'text/javascript'
        });
        if (options && options.bare) {
            return blob;
        }
        var workerUrl = URL.createObjectURL(blob);
        var worker = new Worker(workerUrl);
        worker.objectURL = workerUrl;
        self._handler = worker;
        self.emit('initialized', worker);
        return worker;
    }
};

global.process = new Process();

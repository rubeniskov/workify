'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _worker = require('./worker');

var _worker2 = _interopRequireDefault(_worker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//import Worker from './worker';

var StreamWroker = function StreamWroker(worker, options) {
    _classCallCheck(this, StreamWroker);

    console.log('StreamWorker constructor');
};

//
// const
//     Stream = require('stream'),
//     DedicatedWorkerGlobalScope = global.DedicatedWorkerGlobalScope ||   function() {},
//     workerify = require('webworkify'),
//     WorkerStream =
//     module.exports =
//     Stream.create({
//     __constructor(worker, options) {
//         var self = this;
//         options = options || {}
//
//         self.worker = worker instanceof DedicatedWorkerGlobalScope ?
//             worker :
//             workerify(typeof(worker) === 'string' ?
//                 require(worker) :
//                 worker, options);
//
//         self.worker.addEventListener('message', function(event) {
//             switch (event.data.method) {
//                 case 'push':
//                     self.emit('data', event.data.args[0]);
//                     break;
//                 case 'flush':
//                     self.emit('end', event.data.args[0]);
//                     break;
//             }
//         });
//     },
//     push: function(chunk) {
//         this.worker.postMessage({
//             method: 'push',
//             args: Array.prototype.slice.call(arguments)
//         });
//     },
//     flush: function() {
//         this.worker.postMessage({
//             method: 'flush',
//             args: Array.prototype.slice.call(arguments)
//         });
//     }
// })


exports.default = StreamWroker;
module.exports = exports['default'];
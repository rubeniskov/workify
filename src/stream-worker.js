import Worker from './worker';
//import Worker from './worker';

export default class StreamWroker {
    constructor(worker, options) {
        console.log('StreamWorker constructor');
    }
}

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

import Worker from './worker';
import Stream from './stream';

export default class StreamWroker extends Stream {
    constructor(worker, options) {
        super();
        var self = this;
        self.worker = worker instanceof(Worker) ? worker : new Worker(worker, options);
        self.worker.addEventListener('message', function(event) {
            switch (event.data.method) {
                case 'push':
                    self.emit('data', event.data.chunk);
                    break;
                case 'flush':
                    self.emit('end', event.data.chunk);
                    break;
            }
        });
    }
    push(chunk) {
        this.worker.postMessage({
            method: 'push',
            chunk: chunk
        });
    }
    flush(chunk) {
        this.worker.postMessage({
            method: 'flush',
            chunk: chunk
        });
    }
}

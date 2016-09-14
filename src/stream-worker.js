import Worker from './worker';

export default class StreamWroker {
    constructor(worker, options) {
        self.worker = new Worker(worker, options);
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
    flush() {
        this.worker.postMessage({
            method: 'flush',
            chunk: chunk
        });
    }
}

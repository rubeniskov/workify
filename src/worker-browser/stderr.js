import { Writable } from 'readable-stream';

export default class Stderr extends Writable {
    constructor(options){
        super();
    }
    _write(chunk, encoding, callback) {
        //'TTY'
        console.error(chunk.toString('utf8'));
        callback();
    }
};

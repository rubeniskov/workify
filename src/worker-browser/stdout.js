import {
    Writable
} from 'readable-stream';

export default class Stdout extends Writable {
    constructor(options) {
        super({
            highWaterMark: 0
        });
    }
    _write(chunk, encoding, callback) {
        //'TTY'
        console.log(chunk.toString('utf8'));
        callback();
    }
};

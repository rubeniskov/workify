import { Duplex, Readable } from 'readable-stream';

export default class Stdout extends Readable {
    constructor(channel, options) {
        super(options);
    }
    _read(size){
        return new Buffer('tu puta madre');
    }
    write(chunk, encoding, cb) {
        if (typeof chunk !== 'string' && !(chunk instanceof Buffer)) {
            throw new TypeError('Invalid data, chunk must be a string or buffer, not ' + typeof chunk);
        }
        //return Duplex.prototype.write.apply(this, arguments);
    }
};

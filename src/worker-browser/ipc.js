import EventEmitter from 'events';
import bson from 'bson';

export default class Ipc extends EventEmitter {
    constructor() {
        super();
        var self = this,
            channel;
        Object.defineProperty(this, 'channel', {
            configurable: false,
            enumerable: false,
            get() {
                return channel
            },
            set(ch) {
                (channel = ch).onmessage = function(event) {
                    var packet = bson.BSON.prototype.deserialize(new Buffer(new Uint8Array(event.data)));
                    self.emit(packet.type, packet);
                };
            }
        })
    }
    send(data) {
        this._send({
            type: 'message',
            data: data
        })
    }
    _send(packet) {
        var buf = bson.BSON.prototype.serialize(packet);
        this.channel && this.channel.postMessage(buf.buffer, [buf.buffer]);
    }
};

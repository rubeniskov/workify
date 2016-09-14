export default class Stream {
    constructor(worker, options) {
        var listeners = {};
        /**
         * Add a listener for a specified event type.
         * @param type {string} the event name
         * @param listener {function} the callback to be invoked when an event of
         * the specified type occurs
         */
        this.on = function(type, listener) {
            if (!listeners[type]) {
                listeners[type] = [];
            }
            listeners[type].push(listener);
        };
        /**
         * Remove a listener for a specified event type.
         * @param type {string} the event name
         * @param listener {function} a function previously registered for this
         * type of event through `on`
         */
        this.off = function(type, listener) {
            var index;
            if (!listeners[type]) {
                return false;
            }
            index = listeners[type].indexOf(listener);
            listeners[type].splice(index, 1);
            return index > -1;
        };
        /**
         * Trigger an event of the specified type on this stream. Any additional
         * arguments to this function are passed as parameters to event listeners.
         * @param type {string} the event name
         */
        this.trigger = this.emit = function(type) {
            var callbacks, i, length, args;
            callbacks = listeners[type];
            if (!callbacks) {
                return;
            }
            // Slicing the arguments on every invocation of this method
            // can add a significant amount of overhead. Avoid the
            // intermediate object creation for the common case of a
            // single callback argument
            if (arguments.length === 2) {
                length = callbacks.length;
                for (i = 0; i < length; ++i) {
                    callbacks[i].call(this, arguments[1]);
                }
            } else {
                args = [];
                i = arguments.length;
                for (i = 1; i < arguments.length; ++i) {
                    args.push(arguments[i]);
                }
                length = callbacks.length;
                for (i = 0; i < length; ++i) {
                    callbacks[i].apply(this, args);
                }
            }
        };
        /**
         * Destroys the stream and cleans up.
         */
        this.dispose = function() {
            listeners = {};
        };
    }
    pipe(destination) {
        this.on('data', function(data) {
            destination.push(data);
        });

        this.on('done', function(flushSource) {
            destination.flush(flushSource);
        });

        return destination;
    }
    push(data) {
        this.trigger('data', data);
    }
    flush(flushSource) {
        this.trigger('done', flushSource);
    }
}

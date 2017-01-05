var Worker = (function() {
    try {
        return workify.Worker
    } catch (_) {
        return require('../../..').Worker
    }
})()

var worker = new Worker('./worker.js');

var last = new Date().getTime();

worker.postMessage('Main sync');

worker.onmessage = function(event) {
    var cur = new Date().getTime();
    process.stdout.write("Worker said : " + event.data + ' ' + (cur - last) + '\n');
    last = cur;
};

setInterval(function() {
    worker.postMessage('ali');
}, 1000);

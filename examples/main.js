var workify = workify ? workify : require('..');

var worker = new (workify.Worker)('./worker.js');

var last = new Date().getTime();

worker.onmessage = function(event) {
    var cur = new Date().getTime();
    process.stdout.write("Worker said : " + event.data + ' ' + (cur - last) + '\n');
    last = cur;
};

setInterval(function() {
    worker.postMessage('ali');
}, 1000);

var worker = new (require('../').Worker)('./worker.js');

    worker.onmessage = function(event) {
        console.log("Worker said : " + event.data);
    };

    setInterval(function(){
        worker.postMessage('ali');
    }, 1000);

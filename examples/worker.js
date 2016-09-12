onmessage = function(event) {
    console.log("Main said : " + event.data);
};

postMessage('jueri sync');

setInterval(function(){
    postMessage('jueri');
}, 1000);

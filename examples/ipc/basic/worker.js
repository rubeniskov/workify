onmessage = function(event) {
    console.log("Main said : " + event.data);
};

setInterval(function(){
    postMessage('foo');
}, 2000);

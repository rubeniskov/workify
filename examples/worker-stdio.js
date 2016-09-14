var last = new Date().getTime();

postMessage('Worker sync');

onmessage = function(event) {
    var cur = new Date().getTime();
    process.stdout.write("Main said : " + event.data + ' ' + (cur - last) + '\n');
    last = cur;
};

setInterval(function(){
    postMessage('jueri');
}, 1000);


process.stdin.on('data', function(chunk){
    console.log('read chunk from stdin', chunk.toString());
})

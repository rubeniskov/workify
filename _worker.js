process.stdin.on('data', function(chunk){
   console.log('This is a worker chunk:', chunk);
});

process.stdout.write(new Buffer('jajaja'), 'binary', function(){
    console.log(arguments);
});

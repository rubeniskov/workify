//process.execArgv =  ["--debug=9999"];
var stream = require('readable-stream'),
    PassThrough = stream.PassThrough,
    child_process = require('child_process');
    stdin = new PassThrough(),
    stdout = new PassThrough(),
    stderr = new PassThrough(),
    worker = child_process.fork('./worker.js', [1,2,3,4,'--jajasjjasd=5859'], {
        stdio: [0,1,2]
    });

    stdin.on('data', function(){
        console.log('stdin' ,arguments);
    });

    stdout.on('data', function(){
        console.log('stdout' ,arguments);
    });

    stderr.on('data', function(){
        console.log('stderr' ,arguments);
    });

    console.log(worker);

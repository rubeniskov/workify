var n=0
console.log('init');
return function (t) {
    console.log(~~(44100/1024*t));
    var x = Math.sin(t * 262 + Math.sin(n));
    n += Math.sin(t);
    return x;
}

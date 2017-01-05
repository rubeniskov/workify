module.exports = function(b, opts){
    return typeof(b) === 'string'
    ? require('./lib/browserify/transform').default.call(this, b, opts)
    : require('./lib/browserify/plugin').default.call(this, b, opts)
};

export var utils = {
    bundleFn: arguments[3],
    cache: arguments[5],
    sources: arguments[4],
    stringify: JSON.stringify,
    uid(){
        return Math.floor(Math.pow(16, 8) * Math.random()).toString(16);
    },
    noop() {},
    moduleKey(module) {
        var mkey, cacheKeys = Object.keys(utils.cache);

        for (var i = 0, l = cacheKeys.length; i < l; i++) {
            var key = cacheKeys[i],
                exp = utils.cache[key].exports;
            if (exp === module || exp && exp.default === module) {
                mkey = key;
                break;
            }
        }
        return mkey;
    },
    bundle(sources, main){
      return '(' + utils.bundleFn + ')({' + Object.keys(sources).map(function(key) {
          return utils.stringify(key) + ':[' + utils.sources[key][0] + ',' + utils.stringify(utils.sources[key][1]) + ']';
      }).join(',') + '},{},[' + utils.stringify(main) + '])'
    }
};

export default utils;

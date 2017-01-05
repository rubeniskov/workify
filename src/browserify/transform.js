import Transform from 'readable-stream/transform';
import acornGlobals from 'acorn-globals';
import MagicString from 'magic-string';

export class WorkifyTransform extends Transform {
    static factory(filename, opts) {
        return new WorkifyTransform(opts);
    }
    constructor(options) {
        super(options);
        this._contents = '';
        this._options = {
            replacements: options && options.replacements || {
                "process": "global.process"
            }
        }
    }
    _transform(chunk, enc, done) {
        this._contents += chunk.toString('utf8');
        done();
    }
    _flush(done) {
        var self = this;
        try {
            var globals = acornGlobals(this._contents);
            var magicString = new MagicString(this._contents);
            globals.forEach(function(theGlobal) {
                if (theGlobal.name in self._options.replacements && self._options.replacements.hasOwnProperty(theGlobal.name)) {
                    theGlobal.nodes.forEach(function(node) {
                        magicString.overwrite(node.start, node.end, self._options.replacements[theGlobal.name]);
                    });
                }
            });
            this._contents = magicString.toString();
        } catch (e) {}
        this.push(this._contents);
        done();
    }
}

export default WorkifyTransform.factory

import WorkifyTransform from './transform';
import Transform from 'readable-stream/transform';
import path from 'path';

export class WorkifyPlugin {
    static factory(b, opts) {
        if (typeof(b) === 'string')
            return WorkifyTransform.factory(b, opts);
        return new WorkifyPlugin(b, opts);
    }
    constructor(bundler, options) {
        let cwd = options.basedir || bundler._options.basedir || process.cwd(),
            map = {};
        // prevent include twice workify transform
        bundler.on('_ready', function() {
            bundler._transforms = bundler._transforms.filter((tr) => !(/workify\/index\.js/).test(tr.transform));
        });

        bundler.pipeline.get('label').push(Transform({
            objectMode: true,
            transform: function(row, enc, next) {
                map[row.id] = path.resolve(cwd, row.file);
                console.error(row.id, row.file);
                next(null, row);
            }
        }));
        // bundler.transform(new WorkifyTransform(options));
    }
}

export default WorkifyPlugin.factory

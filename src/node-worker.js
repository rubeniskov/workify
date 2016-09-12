import { Worker } from 'webworker-threads';

export default class NodeWorker extends Worker {
    constructor(worker, options){
        if(typeof(worker)==='string')
            worker = path.resolve(path.dirname(module.parent.parent.parent.filename), worker);
        super(worker, options);
    }
};

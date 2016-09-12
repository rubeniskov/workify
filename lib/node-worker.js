'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _webworkerThreads = require('webworker-threads');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NodeWorker = function (_Worker) {
    _inherits(NodeWorker, _Worker);

    function NodeWorker(worker, options) {
        _classCallCheck(this, NodeWorker);

        if (typeof worker === 'string') worker = path.resolve(path.dirname(module.parent.parent.parent.filename), worker);
        return _possibleConstructorReturn(this, (NodeWorker.__proto__ || Object.getPrototypeOf(NodeWorker)).call(this, worker, options));
    }

    return NodeWorker;
}(_webworkerThreads.Worker);

exports.default = NodeWorker;
;
module.exports = exports['default'];
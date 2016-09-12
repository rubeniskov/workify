'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StreamWroker = exports.Worker = undefined;

var _worker = require('./worker');

var _worker2 = _interopRequireDefault(_worker);

var _streamWorker = require('./stream-worker');

var _streamWorker2 = _interopRequireDefault(_streamWorker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Worker = _worker2.default;
exports.StreamWroker = _streamWorker2.default;
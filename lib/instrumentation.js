const { patchModules } = require('./patch');
const Segment = require('./segment');

const MODULES_TO_PATCH = [
  'http',
];

class Instrumentation {
  constructor(config) {
    this._config = config
    this._currentSegment = null;
  }

  start() {
    this._patchModules();
  }

  createSegment() {
    const segment = new Segment(this.onEndSegment);
    // TODO: create a way to use with asyncHooks
    this._currentSegment = segment;
    return segment;
  }

  onEndSegment(segment) {
    console.log(segment.ecode());
  }

  _patchModules() {
    this._config.logger.info('Patching modules');
    patchModules(MODULES_TO_PATCH, this);
  }
}

module.exports = {
  Instrumentation,
}

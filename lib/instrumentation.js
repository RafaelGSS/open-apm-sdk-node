const { patchModules } = require('./patch');
const { AsyncLocalStorage } = require('async_hooks');
const Segment = require('./segment');

const MODULES_TO_PATCH = [
  'http',
];

class Instrumentation {
  constructor(config) {
    this._config = config
    this._currentSegment = null;
    this.trace = new AsyncLocalStorage();
  }

  start() {
    this._patchModules();
  }

  createSegment() {
    const existSegment = this.trace.getStore();
    if (existSegment) {
      const segment = new Segment(this.onEndSegment);
      existSegment.addSubSegment(new Segment());
      return Promise.resolve(segment);
    }
    const segment = new Segment(this.onEndSegment);
    return new Promise((resolve) => {
      this.trace.run(segment, () => {
        resolve(segment);
      });
    });
  }

  /**
   * @param segment Segment
   */
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

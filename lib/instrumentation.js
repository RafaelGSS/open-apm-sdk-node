const { patchModules } = require('./patch');
const { AsyncLocalStorage } = require('async_hooks');
const Segment = require('./segment');
const util = require('util');

const MODULES_TO_PATCH = [
  'http',
];

class Instrumentation {
  constructor(config) {
    this._config = config
    this._currentSegment = null;
    // TODO: change it to an abstraction
    this.trace = new AsyncLocalStorage();
  }

  start() {
    this._patchModules();
  }

  createSegment(after) {
    const existSegment = this.trace.getStore();
    const segment = new Segment(this.onEndSegment, 'rootSegment');
    if (existSegment) {
      throw new Error('Here not enter yet');
    }
    return this.trace.run(segment, () => {
      after(segment);
    });
  }

  traceSync(name, after) {
    const existSegment = this.trace.getStore();
    if (!existSegment) {
      throw new Error('The current context not exists');
    }
    const subsegment = new Segment(null, name);
    existSegment.addSubSegment(subsegment);
    return this.trace.run(subsegment, () => {
      after();
      subsegment.end();
    });
  }

  traceAsync(name, func) {
    const existSegment = this.trace.getStore();
    if (!existSegment) {
      throw new Error('The current context not exists');
    }

    const subsegment = new Segment(null, name);
    existSegment.addSubSegment(subsegment);
    return this.trace.run(subsegment, async () => {
      const result = await func();
      subsegment.end();
      return result;
    });
  }

  /**
   * @param segment Segment
   */
  onEndSegment(segment) {
    console.info(util.inspect(segment.ecode(), { showHidden: false, depth: null }));
  }

  _patchModules() {
    this._config.logger.info('Patching modules');
    patchModules(MODULES_TO_PATCH, this);
  }
}

module.exports = {
  Instrumentation,
}

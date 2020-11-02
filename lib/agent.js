const { Instrumentation } = require('./instrumentation')

function getdefaultConfig() {
  const logFactory = require('debug');
  return {
    logger: {
      info: logFactory('open-apm:info'),
      debug: logFactory('open-apm:debug'),
      warn: logFactory('open-apm:warn'),
      fatal: logFactory('open-apm:fatal'),
    }
  }
}

class Agent {
  constructor(config) {
    this._loadConfig(config);
    this._instrumentator = new Instrumentation({ logger: this._config.logger });
  }

  start() {
    this._instrumentator.start();
    this._config.logger.info('Started OpenAPM agent');
  }

  wrap(cb, name, isAsync = false) {
    const nameTrace = name || cb.name;
    if (isAsync) {
      return () => this._instrumentator.traceAsync(nameTrace, cb);
    }
    return () => this._instrumentator.traceSync(nameTrace, cb);
  }

  _loadConfig(config) {
    this._config = { ...getdefaultConfig(), ...config };
  }
}

module.exports = Agent;

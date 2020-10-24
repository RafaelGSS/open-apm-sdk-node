// This file should be required on the first moment to prevent bugs on patching
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

  _loadConfig(config) {
    this._config = { ...getdefaultConfig(), ...config };
  }

  start() {
    this._instrumentator.start();
    this._config.logger.info('Started OpenAPM agent');
  }
}

module.exports = Agent;

// This file should be required on the first moment to prevent bugs on patching

function getdefaultConfig() {
  return {
    level: 'info', // TODO: adjust to one level
    logger: require('pino')({ level: 'info' })
  }
}

class Agent {
  constructor(config) {
    this._loadConfig(config)
    this._config.logger.info('Starting OpenAPM agent')
  }

  _loadConfig(config) {
    if (config) {
      // TODO: use default on missing parameters
      this._config = config
    } else {
      this._config = getdefaultConfig()
    }
  }
}


module.exports = Agent
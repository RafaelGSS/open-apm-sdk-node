const MODULES_TO_PATCH = [
  'http',
];

class Instrumentation {
  constructor(config) {
    this._config = config
  }

  start() {
    this._patchModules();
  }

  _patchModules() {
    this._config.logger.info('Patching modules')
  }
}

module.exports = {
  Instrumentation,
}

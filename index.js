'use strict'

const Agent = require('./lib/agent')

export let globalAgent = null;

module.exports = function (config) {
  globalAgent = new Agent(config);
  return globalAgent;
}

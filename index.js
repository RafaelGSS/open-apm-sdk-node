'use strict'

const Agent = require('./lib/agent')

let globalAgent = null;

module.exports.globalAgent = globalAgent;

module.exports = function (config) {
  globalAgent = new Agent(config);
  return globalAgent;
}

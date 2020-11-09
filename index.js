'use strict'

const Agent = require('./lib/agent')

const globalAgent = new Agent();
globalAgent.start();

module.exports = globalAgent;
module.exports.default = module.exports

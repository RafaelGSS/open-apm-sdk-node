'use strict'

const Agent = require('./lib/agent')

module.exports = function (config) {
  return new Agent(config)
}

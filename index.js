'use strict'

const Agent = require('./lib/agent')

let globalAgent = undefined;

module.exports = {
  init(config) {
    globalAgent = new Agent(config);
    return globalAgent;
  },
  get globalAgent() {
    return globalAgent;
  }
}

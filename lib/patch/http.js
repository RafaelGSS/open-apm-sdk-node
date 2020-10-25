const endOfStream = require('end-of-stream');

function httpPatch(instrumentationInstance, exports) {
  instrumentationInstance._config.logger.debug('Patching http module');
  const original = exports.Server.prototype['emit'];

  exports.Server.prototype['emit'] = function (event, req, res) {
    if (event === 'request') {
      instrumentationInstance._config.logger.debug(`intercepted request event call to http.Server.emit for ${req.url}`);

      instrumentationInstance.createSegment((segment) => {
        segment.setRequestSegment(req, res);

        bindRequestEmitter(req);
        bindResponseEmitter(res);

        endOfStream(res, function () {
          instrumentationInstance._config.logger.debug(`End call for ${req.url}`)
          segment.end();
        });
      });
    }
    return original.apply(this, arguments)
  }

  return exports;
}

function bindRequestEmitter(req) {

}

function bindResponseEmitter(res) {

}

module.exports = httpPatch;

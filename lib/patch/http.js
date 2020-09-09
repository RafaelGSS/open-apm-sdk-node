function httpPatch(instrumentationInstance, exports) {
  instrumentationInstance._config.logger.debug('Patching http module');
  const original = exports.Server.prototype['emit'];
  exports.Server.prototype['emit'] = function (event, req, res) {
    if (event === 'request') {
      instrumentationInstance._config.logger.debug(`intercepted request event call to http.Server.emit for ${req.url}`);

      const segment = instrumentationInstance.createSegment();
      segment.setRequestSegment(req, res);
      trans.type = 'request';
      trans.req = req;
      trans.res = res;

      res.on('end', function () {
        segment.end();
        // TODO: how to finish it?
      });
    }

    return original.apply(this, arguments)
  }

  return exports;
}

module.exports = httpPatch;

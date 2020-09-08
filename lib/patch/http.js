function httpPatch(instrumentationInstance, exports) {
  instrumentationInstance._config.logger.debug('Patching http module');
  const original = exports.Server.prototype['emit'];
  exports.Server.prototype['emit'] = function (event, req, res) {
    if (event === 'request') {
      instrumentationInstance._config.logger.debug(`intercepted request event call to http.Server.emit for ${req.url}`);

      const segment = instrumentationInstance.createSegment();
      segment.setRequestSegment(req, res);
      trans.type = 'request'
      trans.req = req
      trans.res = res

      // transactionForResponse.set(res, trans)

      // req['on'] = 
      // ins.bindEmitter(req)
      // ins.bindEmitter(res)

      // endOfStream(res, function (err) {
      //   if (trans.ended) return
      //   if (!err) return trans.end()

      //   if (agent._conf.errorOnAbortedRequests) {
      //     var duration = trans._timer.elapsed()
      //     if (duration > (agent._conf.abortedErrorThreshold * 1000)) {
      //       agent.captureError('Socket closed with active HTTP request (>' + agent._conf.abortedErrorThreshold + ' sec)', {
      //         request: req,
      //         extra: { abortTime: duration }
      //       })
      //     }
      //   }

      //   // Handle case where res.end is called after an error occurred on the
      //   // stream (e.g. if the underlying socket was prematurely closed)
      //   const end = res.end
      //   res.end = function () {
      //     const result = end.apply(this, arguments)
      //     trans.end()
      //     return result
      //   }
      // })
    }

    return original.apply(this, arguments)
  }

  return exports;
}

module.exports = httpPatch;

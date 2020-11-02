class SegmentHttp {
  constructor(req, res) {
    this.name = 'request';
    this.url = req.url;
    this.statusCode = res.statusCode;
  }

  ecode() {
    return { type: this.name, url: this.url, statusCode: this.statusCode };
  }
}

module.exports = SegmentHttp

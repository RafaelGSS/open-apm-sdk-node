const Timer = require('./timer');

class Segment {
  constructor(onEnd) {
    this.timer = new Timer();
    this.type = null;
    this.req = null;
    this.res = null;
    this.onEnd = onEnd;
  }

  setRequestSegment(req, res) {
    this.type = 'request';
    this.req = req;
    this.res = res;
  }

  end() {
    this.timer.end();
    this.onEnd(this);
  }

  ecode() {
    return { elapsed: this.timer.endTime, type: this.type, url: this.req.url };
  }
}

module.exports = Segment;

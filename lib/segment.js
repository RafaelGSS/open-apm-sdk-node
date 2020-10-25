const Timer = require('./timer');

class Segment {
  constructor(onEnd) {
    this.timer = new Timer();
    this.type = null;
    this.req = null;
    this.res = null;
    this.subsegments = [];
    this.onEnd = onEnd;
  }

  setRequestSegment(req, res) {
    this.type = 'request';
    this.req = req;
    this.res = res;
  }

  end() {
    this.timer.end();
    if (this.onEnd) {
      this.onEnd(this);
    }
  }

  addSubSegment(segment) {
    this.subsegments.push(segment);
  }

  ecode() {
    return {
      elapsed: this.timer.elapsedMilli,
      type: this.type,
      url: this.req.url,
      subsegments: this.subsegments.map((sub) => sub.ecode()),
    };
  }
}

module.exports = Segment;

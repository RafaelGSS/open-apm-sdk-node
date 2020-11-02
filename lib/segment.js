const Timer = require('./timer');
const SegmentHttp = require('./segment-http');

class Segment {
  constructor(name) {
    this.timer = new Timer();
    this.onEnd = null;
    this.type = null;
    this.subsegments = [];
    this.name = name;
  }

  setRequestSegment(req, res) {
    this.type = new SegmentHttp(req, res);
  }

  setOnEndHook(hook) {
    this.onEnd = hook;
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
      name: this.name,
      elapsed: this.timer.elapsedMilli,
      metadata: this.type && this.type.ecode(),
      subsegments: this.subsegments.map((sub) => sub.ecode()),
    };
  }
}

module.exports = Segment;

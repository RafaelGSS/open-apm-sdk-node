class Segment {
  constructor() {
    this.startTime = new Date();
    this.type = null;
    this.req = null;
    this.res = null;
  }

  setRequestSegment(req, res) {
    this.type = 'request';
    this.req = req;
    this.res = res;
  }
}

module.exports = Segment;

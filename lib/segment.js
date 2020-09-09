class Segment {
  constructor() {
    this.startTime = new Date();
    this.endTime = null;
    this.type = null;
    this.req = null;
    this.res = null;
  }

  setRequestSegment(req, res) {
    this.type = 'request';
    this.req = req;
    this.res = res;
  }

  end() {
    this.endTime = new Date();
  }
}

module.exports = Segment;

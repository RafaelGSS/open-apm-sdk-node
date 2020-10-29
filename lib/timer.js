const { performance } = require('perf_hooks');

class Timer {
  constructor() {
    this.startTime = performance.now();
    this.endTime = null;
    this.elapsedMilli = null;
  }

  end () {
    this.endTime = performance.now();
    this.elapsedMilli = this.endTime - this.startTime;
  }
}

module.exports = Timer;

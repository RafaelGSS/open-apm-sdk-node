class Timer {

  constructor() {
    this.startTime = process.hrtime();
    this.elapsedMilli = null;
  }

  end () {
    const diff = process.hrtime(this.startTime);
    this.elapsedMilli = diff[1] / 1_000_000;
  }
}

module.exports = Timer;

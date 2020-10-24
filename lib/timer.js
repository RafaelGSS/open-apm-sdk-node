class Timer {

  constructor() {
    this.nanoStart = process.hrtime();
    this.microStart = Date.now() * 1000;
    this.endTime = null;
  }

  end () {
    const diff = process.hrtime(this.nanoStart);
    const microRemainder = diff[1] / 1000 | 0; // Use bitwise OR to remove the decimals
    const microDelta = diff[0] * 1e6 + microRemainder;
    this.endTime = this.microStart + microDelta;
  }
}

module.exports = Timer

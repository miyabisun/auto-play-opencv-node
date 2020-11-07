const MatchResult = require("./MatchResult")

module.exports = class Screen {
  constructor (adb) {
    this.adb = adb;
    this.snapshot = null;
  }

  static async init (adb) {
    const screen = new Screen(adb)
    await screen.snap();
    return screen;
  }

  async snap () {
    return this.snapshot = await this.adb.capture();
  }

  tap (x, y) {
    this.adb.tap(x, y);
  }

  async match (template, threshold = 0.8) {
    return MatchResult.match(this, template, threshold);
  }

  get width () {
    return this.adb.wmSize.width;
  }

  get height () {
    return this.adb.wmSize.height;
  }
}

const MatchResult = require("./MatchResult")

module.exports = class Screen {
  constructor (adb) {
    this.adb = adb;
    this.snapshot = null;
  }

  static async init (adb) {
    const screen = new Screen(adb);
    await screen.snap();
    return screen;
  }

  async snap () {
    return this.snapshot = await this.adb.capture();
  }

  tap (x, y) {
    const {width, height} = this.adb.wmSize;
    this.adb.tap(
      Math.floor(x / 100 * width),
      Math.floor(y / 100 * height),
    );
  }

  swipe (x1, y1, x2, y2, isFlick = false) {
    const {width, height} = this.adb.wmSize;
    this.adb.swipe(
      Math.floor(x1 / 100 * width),
      Math.floor(y1 / 100 * height),
      Math.floor(x2 / 100 * width),
      Math.floor(y2 / 100 * height),
      isFlick ? 50 : 0,
    );
  }

  swipeTo (move, x, y, p, isFlick = false) {
    switch (move) {
      case "up":
        this.swipe(x, y, x, y - p, isFlick);
        break;
      case "right":
        this.swipe(x, y, x + p, y, isFlick);
        break;
      case "down":
        this.swipe(x, y, x, y + p, isFlick);
        break;
      case "left":
        this.swipe(x, y, x - p, y, isFlick);
    }
  }

  flickTo (move, x, y, p) {
    this.swipeTo(move, x, y, p, true);
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

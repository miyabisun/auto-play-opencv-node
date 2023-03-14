const Result = require("./Result");
const cv = require("../modules/opencv.js");

module.exports = class Screen {
  constructor (adb) {
    this.adb = adb;
    this.cv = cv;
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

  async crop (x, y, x2, y2) {
    await this.snap();
    return this.snapshot.crop(x, y, x2, y2);
  }

  tap (x, y) {
    const {width, height} = this.adb.wmSize;
    this.adb.tap(
      Math.floor(x / 100 * width),
      Math.floor(y / 100 * height),
    );
  }

  swipe (x1, y1, x2, y2, ms = 2000) {
    const {width, height} = this.adb.wmSize;
    this.adb.swipe(
      Math.floor(x1 / 100 * width),
      Math.floor(y1 / 100 * height),
      Math.floor(x2 / 100 * width),
      Math.floor(y2 / 100 * height),
      ms
    );
  }

  swipeTo (move, x, y, p, isFlick = false) {
    const ms = isFlick ? 200 : 2000;
    switch (move) {
      case "up":
        this.swipe(x, y, x, y - p, ms);
        break;
      case "right":
        this.swipe(x, y, x + p, y, ms);
        break;
      case "down":
        this.swipe(x, y, x, y + p, ms);
        break;
      case "left":
        this.swipe(x, y, x - p, y, ms);
    }
  }

  flickTo (move, x, y, p) {
    this.swipeTo(move, x, y, p, true);
  }

  match (template, threshold = 0.8) {
    return Result.match(this, template, threshold);
  }

  asyncMatch (template, threshold = 0.8) {
    return Result.asyncMatch(this, template, threshold);
  }

  get width () {
    return this.adb.wmSize.width;
  }

  get height () {
    return this.adb.wmSize.height;
  }
}

const cv = require("../modules/opencv.js");

module.exports = class Result {
  constructor ({screen, template, result, isMatch, position, val}) {
    this.screen = screen;
    this.template = template;
    this.isMatch = isMatch;
    this.position = position;
    this.val = val;
  }

  static match (screen, template, threshold = 0.8, method = "TM_CCOEFF_NORMED") {
    const {snapshot} = screen;
    const sm = cv.matFromImageData(snapshot.bitmap);
    const tm = cv.matFromImageData(template.bitmap);
    const dst = new cv.Mat();

    cv.matchTemplate(sm, tm, dst, cv[method]);
    const result = cv.minMaxLoc(dst);
    [sm, tm, dst].forEach(it => it.delete());

    const {x, y} = result.maxLoc;
    const {width, height} = template;
    return new Result({
      screen, template,
      val: result.maxVal,
      isMatch: threshold < result.maxVal,
      position: {
        x: x + Math.floor(width / 2),
        y: y + Math.floor(height / 2),
      },
    });
  }

  tap () {
    const {x, y} = this.position;
    this.screen.adb.tap(x, y);
  }

  hold (ms) {
    const {x, y} = this.position;
    this.screen.adb.hold(x, y, ms);
  }

  get name () {
    return this.template.name;
  }
}

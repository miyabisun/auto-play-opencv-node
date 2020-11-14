const cv = require("../../lib/opencv");

module.exports = class MatchResult {
  constructor ({screen, template, result, isMatch, position, loc}) {
    this.screen = screen;
    this.template = template;
    this.isMatch = isMatch;
    this.position = position;
    this.loc = loc;
    this.name = "";
  }

  static match (screen, template, threshold) {
    const sm = screen.snapshot.mat();
    const tm = template.mat();
    const dst = new cv.Mat();
    const mask = new cv.Mat();

    cv.matchTemplate(sm, tm, dst, cv.TM_CCOEFF_NORMED, mask);
    const result = cv.minMaxLoc(dst, mask);
    [sm, tm, dst, mask].forEach(it => it.delete());

    const {x, y} = result.maxLoc;
    const {width, height} = template;
    return new MatchResult({
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
}

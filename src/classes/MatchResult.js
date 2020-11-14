module.exports = class MatchResult {
  constructor ({screen, template, result, isMatch, position, loc}) {
    this.screen = screen;
    this.template = template;
    this.isMatch = isMatch;
    this.position = position;
    this.loc = loc;
  }

  static match (screen, template, threshold = 0.8) {
    const {cv, snapshot} = screen;
    const sm = cv.matFromImageData(snapshot.bitmap);
    const tm = cv.matFromImageData(template.bitmap);
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

  get name () {
    return this.template.name;
  }
}

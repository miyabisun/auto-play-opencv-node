const templateMatch = require("../modules/template-match");
const {Worker} = require("worker_threads");

module.exports = class Result {
  constructor ({screen, template, result, isMatch, position, val}) {
    this.screen = screen;
    this.template = template;
    this.isMatch = isMatch;
    this.position = position;
    this.val = val;
  }

  static match (screen, template, threshold = 0.8, method = "TM_CCOEFF_NORMED") {
    const {val, position} = templateMatch({
      screen: screen.snapshot.bitmap,
      template: template.bitmap,
      method
    });
    return new Result({
      screen, template, val, position,
      isMatch: threshold < val,
    })
  }

  static async asyncMatch (screen, template, threshold = 0.8, method = "TM_CCOEFF_NORMED") {
    const workerData = {
      screen: screen.snapshot.bitmap,
      template: template.bitmap,
      method
    };
    const {val, position} = await new Promise((resolve, reject) => {
      try {
        const worker = new Worker(`${__dirname}/../modules/worker-match.js`, {workerData});
        worker.on("message", resolve);
        worker.on("exit", code => {
          if (code != 0) {
            console.log(workerData);
            console.log(code);
          }
        });
      } catch (e) {
        reject(e);
      }
    });
    return new Result({
      screen, template, val, position,
      isMatch: threshold < val,
    })
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

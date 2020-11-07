const {execSync} = require("child_process");
const Image = require("./Image");

const exec = c => execSync(c, {maxBuffer: 1024 * 1024 * 1024})

module.exports = class Adb {
  constructor (path) {
    this.path = path;
  }

  static init (path) {
    return new Adb(path);
  }

  async capture () {
    const buffer = exec(`${this.path} exec-out screencap -p`);
    return await Image.read(buffer);
  }

  shell (command) {
    return exec(`${this.path} shell ${command}`)
  }

  tap (x, y) {
    this.shell(`input tap ${x} ${y}`);
  }

  debug (isEnabled = true) {
    const num = isEnabled ? "1" : "0";
    exec(`${this.path} shell settings put system pointer_location ${num}`);
  }

  get wmSize () {
    const result = this.shell("wm size").toString()
      .match(/(\d+)x(\d+)\s*$/i);
    if (!result) return {width: 0, height: 0};
    return {
      width: parseInt(result[1]),
      height: parseInt(result[2]),
    }
  }
}

const {execSync} = require("child_process");
const Image = require("./Image");

const exec = c => execSync(c, {maxBuffer: 1024 * 1024 * 1024})

module.exports = class Adb {
  constructor (path) {
    this.path = path;
    this.activity = null;
    this.bk = {}
  }

  static init (path, autoBackup = false) {
    const adb = new Adb(path);
    if (autoBackup) process.on("exit", () => adb.backup());
    return adb;
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

  swipe (x1, y1, x2, y2, time = 0) {
    if (time) {
      this.shell(`input swipe ${x1} ${y1} ${x2} ${y2} ${time}`);
    } else {
      this.shell(`input swipe ${x1} ${y1} ${x2} ${y2}`);
    }
  }

  debug (isEnabled = true) {
    const num = isEnabled ? "1" : "0";
    exec(`${this.path} shell settings put system pointer_location ${num}`);
  }

  backup () {
    for (const [key, val] of Object.entries(this.bk)) {
      this[key] = val;
    }
  }

  start (path) {
    this.shell(`am start -n ${path}`);
    this.activity = path;
  }

  stop () {
    if (!this.activity) return;
    this.shell(`am force-stop ${this.activity.replace(/\/[^\/]+$/, "")}`);
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

  get brightness () {
    return parseInt(this.shell("settings get system screen_brightness").toString());
  }
  set brightness (num) {
    if (!this.bk.brightness)
      this.bk.brightness = this.brightness;
    this.shell(`settings put system screen_brightness ${num}`);
  }

  get volume () {
    const result = this.shell("media volume --get").toString();
    return parseInt(result.match(/volume is (\d+)/)[1]);
  }
  set volume (num) {
    if (!this.bk.volume) this.bk.volume = this.volume;
    this.shell(`media volume --set ${num}`);
  }
}

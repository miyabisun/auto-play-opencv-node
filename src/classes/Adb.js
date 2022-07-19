const R = require("ramda");
const {execSync, exec: e} = require("child_process");
const Image = require("./Image");

const exec = c => execSync(c, {maxBuffer: 1024 * 1024 * 1024});

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
    const buffer = this.exec("screencap");
    return await Image.fromRawData(buffer);
  }

  shell (command) {
    return exec(`${this.path} shell ${command}`)
  }

  exec (command) {
    return exec(`${this.path} exec-out ${command}`);
  }

  tap (x, y) {
    this.shell(`input tap ${x} ${y}`);
  }

  swipe (x1, y1, x2, y2, ms = 0) {
    if (ms) {
      this.shell(`input swipe ${x1} ${y1} ${x2} ${y2} ${ms}`);
    } else {
      this.shell(`input swipe ${x1} ${y1} ${x2} ${y2}`);
    }
  }

  hold (x, y, ms) {
    this.shell(`input swipe ${x} ${y} ${x} ${y} ${ms}`);
  }

  debug (isEnabled = true) {
    const num = isEnabled ? "1" : "0";
    this.shell(`settings put system pointer_location ${num}`);
  }

  backup () {
    for (const [key, val] of Object.entries(this.bk)) {
      this[key] = val;
    }
  }

  isStarted (path) {
    return this.activities.includes(path);
  }

  start (path) {
    if (path) this.activity = path;
    if (!this.activity) return;
    if (this.isStarted(this.activity)) return;
    this.shell(`am start -n ${path}`);
  }

  stop (path) {
    if (path) this.activity = path;
    if (!this.activity) return;
    if (!this.isStarted(this.activity)) return;
    this.shell(`am force-stop ${this.activity.replace(/\/[^\/]+$/, "")}`);
  }

  wakeup () {
    this.isWake = true;
  }

  sleep () {
    this.backup();
    this.isWake = false;
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
    return num;
  }

  get volume () {
    const result = this.shell("media volume --get").toString();
    return parseInt(result.match(/volume is (\d+)/)[1]);
  }
  set volume (num) {
    if (!this.bk.volume) this.bk.volume = this.volume;
    this.shell(`media volume --set ${num}`);
    return num;
  }

  get activities () {
    return R.pipe(
      () => this.shell("dumpsys activity activities").toString(),
      R.split("\n"),
      R.map(R.pipe(
        R.trim,
        R.match(/Run #\d+: ActivityRecord{\w+ \w+ ([\w\.\/]+)/),
        it => it ? it[1] : null,
      )),
      R.filter(R.identity),
    )();
  }

  get isWake () {
    return R.pipe(
      () => this.shell("dumpsys power").toString(),
      R.split("\n"),
      R.find(R.test(/mWakefulness\=\w+/)),
      R.trim,
      R.match(/mWakefulness\=(\w+)/),
      it => it[1] == "Awake",
    )();
  }
  set isWake (bool) {
    if (this.isWake == bool) return bool;
    bool
      ? this.shell("input keyevent KEYCODE_WAKEUP")
      : this.shell("input keyevent KEYCODE_SLEEP");
    return bool;
  }
}

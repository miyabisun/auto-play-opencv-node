const Adb = require("./src/classes/Adb");
const Screen = require("./src/classes/Screen");
const loadTemplates = require("./src/functions/loadTemplates");

module.exports = async (adbPath = "adb") => {
  const adb = Adb.init(adbPath);
  const screen = await Screen.init(adb);

  return {adb, screen, loadTemplates}
}

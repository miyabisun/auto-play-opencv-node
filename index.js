const Adb = require("./src/classes/Adb");
const Screen = require("./src/classes/Screen");
const loadTemplates = require("./src/functions/load-templates");
const waitModules = require("./src/functions/wait");
const onceModules = require("./src/functions/once");

module.exports = async (adbPath = "adb", templatePath = null, verbose = false) => {
  const adb = Adb.init(adbPath);
  const screen = await Screen.init(adb);
  if (!templatePath) return {adb, screen};

  const templates = await loadTemplates(templatePath);
  const wait = waitModules(screen, templates, verbose);
  const once = onceModules(screen, templates, verbose);
  return {adb, screen, templates, wait, once};
}

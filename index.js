const Adb = require("./src/classes/Adb");
const Screen = require("./src/classes/Screen");
const loadTemplates = require("./src/functions/load-templates");
const waitModules = require("./src/modules/wait");
const onceModules = require("./src/modules/once");

module.exports = async (adbPath = "adb", templatePath = null, verbose = false) => {
  const adb = Adb.init(adbPath);
  const screen = await Screen.init(adb);

  if (templatePath != null) {
    const templates = await loadTemplates(templatePath);
    return {
      adb, screen, templates,
      wait: {
        ...waitModules(screen, templates, verbose),
        ...onceModules(screen, templates, verbose),
      },
    };
  }
  return {adb, screen, loadTemplates, waitModules, onceModules};
}

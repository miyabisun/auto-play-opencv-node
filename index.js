const Adb = require("./src/classes/Adb");
const Screen = require("./src/classes/Screen");
const Image = require("./src/classes/Image");
const loadTemplates = require("./src/functions/load-templates");
const waitFunctions = require("./src/functions/wait/index");

const autoplay = async (adbPath = "adb", templatePath = null, verbose = false) => {
  const adb = Adb.init(adbPath);
  const screen = await Screen.init(adb);
  if (templatePath == null) return {adb, screen};
  let templates = await loadTemplates(templatePath);
  const reload = async () => {
    templates = await loadTemplates(templatePath);
  }

  return {
    adb, screen, templates, reload,
    wait: waitFunctions(screen, templates, verbose),
  };
}

module.exports = Object.assign(autoplay, {
  Adb, Screen, Image, loadTemplates, waitFunctions,
});

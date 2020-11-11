module.exports = async (screen, templates, template) =>
  screen.match(templates[template], 0.95);

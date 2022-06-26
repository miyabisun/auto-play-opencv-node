module.exports = (screen, templates, template) =>
  Array.isArray(template)
  ? template.map(t => screen.asyncMatch(templates[t], 0.95))
  : screen.match(templates[template], 0.95);

module.exports = (templates, template) => {
  if (!templates[template]) {
    throw new Error(`template not found: ${template}`);
  }
}

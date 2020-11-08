const R = require("ramda");
const assertTemplate = require("../functions/assert-template.js");

module.exports = (screen, templates, verbose = false) => {
  const check = async template =>
    screen.match(templates[template], 0.95);

  const find = async (template, refresh = true) => {
    assertTemplate(templates, template);
    await screen.snap();
    const result = await check(template);
    if (verbose) console.log(`find ${template}: ${result.isMatch}`);
    return result;
  }

  const isMatch = async (template, refresh = true) => {
    assertTemplate(templates, template);
    if (refresh) await screen.snap();
    const result = await check(template);
    if (verbose) console.log(`check: ${template} (isMatch: ${result.isMatch})`);
    return result.isMatch;
  }

  const cond = async (conditions, refresh = true) => {
    conditions.forEach(it => assertTemplate(templates, it))
    if (verbose) console.log(`check: ${conditions}`);
    if (refresh) await screen.snap();
    for (const template of conditions) {
      const result = await check(template);
      if (result.isMatch) {
        if (verbose) console.log(`hit: ${template}`);
        result.name = template;
        return result;
      }
    }
    if (verbose) console.log(`hit: (none)`);
  }

  return {find, isMatch, cond};
}

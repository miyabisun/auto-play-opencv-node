const R = require("ramda");
const assertTemplate = require("./assert-template.js");

module.exports = (screen, templates, verbose = false) => {
  const check = async template =>
    screen.match(templates[template], 0.95);

  const isMatch = async template => {
    assertTemplate(templates, template);
    await screen.snap();
    const result = await check(template);
    if (verbose) console.log(`check: ${template} (isMatch: ${result.isMatch})`);
    return result.isMatch;
  }

  const cond = async conditions => {
    conditions.forEach(it => assertTemplate(templates, it))
    if (verbose) console.log(`check: ${conditions}`);
    await screen.snap();
    for (const template of conditions) {
      const result = await check(template);
      if (result.isMatch) {
        if (verbose) console.log(`hit: ${result.name}`);
        result.name = template;
        return result;
      }
    }
  }

  return {
    isMatch, cond,
    check: async template => {
      assertTemplate(templates, template);
      await screen.snap();
      const result = check(template);
      if (verbose) console.log(`is-match (${template}): ${result.isMatch}`);
      return check(template);
    },
  };
}

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
    const results = await Promise.all(
      conditions.map(async template => {
        const result = await check(template);
        result.name = template;
        return result;
      })
    );
    const result = results.find(it => it.isMatch);
    if (verbose) console.log(`hit: ${(result || {}).name}`);
    return result;
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

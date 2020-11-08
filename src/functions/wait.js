const R = require("ramda");
const assertTemplate = require("./assert-template.js");

module.exports = (screen, templates, verbose = false) => {
  const ms = time => new Promise(resolve => {
    if (verbose) console.log(`waiting: ${time.toLocaleString()} ms`);
    setTimeout(resolve, time);
  })

  const check = async template =>
    screen.match(templates[template], 0.95);

  const tmp = async template => {
    assertTemplate(templates, template);
    if (verbose) console.log(`waiting: ${template}`);
    while (await screen.snap()) {
      const result = await check(template);
      if (result.isMatch) {
        return result;
        if (verbose) console.log(`hit: ${template}`);
      }
    }
  }

  const tap = async template =>
    (await tmp(template)).tap();

  const cond = async conditions => {
    conditions.forEach(it => assertTemplate(templates, it))
    if (verbose) console.log(`waiting: ${conditions}`);
    while (await screen.snap()) {
      for (const template of conditions) {
        const result = await check(template);
        if (result.isMatch) {
          if (verbose) console.log(`hit: ${result.name}`);
          result.name = template;
          return result;
        }
      }
    }
  }

  return {ms, tmp, tap, cond};
}

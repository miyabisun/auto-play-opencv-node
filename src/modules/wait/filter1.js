const R = require("ramda");

module.exports = async ({check, assert, snap, verbose}, templateList, refresh = true) => {
  templateList.forEach(it => assert(it));
  if (verbose) console.log(`check (filter1): ${templateList}`);
  if (refresh) await snap();
  const results = Promise.all(
    templateList.map(async template => {
      const result = await check(template);
      result.name = template;
      return result;
    })
  );
  return results.filter(it => it.isMatch);
}

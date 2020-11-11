const R = require("ramda");

module.exports = async ({check, assert, snap, verbose}, templateList, refresh = true) => {
  templateList.forEach(it => assert(it));
  if (verbose) console.log(`check (max1): ${templateList}`);
  if (refresh) await snap();
  const results = await Promise.all(
    templateList.map(async template => {
      const result = await check(template);
      result.name = template;
      return result;
    })
  );
  const result = results.reduce(R.maxBy(result => result.loc));
  if (verbose) console.log(`hit (max1): ${result.isMatch ? result.name : "(none)"}`);
  return result.isMatch ? result : null;
}

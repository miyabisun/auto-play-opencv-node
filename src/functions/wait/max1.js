const R = require("ramda");

module.exports = async ({check, assert, snap, log}, templateList, refresh = true) => {
  templateList.forEach(it => assert(it));
  log(`check (max1): ${templateList}`);
  if (refresh) await snap();
  const results = await Promise.all(
    check(templateList)
  );
  const result = results.reduce(R.maxBy(result => result.val));
  results.forEach(({name, val}) => log(`  ${name}: ${Math.round(val * 1000) / 1000}`));
  log(`hit (max1): ${result.isMatch ? result.name : "(none)"}`);
  return result.isMatch ? result : null;
}

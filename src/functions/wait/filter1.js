const R = require("ramda");

module.exports = async ({check, assert, snap, log}, templateList, refresh = true) => {
  templateList.forEach(it => assert(it));
  log(`check (filter1): ${templateList}`);
  if (refresh) await snap();
  const results = await Promise.all(
    check(templateList)
  );
  const hits = results.filter(it => it?.isMatch);
  hits.forEach(it => log(`hit (filter1): ${it.name}`));
  return hits;
}

const R = require("ramda");

module.exports = async ({check, assert, snap, log}, templateList, refresh = true) => {
  templateList.forEach(it => assert(it));
  log(`check (filter1): ${templateList}`);
  if (refresh) await snap();
  const results = Promise.all(
    templateList.map(async template => {
      const result = await check(template);
      return result;
    })
  );
  const hits = results.filter(it => it.isMatch)
  log(`hit (filter1): ${hits.match(it => it.name)}`);
  return hits;
}

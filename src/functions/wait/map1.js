const R = require("ramda");

module.exports = async ({check, assert, snap, log}, templateList, refresh = true) => {
  templateList.forEach(it => assert(it));
  log(`check (map1): ${templateList}`);
  if (refresh) await snap();
  const results = await Promise.all(
    check(templateList)
  );
  return results.map(result => {
    const template = result.template.name
    log(`hit (map1): ${result.isMatch ? template : "(none)"}`);
    return result.isMatch ? result : null;
  });
}

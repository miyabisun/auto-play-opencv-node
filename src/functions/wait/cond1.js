module.exports = async ({check, assert, snap, log}, conditions, refresh = true) => {
  const templateList = Object.keys(conditions);
  templateList.forEach(it => assert(it));
  log(`check (cond1): ${templateList}`);
  if (refresh) await snap();
  for (const promise of check(templateList)) {
    const result = await promise;
    const template = result.template.name;
    if (result.isMatch) {
      log(`hit (cond1): ${template}`);
      if (conditions[template]) return conditions[template](result);
      return result;
    }
  }
  log(`hit (cond1): (none)`);
  return null;
}

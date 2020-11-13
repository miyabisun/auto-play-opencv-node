module.exports = async ({check, assert, snap, log}, conditions, refresh = true) => {
  const templateList = Object.keys(conditions);
  templateList.forEach(it => assert(it));
  log(`check (cond1): ${templateList}`);
  if (refresh) await snap();
  for (const template of templateList) {
    const result = await check(template);
    if (result.isMatch) {
      log(`hit (cond1): ${template}`);
      result.name = template;
      if (conditions[template]) return conditions[template](result);
      return result;
    }
  }
  log(`hit (cond1): (none)`);
}

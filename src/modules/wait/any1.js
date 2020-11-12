module.exports = async ({check, assert, snap, log}, templateList, refresh = true) => {
  templateList.forEach(it => assert(it));
  log(`check (any1): ${templateList}`);
  if (refresh) await snap();
  for (const template of templateList) {
    const result = await check(template);
    if (result.isMatch) {
      log(`hit (any1): ${template}`);
      return true;
    }
  }
  log(`hit (any1): (none)`);
  return false;
}

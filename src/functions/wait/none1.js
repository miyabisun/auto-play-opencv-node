module.exports = async ({check, assert, snap, log}, templateList, refresh = true) => {
  templateList.forEach(it => assert(it));
  log(`check (none1): ${templateList}`);
  if (refresh) await snap();
  for (const template of templateList) {
    const result = await check(template);
    if (result.isMatch) {
      log(`hit (none1): ${template}`);
      return false;
    }
  }
  log(`hit (none1): (none)`);
  return true;
}

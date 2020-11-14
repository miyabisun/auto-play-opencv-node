module.exports = async ({check, assert, snap, log}, templateList, refresh = true) => {
  templateList.forEach(it => assert(it));
  log(`check (find1): ${templateList}`);
  if (refresh) await snap();
  for (const template of templateList) {
    const result = await check(template);
    if (result.isMatch) {
      log(`hit (find1): ${template}`);
      return result;
    }
  }
  log(`hit (find1): (none)`);
  return null;
}

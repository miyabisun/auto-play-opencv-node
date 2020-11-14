module.exports = async ({check, assert, snap, log}, templateList, refresh = true) => {
  templateList.forEach(it => assert(it));
  log(`check (all1): ${templateList}`);
  if (refresh) await snap();
  for (const template of templateList) {
    const result = await check(template);
    log(`hit (all1): ${template} is none`);
    if (!result.isMatch) return false;
  }
  log(`hit (all1): ${templateList}`);
  return true;
}

module.exports = async ({check, assert, snap, log}, templateList, refresh = true) => {
  templateList.forEach(it => assert(it));
  log(`check (all1): ${templateList}`);
  if (refresh) await snap();
  for (const promise of check(templateList)) {
    const result = await promise;
    const template = result.template.name;
    if (!result.isMatch) {
      log(`hit (all1): ${template} is none`);
      return false;
    }
  }
  log(`hit (all1): ${templateList}`);
  return true;
}

module.exports = async ({check, assert, snap, log}, templateList, refresh = true) => {
  templateList.forEach(it => assert(it));
  log(`check (any1): ${templateList}`);
  if (refresh) await snap();
  for (const promise of check(templateList)) {
    const result = await promise;
    const template = result.template.name;
    if (result.isMatch) {
      log(`hit (any1): ${template}`);
      return true;
    }
  }
  log(`hit (any1): (none)`);
  return false;
}

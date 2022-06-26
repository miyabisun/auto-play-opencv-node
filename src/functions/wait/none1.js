module.exports = async ({check, assert, snap, log}, templateList, refresh = true) => {
  templateList.forEach(it => assert(it));
  log(`check (none1): ${templateList}`);
  if (refresh) await snap();
  for (const promise of check(templateList)) {
    const result = await promise;
    const template = result.template.name;
    if (result.isMatch) {
      log(`hit (none1): ${template}`);
      return false;
    }
  }
  log(`hit (none1): (none)`);
  return true;
}

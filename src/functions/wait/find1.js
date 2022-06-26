module.exports = async ({check, assert, snap, log}, templateList, refresh = true) => {
  templateList.forEach(it => assert(it));
  log(`check (find1): ${templateList}`);
  if (refresh) await snap();
  for (const promise of check(templateList)) {
    const result = await promise;
    const template = result.template.name;
    if (result.isMatch) {
      log(`hit (find1): ${template}`);
      return result;
    }
  }
  log(`hit (find1): (none)`);
  return null;
}

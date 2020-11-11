module.exports = async ({check, assert, snap, verbose}, templateList, refresh = true) => {
  templateList.forEach(it => assert(it));
  if (verbose) console.log(`check (all1): ${templateList}`);
  if (refresh) await snap();
  for (const template of templateList) {
    const result = await check(template);
    if (!result.isMatch) return false;
  }
  return true;
}

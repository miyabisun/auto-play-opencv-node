module.exports = async ({check, assert, snap, verbose}, templateList, refresh = true) => {
  templateList.forEach(it => assert(it));
  if (verbose) console.log(`check (any1): ${templateList}`);
  if (refresh) await snap();
  for (const template of templateList) {
    const result = await check(template);
    if (result.isMatch) {
      if (verbose) console.log(`hit (any1): ${template}`);
      return true;
    }
  }
  if (verbose) console.log(`hit (any1): (none)`);
  return false;
}

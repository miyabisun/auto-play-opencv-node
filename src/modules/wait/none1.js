module.exports = async ({check, assert, snap, verbose}, templateList, refresh = true) => {
  templateList.forEach(it => assert(it));
  if (verbose) console.log(`check (none1): ${templateList}`);
  if (refresh) await snap();
  for (const template of templateList) {
    const result = await check(template);
    if (result.isMatch) {
      if (verbose) console.log(`hit (none1): ${template}`);
      return false;
    }
  }
  if (verbose) console.log(`hit (none1): (none)`);
  return true;
}

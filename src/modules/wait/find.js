module.exports = async ({check, assert, snap, verbose}, templateList) => {
  templateList.forEach(it => assert(it));
  if (verbose) console.log(`waiting (find): ${templateList}`);
  while (await snap()) {
    for (const template of templateList) {
      const result = await check(template);
      if (result.isMatch) {
        if (verbose) console.log(`hit (find): ${template}`);
        result.name = template;
        return result;
      }
    }
  }
}

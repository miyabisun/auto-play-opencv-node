module.exports = async ({check, assert, snap, verbose}, conditions) => {
  const templateList = Object.keys(conditions);
  templateList.forEach(it => assert(it));
  if (verbose) console.log(`waiting (cond): ${templateList}`);
  while (await snap()) {
    for (const template of templateList) {
      const result = await check(template);
      if (result.isMatch) {
        if (verbose) console.log(`hit (cond): ${template}`);
        result.name = template;
        if (conditions[template]) return conditions[template](result);
        return result;
      }
    }
  }
}

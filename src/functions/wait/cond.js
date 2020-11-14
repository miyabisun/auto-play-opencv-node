module.exports = async ({check, assert, snap, log}, conditions) => {
  const templateList = Object.keys(conditions);
  templateList.forEach(it => assert(it));
  log(`waiting (cond): ${templateList}`);
  while (await snap()) {
    for (const template of templateList) {
      const result = await check(template);
      if (result.isMatch) {
        log(`hit (cond): ${template}`);
        if (conditions[template]) return conditions[template](result);
        return result;
      }
    }
  }
}

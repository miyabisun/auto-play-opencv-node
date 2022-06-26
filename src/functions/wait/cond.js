module.exports = async ({check, assert, snap, log}, conditions) => {
  const templateList = Object.keys(conditions);
  templateList.forEach(it => assert(it));
  log(`waiting (cond): ${templateList}`);
  while (await snap()) {
    for (const promise of check(templateList)) {
      const result = await promise;
      const template = result.template.name;
      if (result.isMatch) {
        log(`hit (cond): ${template}`);
        if (conditions[template]) return conditions[template](result);
        return result;
      }
    }
  }
}

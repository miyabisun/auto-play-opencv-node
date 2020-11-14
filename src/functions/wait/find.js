module.exports = async ({check, assert, snap, log}, templateList) => {
  templateList.forEach(it => assert(it));
  log(`waiting (find): ${templateList}`);
  while (await snap()) {
    for (const template of templateList) {
      const result = await check(template);
      if (result.isMatch) {
        log(`hit (find): ${template}`);
        result.name = template;
        return result;
      }
    }
  }
}

module.exports = async ({check, assert, snap, log}, templateList) => {
  templateList.forEach(it => assert(it));
  log(`waiting (find): ${templateList}`);
  while (await snap()) {
    for (const promise of check(templateList)) {
      const result = await promise;
      const template = result.template.name;
      if (result.isMatch) {
        log(`hit (find): ${template}`);
        return result;
      }
    }
  }
}

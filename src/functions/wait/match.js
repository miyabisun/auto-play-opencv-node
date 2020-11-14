module.exports = async ({check, assert, snap, log}, template) => {
  assert(template);
  log(`waiting (match): ${template}`);
  while (await snap()) {
    const result = await check(template);
    if (result.isMatch) {
      log(`hit (match): ${template}`);
      return result;
    }
  }
}

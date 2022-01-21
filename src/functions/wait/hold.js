module.exports = async ({check, assert, snap, log}, template, ms, cache = null) => {
  assert(template);
  log(`waiting (hold): ${template}`);
  while (await snap()) {
    const result = await check(template);
    if (result.isMatch) {
      log(`hit (hold): ${template}`);
      if (cache) cache[template] = result;
      result.hold(ms);
      return result;
    }
  }
}

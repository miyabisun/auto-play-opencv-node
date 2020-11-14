module.exports = async ({check, assert, snap, log}, template, cache = null) => {
  assert(template);
  if (cache && cache[template]) {
    log(`cache-tap: ${template}`);
    cache[template].tap();
    return cache[template];
  }
  log(`waiting (tap): ${template}`);
  while (await snap()) {
    const result = await check(template);
    if (result.isMatch) {
      log(`hit (tap): ${template}`);
      if (cache) cache[template] = result;
      result.tap();
      return result;
    }
  }
}

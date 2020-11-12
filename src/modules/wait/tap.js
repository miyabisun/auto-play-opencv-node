module.exports = async ({check, assert, snap, verbose}, template, cache = null) => {
  assert(template);
  if (cache && cache[template]) {
    if (verbose) console.log(`cache-tap: ${template}`);
    return cache[template].tap();
  }
  if (verbose) console.log(`waiting (tap): ${template}`);
  while (await snap()) {
    const result = await check(template);
    if (result.isMatch) {
      result.name = template;
      if (verbose) console.log(`hit (tap): ${template}`);
      if (cache) cache[template] = result;
      result.tap();
      return result;
    }
  }
}

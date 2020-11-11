module.exports = async ({check, assert, snap, verbose}, template, refresh = true) => {
  assert(template);
  if (verbose) console.log(`check (tap1): ${template}`);
  if (refresh) await snap();
  const result = await check(template);
  result.name = template;
  if (result.isMatch) result.tap();
  return result;
}

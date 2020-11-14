module.exports = async ({check, assert, snap, log}, template, refresh = true) => {
  assert(template);
  log(`check (tap1): ${template}`);
  if (refresh) await snap();
  const result = await check(template);
  result.name = template;
  if (result.isMatch) result.tap();
  return result;
}

module.exports = async ({check, assert, snap, log}, template, refresh = true) => {
  assert(template);
  log(`check (match1): ${template}`);
  if (refresh) await snap();
  const result = await check(template);
  return Boolean(result && result.isMatch);
}

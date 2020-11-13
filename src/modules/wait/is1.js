module.exports = async ({check, assert, snap, log}, template, refresh = true) => {
  assert(template);
  log(`check (is1): ${template}`);
  if (refresh) await snap();
  const result = await check(template);
  const bool = Boolean(result && result.isMatch)
  log(`hit (is1): ${bool ? template : "(none)"}`)
  return bool;
}

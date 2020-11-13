module.exports = async ({check, assert, snap, log}, template, refresh = true) => {
  assert(template);
  log(`check (match1): ${template}`);
  if (refresh) await snap();
  const result = await check(template);
  log(`hit (match1): ${result.isMatch ? template : "(none)"}`);
  result.name = template;
  return result;
}

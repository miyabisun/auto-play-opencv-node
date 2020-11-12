module.exports = async ({check, assert, snap, log}, template, refresh = true) => {
  assert(template);
  log(`check (match1): ${template}`);
  if (refresh) await snap();
  const result = await check(template);
  result.name = template;
  log(`hit (match1): ${result.match ? template : "(none)"}`);
  return result;
}

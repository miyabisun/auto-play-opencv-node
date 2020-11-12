module.exports = async ({check, assert, snap, verbose}, template, refresh = true) => {
  assert(template);
  if (verbose) console.log(`check (match1): ${template}`);
  if (refresh) await snap();
  const result = await check(template);
  result.name = template;
  if (verbose) console.log(`hit (match1): ${result.match ? template : "(none)"}`);
  return result;
}

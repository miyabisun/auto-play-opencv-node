module.exports = async ({check, assert, snap, verbose}, template) => {
  assert(template);
  if (verbose) console.log(`waiting (match): ${template}`);
  while (await snap()) {
    const result = await check(template);
    if (result.isMatch) {
      result.name = template;
      if (verbose) console.log(`hit (match): ${template}`);
      return result;
    }
  }
}

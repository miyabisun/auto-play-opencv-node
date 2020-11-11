const index = require("../../src/modules/wait/index");

test("is function", () => {
  expect(typeof index).toBe("function");
});

test("result is object", () => {
  const result = index();
  expect(typeof result).toBe("object");
  const keys = ["all1", "any1", "cond", "cond1", "filter1", "find", "find1", "is1", "map1", "max1", "match", "match1", "none1", "time", "tap", "tap1", "tapc"];
  keys.forEach(key => expect(Object.keys(result)).toContain(key));
});

const index = require("../../../src/functions/wait/index");

test("result is object", () => {
  const result = index();
  expect(typeof result).toBe("object");
  const keys = [
    "all1", "any1", "cond", "cond1", "filter1",
    "find", "find1", "is1", "map1", "match", "match1",
    "max1", "none1", "tap", "tap1", "tapc", "time"
  ];
  keys.forEach(key => expect(Object.keys(result)).toContain(key));
});

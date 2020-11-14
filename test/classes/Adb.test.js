const Adb = require("../../src/classes/Adb");

test("wmSize", () => {
  const adb = Adb.init("adb");
  const keys = Object.keys(adb.wmSize);
  ["width", "height"].forEach(key => expect(keys).toContain(key));
});

const Adb = require("../../src/classes/Adb");

test("capture successful", async () => {
  const adb = Adb.init("adb");
  await adb.capture();
});

test("wmSize", () => {
  const adb = Adb.init("adb");
  const keys = Object.keys(adb.wmSize);
  ["width", "height"].forEach(key => expect(keys).toContain(key));
});

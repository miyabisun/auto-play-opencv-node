const autoplay = require("../index.js");
const waitMs = ms =>
  new Promise(resolve => setTimeout(resolve, ms));

const {screen} = await autoplay("adb");
while true
  await screen.capture("snap.png");
  await waitMs(500);

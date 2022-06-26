const cv = require("./opencv.js");

module.exports = ({screen, template, method}) => {
  const sm = cv.matFromImageData(screen);
  const tm = cv.matFromImageData(template);
  const dst = new cv.Mat();

  cv.matchTemplate(sm, tm, dst, cv[method]);
  const result = cv.minMaxLoc(dst);
  [sm, tm, dst].forEach(it => it.delete());

  const {x, y} = result.maxLoc;
  const {width, height} = template;

  return {
    val: result.maxVal,
    position: {
      x: x + Math.floor(width / 2),
      y: y + Math.floor(height / 2),
    },
  };
}

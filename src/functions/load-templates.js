const read = require("fs-readdir-recursive");
const R = require("ramda");
const Image = require("../classes/Image");

const rmEx = R.replace(/\.[^.]+$/, "")

module.exports = async path => {
  const promises = read(path)
    .filter(R.match(/(jpe?g|png)$/))
    .map(p =>
      Image.read(`${path}/${p}`).then(img => ({[rmEx(p)]: img}))
    )
  return Promise.all(promises).then(R.mergeAll);
}

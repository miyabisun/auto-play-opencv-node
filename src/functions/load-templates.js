const read = require("fs-readdir-recursive");
const R = require("ramda");
const Image = require("../classes/Image");

module.exports = async path => {
  const promises = read(path)
    .filter(R.match(/png$/))
    .map(p => [p, R.replace(/\.[^.]+$/, "", p)])
    .map(([p, name]) =>
      Image.read(`${path}/${p}`, name).then(img => ({[name]: img}))
    );
  return Promise.all(promises).then(R.mergeAll);
}

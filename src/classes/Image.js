const cv = require("../../lib/opencv");
const Jimp = require("jimp");

module.exports = class Image {
  constructor (data) {
    this.data = data;
  }

  static async read (item) {
    const data = await Jimp.read(item);
    return new Image(data);
  }

  async write (path) {
    return this.data.writeAsync(path);
  }

  mat () {
    return cv.matFromImageData(this.data.bitmap);
  }

  get width () {
    return this.data.bitmap.width;
  }

  get height () {
    return this.data.bitmap.height;
  }
}

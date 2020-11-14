const Jimp = require("jimp");

module.exports = class Image {
  constructor (data, name = null) {
    this.data = data;
    this.name = name;
  }

  static async read (item, name = null) {
    const data = await Jimp.read(item);
    return new Image(data, name);
  }

  async write (path) {
    return this.data.writeAsync(path);
  }

  get bitmap () {
    return this.data.bitmap;
  }

  get width () {
    return this.bitmap.width;
  }

  get height () {
    return this.bitmap.height;
  }
}

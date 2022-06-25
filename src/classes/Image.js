const Jimp = require("jimp");

module.exports = class Image {
  constructor (data, name = null) {
    this.data = data;
    this.name = name;
    this._bitmap = null;
  }

  static async read (item, name = null) {
    const data = await Jimp.read(item);
    return new Image(data, name);
  }

  async write (path) {
    return this.data.writeAsync(path);
  }

  get bitmap () {
    if (this._bitmap) return this._bitmap;
    this._bitmap = this.data.bitmap;
    return this._bitmap;
  }

  get width () {
    return this.bitmap.width;
  }

  get height () {
    return this.bitmap.height;
  }
}

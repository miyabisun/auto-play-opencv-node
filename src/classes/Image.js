const Jimp = require("jimp");

module.exports = class Image {
  constructor (bitmap, opt = {}) {
    Object.entries(opt).forEach(([k, v]) => this[k] = v);
    this.bitmap = bitmap;
  }

  static fromData (data, name = null) {
    return new Image(data.bitmap, {data, name});
  }

  static async read (item, name = null) {
    const data = await Jimp.read(item);
    return Image.fromData(data, name)
  }

  static fromRawData (rawData) {
    const width = rawData.readInt32LE(0);
    const height = rawData.readInt32LE(4);
    const data = rawData.subarray(16);
    return new Image({width, height, data})
  }

  async createData () {
    return new Promise((resolve, reject) => {
      new Jimp(this.bitmap, (err, image) => {
        if (err) reject(err);
        this.data = image;
        resolve();
      })
    });
  }

  async write (path) {
    if (this.data == null) await this.createData();
    return this.data.writeAsync(path);
  }

  async crop (x, y, x2, y2) {
    if (this.data == null) await this.createData();
    const w = x2 - x;
    const h = y2 - y;
    const cropped = this.data.crop(x, y, w, h);
    return Image.fromData(cropped);
  }

  get width () {
    return this.bitmap.width;
  }

  get height () {
    return this.bitmap.height;
  }
}

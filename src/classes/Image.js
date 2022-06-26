const Jimp = require("jimp");

module.exports = class Image {
  constructor (bitmap, opt = {}) {
    Object.entries(opt).forEach(([k, v]) => this[k] = v);
    this.bitmap = bitmap;
  }

  static async read (item, name = null) {
    const data = await Jimp.read(item);
    return new Image(data.bitmap, {data, name});
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
    if (this.data == null) await createData();
    return this.data.writeAsync(path);
  }

  get width () {
    return this.bitmap.width;
  }

  get height () {
    return this.bitmap.height;
  }
}

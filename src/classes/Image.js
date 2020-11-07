const sharp = require("sharp");
const cv = require("../../lib/opencv");
const Jimp = require("jimp");

module.exports = class Image {
  constructor (buffer, meta) {
    this.buffer = buffer;
    this.meta = meta;
  }

  static async read (item) {
    const image = sharp(item);
    const buffer = await image.toBuffer();
    const meta = await image.metadata();
    return new Image(buffer, meta);
  }

  async write (path) {
    return sharp(this.buffer).toFile(path);
  }

  async mat () {
    const jimp = await Jimp.read(this.buffer);
    return cv.matFromImageData(jimp.bitmap);
  }

  get width () {
    return this.meta.width;
  }

  get height () {
    return this.meta.height;
  }
}

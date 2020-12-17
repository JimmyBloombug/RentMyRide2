const multer = require('multer');
const { v1: uuidv1 } = require('uuid');
const jimp = require('jimp');
const fs = require('fs');

class StorageEngine {
  static storage;
  static filter;
  upload;

  constructor(destination, maxSize) {
    // Storage
    this.storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, destination);
      },
      filename: (req, file, cb) => {
        const fileExtension = file.mimetype.split('/');
        cb(null, uuidv1() + `.${fileExtension[1]}`);
      },
    });

    // Filter
    this.filter = (req, file, cb) => {
      // reject file
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
      } else {
        cb(null, false);
      }
    };

    // Upload
    this.upload = multer({
      storage: this.storage,
      limits: {
        fileSize: maxSize,
      },
      fileFilter: this.filter,
    });
  }

  unlink(image) {
    fs.unlink(image, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(image + ' was deleted');
      }
    });
  }

  async imageHandler(image, width = 600, height = 400, quality = 100) {
    jimp
      .read(image)
      .then((carImage) => {
        return carImage.cover(width, height).quality(quality).write(image);
      })
      .catch((err) => {
        return false;
      });
  }
}

module.exports = StorageEngine;

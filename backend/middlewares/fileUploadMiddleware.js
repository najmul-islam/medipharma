const asyncHandler = require("express-async-handler");
const path = require("path");
const fs = require("fs");
const slugify = require("slugify");

/* user photo upload middleware */
const userPhoto = asyncHandler(async (req, res, next) => {
  const photo = req.files.photo;
  const name = req.body.name;

  if (!photo) {
    res.status(400);
    throw new Error("Please add a photo");
  }

  const extension = path.extname(photo.name);
  const allowedExtensions = /^\.jpg|\.jpeg|\.png$/;
  if (!allowedExtensions.test(extension)) {
    res.status(400);
    throw new Error(
      `File format ${extension} not supported. Allowed formats are: jpg, png`
    );
  }

  // change name
  const photoName = `${name
    .toLowerCase()
    .split(/[ .:;?!~,_`"&|()<>{}\[\]\r\n/\\]+/)
    .join("-")}-${Date.now()}${extension}`;

  const photoPath = path.join(__dirname, "../public/photos", photoName);
  const photoDir = path.join(__dirname, "../public/photos");

  if (!fs.existsSync(photoDir)) {
    fs.mkdirSync(photoDir, { recursive: true });
  }

  photo.mv(photoPath, (err) => {
    if (err) {
      res.status(500);
      throw new Error("Failed to upload photo");
    }
  });

  req.photo = {
    path: `/photos/${photoName}`,
    filename: photoName,
    fullPath: photoPath,
  };

  next();
});

/* category thumbnail middleware */
const categoryPhoto = asyncHandler(async (req, res, next) => {
  const thumbnail = req.files.thumbnail;
  const category = req.body.name;
  const categorySlug = slugify(category, { lower: true });

  if (!thumbnail) {
    res.status(400);
    throw new Error("Please add a thumbnail");
  }

  const allowedExtensions = /^\.jpg|\.jpeg|\.png$/;
  const extension = path.extname(thumbnail.name);

  if (!allowedExtensions.test(extension)) {
    res.status(400);
    throw new Error(
      `File format ${extension} not supported. Allowed formats are: jpg, png`
    );
  }

  // Create directory for category thumbnails if it doesn't exist
  const categoryDir = path.join(__dirname, `../public/categories`);
  if (!fs.existsSync(categoryDir)) {
    fs.mkdirSync(categoryDir, { recursive: true });
  }

  // Rename and move the thumbnail
  const thumbnailName = `${categorySlug}${extension}`;
  const thumbnailPath = path.join(categoryDir, thumbnailName);

  thumbnail.mv(thumbnailPath, (err) => {
    if (err) {
      res.status(500);
      throw new Error("Failed to upload thumbnail");
    }
  });

  // Set the thumbnail path in req.category for further use
  req.category = req.category || {};
  req.category.thumbnail = `/categories/${thumbnailName}`;

  next();
});

/* product photo upload middleare */
const productPhoto = asyncHandler(async (req, res, next) => {
  const photos = req.files.photos;
  const name = req.body.name;
  const nameSlug = slugify(name, { lower: true });

  if (!photos || photos.length === 0) {
    res.status(400);
    throw new Error("Please add at least one photo");
  }

  const allowedExtensions = /^\.jpg|\.jpeg|\.web|\.png$/;
  const photoPaths = [];

  const productDir = path.join(__dirname, `../public/product/${nameSlug}`);

  if (!fs.existsSync(productDir)) {
    fs.mkdirSync(productDir, { recursive: true });
  }

  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i];
    const extension = path.extname(photo.name);

    if (!allowedExtensions.test(extension)) {
      res.status(400);
      throw new Error(
        `File format ${extension} not supported. Allowed formats are: jpg, png`
      );
    }

    // Rename and move the photo
    const photoName = `${nameSlug}-${i + 1}${extension}`;
    const photoPath = path.join(productDir, photoName);

    photo.mv(photoPath, (err) => {
      if (err) {
        res.status(500);
        throw new Error("Failed to upload photo");
      }
    });

    photoPaths.push(`/photos/${productTitleSlug}/${photoName}`);
  }

  req.product = req.product || {};
  req.product.photos = photoPaths;

  next();
});

module.exports = { userPhoto, categoryPhoto, productPhoto };

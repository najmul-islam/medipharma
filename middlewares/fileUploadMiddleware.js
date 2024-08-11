const asyncHandler = require("express-async-handler");
const path = require("path");
const fs = require("fs");

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

module.exports = { userPhoto };

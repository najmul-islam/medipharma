const expressFileUpload = require("express-fileupload");
const path = require("path");

const fileUpload = () => {
  return expressFileUpload();
};

module.exports = fileUpload;

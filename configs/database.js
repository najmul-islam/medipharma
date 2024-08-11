const mongoose = require("mongoose");

const connectDB = async (url) => {
  const conn = mongoose.connect(url);
  console.log(`mongodb connected`.cyan.underline);
  return conn;
};

module.exports = connectDB;

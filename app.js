const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const database = require("./configs/database");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const start = async () => {
  try {
    await database(process.env.MONGO_URI);
    app.listen(
      process.env.PORT,
      console.log(`app is listening port ${process.env.PORT}`.blue.underline)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

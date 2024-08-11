const nodemailer = require("nodemailer");

const transporter = () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_EMAIL_PASS,
    },
  });
  return transporter;
};

module.exports = transporter;

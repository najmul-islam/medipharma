const nodemailer = require("../configs/nodemailer");

const sendVerifyEmail = async (user) => {
  try {
    const transforter = nodemailer();
    const mailOption = {
      from: `"medistore" <${process.env.NODEMAILER_EMAIL}>`,
      to: user.email,
      subject: "medistore verification link",
      html: `
    <p>Hello ${user.name}, verify your email by clicking this link</p>
    <a href='${process.env.CLIENT_URL}/verify-email?verifyToken=${user.verifyToken}&name=${user.name}&email=${user.email}'>Verify Your Email</a>
    `,
    };

    await transforter.sendMail(mailOption);
    console.log("Verification email sent");
  } catch (error) {
    console.error(error);
  }
};

module.exports = sendVerifyEmail;

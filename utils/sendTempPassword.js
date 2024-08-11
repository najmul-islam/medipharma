const nodemailer = require("../configs/nodemailer");

const sendTempPassword = async (user) => {
  try {
    const transporter = nodemailer();
    const mailOption = {
      from: `"medistore" <${process.env.NODEMAILER_EMAIL}>`,
      to: user.email,
      subject: "medistore reset password",
      html: `
    <a href="${process.env.CLIENT_URL}">Medistore</a>
    <p>Please use the following code for your Medistore's verification code: <storng>${user.tempPassword}</storng></p>
    `,
    };

    await transporter.sendMail(mailOption);
    console.log("Temp Password sent in mail");
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendTempPassword;

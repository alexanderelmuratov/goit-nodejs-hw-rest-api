const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (email, verificationToken) => {
  const href = `http://localhost:3000/api/users/verify/${verificationToken}`;
  const mail = {
    to: email,
    from: "elmuratov@gmail.com",
    subject: "Confirmation email",
    html: `<a target="_blank" href=${href}>Click here to confirm your email</a>`,
  };

  try {
    await sgMail.send(mail);
    return true;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = sendEmail;

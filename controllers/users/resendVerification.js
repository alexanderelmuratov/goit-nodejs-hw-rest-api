const createError = require("http-errors");

const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const resendVerification = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw createError(404, "User not found");
  }

  if (user.verify) {
    throw createError(400, "Verification has already been passed");
  }

  await sendEmail(email, user.verificationToken);

  res.json({
    status: "success",
    code: 200,
    message: "Verification email sent",
  });
};

module.exports = resendVerification;

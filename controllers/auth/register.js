const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4 } = require("uuid");

const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const register = async (req, res) => {
  const { email, password, subscription = "starter" } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw createError(409, `Email ${email} in use`);
  }

  const verificationToken = v4();

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const avatarURL = gravatar.url(email);

  await User.create({
    email,
    password: hashedPassword,
    subscription,
    avatarURL,
    verificationToken,
  });

  await sendEmail(email, verificationToken);

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription,
        avatarURL,
        verificationToken,
      },
    },
  });
};

module.exports = register;

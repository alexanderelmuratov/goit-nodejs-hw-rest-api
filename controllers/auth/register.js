const createError = require("http-errors");
const bcrypt = require("bcryptjs");

const { User } = require("../../models");

const register = async (req, res) => {
  const { email, password, subscription = "starter" } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, `Email ${email} in use`);
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await User.create({ email, password: hashedPassword, subscription });

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription,
      },
    },
  });
};

module.exports = register;

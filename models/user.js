const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const registerJoiSchema = Joi.object({
  password: Joi.string()
    .required()
    .messages({ "any.required": "Password is required" }),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
    .messages({ "any.required": "Email is required" }),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const loginJoiSchema = Joi.object({
  password: Joi.string()
    .required()
    .messages({ "any.required": "Password is required" }),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
    .messages({ "any.required": "Email is required" }),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

const subscriptionJoiSchema = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .required()
    .messages({ "any.required": "Subscription is required" }),
});

const User = model("user", userSchema);

module.exports = {
  User,
  registerJoiSchema,
  loginJoiSchema,
  subscriptionJoiSchema,
};

const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  name: Joi.string()
    .pattern(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "letters"
    )
    .required()
    .messages({ "any.required": "Missing field name" }),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
    .messages({ "any.required": "Missing field email" }),
  phone: Joi.string()
    .pattern(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      "numbers"
    )
    .required()
    .messages({ "any.required": "Missing field phone" }),
  favorite: Joi.boolean(),
});

const statusJoiSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": "Missing field favorite" }),
});

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  joiSchema,
  statusJoiSchema,
};

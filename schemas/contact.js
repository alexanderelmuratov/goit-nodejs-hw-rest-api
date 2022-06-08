const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/, 'letters') 
    .required()
    .messages({ 'any.required': 'missing required name field' }),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
    .messages({ 'any.required': 'missing required email field' }),
  phone: Joi.string()
    .pattern(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/, 'numbers')
    .required()
    .messages({ 'any.required': 'missing required phone field' }),
});

module.exports = contactSchema;
const Joi = require("joi");

const contactSchema = Joi.object({
  email: Joi.string().required(),
  phone: Joi.string().required(),
  name: Joi.string().required(),
});

module.exports = contactSchema;
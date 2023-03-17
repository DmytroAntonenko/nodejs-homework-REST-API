const Joi = require("joi");

const EmailSchema = Joi.object({
  email: Joi.string().required(),
});

module.exports = EmailSchema;
const Joi = require("joi");

const contactSchema = Joi.object({
  email: Joi.string().required(),
  phone: Joi.string().required(),
  name: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {contactSchema, updateFavoriteSchema};

const Joi = require("joi");

const registerSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
    subscription: Joi.string(),
  });
  
  const loginSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
  });
  
  const subscriptionSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business"),
  });



module.exports = { registerSchema, loginSchema, subscriptionSchema };
const Joi = require("joi");

const userRegistrationSchema = Joi.object({
  password: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
}).required();

module.exports = userRegistrationSchema

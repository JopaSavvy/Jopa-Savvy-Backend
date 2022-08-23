const Joi = require("joi");
const text = Joi.string().trim();
const email = Joi.string().email().required();

// email, first_name, last_name, password, phone, address, is_admin;

const signupSchema = Joi.object({
  email: email,
  first_name: text,
  last_name: text,
  password: text.required(),
  phone: Joi.number(),
  address: text,
  is_admin: Joi.boolean()
});

const loginSchema = Joi.object({
  email: email,
  password: text.required(),
});

const resetPasswordSchema = Joi.object({
  email: email,
  currentPassword: text.required(),
  newPassword: text.required(),
});

module.exports = {
  resetPasswordSchema,
  signupSchema,
  loginSchema
};

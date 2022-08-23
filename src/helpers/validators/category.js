const Joi = require("joi");

const Schema = Joi.object({
  name: Joi.string().trim().min(3).required(),
});

module.exports = {
  Schema
};

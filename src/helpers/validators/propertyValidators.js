const Joi = require("joi");
const text = Joi.string().trim().min(3);
const requiredText = text.required();

const updateSchema = Joi.object({
  name: text,
  description: text,
  price: Joi.number(),
  quantity: Joi.number(),
  category: text,
  stockStatus: Joi.string().custom((value, helper) => {
    if (value !== "In Stock" && value !== "Out of Stock") {
      return helper.message("status should be In Stock or Out of Stock");
    }
    return true;
  }),
});
const newPropertySchema = Joi.object({
  name: requiredText,
  description: requiredText,
  price: Joi.number().required(),
  quantity: Joi.number().required(),
  category: requiredText,
  stockStatus: Joi.string().custom((value, helper) => {
    if (value !== "in_stock" && value !== "out_of_stock") {
      return helper.message("status should be in_stock or out_of_stock");
    }
    return value;
  }),
});

const reportSchema = Joi.object({
  reason: requiredText,
  description: requiredText,
});
module.exports = {
  updateSchema,
  reportSchema,
  newPropertySchema,
};

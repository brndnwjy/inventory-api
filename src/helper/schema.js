const Joi = require("joi");

const registerSchema = Joi.object({
  fullname: Joi.string().alphanum().min(6).max(64).required(),
  email: Joi.string().email({ minDomainSegments: 2 }),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,64}$")),
}).with("fullname", ["email", "password"]);

const loginSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,64}$")),
}).with("email", "password");

const categorySchema = Joi.string().min(3).max(64).required();

const productSchema = Joi.object({
  cid: Joi.string().required(),
  title: Joi.string().max(64),
  description: Joi.string(),
  stock: Joi.number(),
}).with("cid", ["title", "description", "stock"]);

module.exports = {
  registerSchema,
  loginSchema,
  categorySchema,
  productSchema,
};

import Joi from "joi";

export const createBookModel = Joi.object().keys({
  name: Joi.string().required(),
  size: Joi.number().required(),
  price: Joi.number().required(),
  stores: Joi.array().required(),
});

export const updateBookModel = Joi.object().keys({
  name: Joi.string().required(),
  size: Joi.number().required(),
  price: Joi.number().required(),
  stores: Joi.array().required(),
  completed: Joi.boolean()
});
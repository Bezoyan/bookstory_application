import Joi from "joi";

export const createStoreModel = Joi.object().keys({
  name: Joi.string().required(),
  books:Joi.array()
});

export const updateStoreModel = Joi.object().keys({
  name: Joi.string().required(),
  books:Joi.array(),
  completed: Joi.boolean()
});
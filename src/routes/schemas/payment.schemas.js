const Joi = require('joi');

const paymentCreateSchema = Joi.object({
  contractId: Joi.number().min(0).required(),
  description: Joi.string(),
  value: Joi.number().required(),
  time: Joi.string().isoDate().required(),
});

const paymentUpdateSchema = Joi.object({
  description: Joi.string(),
  value: Joi.number(),
  time: Joi.string().isoDate(),
});

module.exports = {
  paymentCreateSchema,
  paymentUpdateSchema,
};

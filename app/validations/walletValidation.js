const Joi = require('joi');
const JoiException = require('../exceptions/joiException');
async function initValidation(req, res, next) {
  const schema = Joi.object({
    customer_xid: Joi.string().required(),
  });

  const { error } = schema.validate(req.body, {
    allowUnknown: false,
    abortEarly: false,
  });

  if (error) throw new JoiException(error, 402);

  return next();
}
async function csValidation(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  const { error } = schema.validate(req.body, {
    allowUnknown: false,
    abortEarly: false,
  });

  if (error) throw new JoiException(error, 402);

  return next();
}

async function depositValidation(req, res, next) {
  const schema = Joi.object({
    amount: Joi.number().required(),
  });

  const { error } = schema.validate(req.body, {
    allowUnknown: false,
    abortEarly: false,
  });

  if (error) throw new JoiException(error, 402);

  return next();
}

module.exports = {
  initValidation,
  depositValidation,
  csValidation
};

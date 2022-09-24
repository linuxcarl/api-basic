import Joi from 'joi';

const id = Joi.string().guid({ version: ['uuidv4'] });
const name = Joi.string().min(3).max(150);
const lastName = Joi.string().min(3).max(150);
const phone = Joi.string().min(10).max(15);
const userId = Joi.string().guid({ version: ['uuidv4'] });

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  userId: userId.required(),
});

const updateCustomerSchema = Joi.object({
  name: name,
  lastName: lastName,
  phone: phone,
  userId: userId,
});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

export { createCustomerSchema, updateCustomerSchema, getCustomerSchema };

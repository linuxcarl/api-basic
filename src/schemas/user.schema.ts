import Joi from 'joi';

const id = Joi.string().guid({ version: ['uuidv4'] });
const email = Joi.string().min(3).max(150);
const password = Joi.string().min(6).max(150);
const role = Joi.string().min(5).max(150);

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required(),
});

const updateUserSchema = Joi.object({
  email: email,
  password: password,
  role: role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

export { createUserSchema, updateUserSchema, getUserSchema };

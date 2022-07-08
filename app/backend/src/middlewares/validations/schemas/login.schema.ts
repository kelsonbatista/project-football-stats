import * as Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string().required().lowercase().email(),
  password: Joi.string().required().min(6),
});

export default loginSchema;

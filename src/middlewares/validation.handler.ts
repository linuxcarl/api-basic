import boom from '@hapi/boom';
import { Schema } from 'joi';

function validatorHandler(schema: Schema, property: any) {
  return (req: any, res: any, next: any) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error.message));
    }
    next();
  };
}
export { validatorHandler };

import { Request, Response } from 'express';
const { ValidationError } = require('Sequelize');
function logErrors(
  err: { stack: any },
  req: Request,
  res: Response,
  next: (arg0: any) => void
) {
  console.error(err.stack);
  next(err);
}

function errorHandler(
  err: {
    message: String;
    stack: String;
  },
  req: Request,
  res: Response,
  next: (arg0: any) => void
) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}
function boomErrorHandler(
  err: {
    message: String;
    stack: String;
    isBoom: boolean;
    output: { statusCode: number; payload: any };
  },
  req: Request,
  res: Response,
  next: (arg0: any) => void
) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}
function sequelizeErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: (arg0: any) => void
) {
  if (err.name.includes('Sequelize')) {
    res.status(412).json({
      message: err.parent.detail,
    });
  }
  next(err);
}
export { logErrors, errorHandler, boomErrorHandler, sequelizeErrorHandler };

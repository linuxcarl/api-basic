import { Request, Response } from 'express';
function logErrors(
  err: { stack: any },
  req: Request,
  res: Response,
  next: (arg0: any) => void
) {
  console.log('logErrors');
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
  console.log('errorHandler');
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
export { logErrors, errorHandler, boomErrorHandler };

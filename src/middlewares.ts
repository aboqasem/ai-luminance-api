import { Request, Response, NextFunction } from 'express';
import { query } from 'express-validator';

const rgbValuesValidator = [
  query(['r', 'g', 'b'])
    .isInt({ min: 0, max: 255 }),
];

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/* eslint-disable-next-line no-unused-vars */
const errorHandler = (error: any, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode)
    .json({
      message: error.message,
      error: process.env.NODE_ENV === 'production' ? '⚠️' : error.stack,
    });
};

export { rgbValuesValidator, notFound, errorHandler };

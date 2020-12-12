const { query } = require('express-validator');

const rgbValuesValidator = [
  query(['r', 'g', 'b'])
    .isInt({ min: 0, max: 255 }),
];

const notFound = (req, res, next) => {
  const error = new Error(`Not Found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/* eslint-disable-next-line no-unused-vars */
const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode)
    .json({
      message: error.message,
      stack: process.env.NODE_ENV === 'production' ? '⚠️' : error.stack,
    });
};

module.exports = { rgbValuesValidator, notFound, errorHandler };

const { failure } = require('./utils/router.utils');
const { strToInt, strToDate } = require('./utils/parsing.utils');
const { PaymentServiceError, ClientError } = require('./errors');

const parseIntParam = (key = 'id') => (req, res, next) => {
  if (req.params[key]) {
    try {
      req.params[key] = strToInt(req.params[key]);
    } catch (e) {
      next(e);
    }
  }

  next();
};

const parseQueryParams = (parserFn) => (keys) => (req, res, next) => {
  if (!keys) {
    throw new Error(
      'Middleware is not properly configured',
    );
  }

  for (const key of keys) {
    const value = req.query[key];

    if (!value) continue;

    req.query[key] = parserFn(value);
  }

  next();
};

const validateBodyWithSchema = (schema) => (req, res, next) => {
  const response = schema.validate(req.body);

  if (response.error) {
    throw new ClientError(response.error.message);
  }

  next();
};

const errorHandler = (err, req, res, next) => {
  if (err instanceof PaymentServiceError) {
    failure(res, err.title, err.detail, err.statusCode);
    return next();
  }

  if (err instanceof Error) {
    failure(res, 'Unhandled Error', err.message);
    return next();
  }

  return next(err);
};

module.exports = {
  parseIntParam,
  errorHandler,
  parseIntQueryParams: parseQueryParams(strToInt),
  parseDateQueryParams: parseQueryParams(strToDate),
  validateBodyWithSchema,
};

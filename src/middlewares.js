const { failure } = require('./utils/router.utils');
const { PaymentServiceError, ClientError } = require('./errors');

const parseIntParam = (key = 'id') => (req, res, next) => {
  if (req.params[key]) {
    try {
      const value = parseInt(req.params[key], 10);

      if (Number.isNaN(value)) {
        throw new ClientError(
          `Invalid value for ${key}`,
        );
      }

      req.params[key] = value;
    } catch (e) {
      next(e);
    }
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
};

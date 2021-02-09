const { toError } = require('./utils/router.utils');

const parseIntParam = (key = 'id') => (req, res, next) => {
  if (req.params[key]) {
    try {
      const value = parseInt(req.params[key], 10);

      if (Number.isNaN(value)) throw Error(`Invalid value for ${key}`);

      req.params[key] = value;
    } catch (e) {
      next(e);
    }
  }

  next();
};

const errorHandler = (err, req, res, next) => {
  if (err instanceof Error) {
    // TODO: create custom errors that hold status codes and better error descriptions
    res.json(toError(err.message)).status(500);
    return next();
  }

  return next(err);
};

module.exports = {
  parseIntParam,
  errorHandler,
};

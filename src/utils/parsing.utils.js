const moment = require('moment');
const { ClientError } = require('../errors');

const strToInt = (strVal) => {
  const value = parseInt(strVal, 10);

  if (Number.isNaN(value)) {
    throw new ClientError(
      `Invalid value for ${strVal}`,
    );
  }

  return value;
};

const strToDate = (strVal) => {
  const value = moment.utc(strVal);

  if (!value.isValid()) {
    throw new ClientError(
      `Invalid date value for ${strVal}. Please supply date in ISO format`,
    );
  }

  return value;
};

module.exports = {
  strToDate,
  strToInt,
};

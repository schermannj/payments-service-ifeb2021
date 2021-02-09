const success = (res, data) => {
  if (!data) return res.status(200);

  return res.status(200).json(data);
};

const toError = (detail, status = 500, title = 'Server Error') => ({
  errors: [
    {
      status,
      title,
      detail,
    },
  ],
});

const failure = (res, detail, status = 500) => res.status(status).json(toError(detail, status));

module.exports = {
  success,
  failure,
  toError,
};

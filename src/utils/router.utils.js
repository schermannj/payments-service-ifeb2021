const success = (res, data) => {
  if (!data) return res.status(200);

  return res.status(200).json(data);
};

const toError = (title, detail, status = 500) => ({
  errors: [
    {
      status,
      title,
      detail,
    },
  ],
});

const failure = (res, title, detail, status = 500) => res.status(status)
  .json(toError(title, detail, status));

module.exports = {
  success,
  failure,
  toError,
};

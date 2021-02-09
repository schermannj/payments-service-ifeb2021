const success = (res, data) => {
  if (!data) return res.status(200);

  return res.status(200).json(data);
};

const failure = (res, detail, status = 500) => {
  return res.status(status).json({
    errors: [
      {
        status,
        title: 'Server Error',
        detail,
      },
    ],
  });
};

module.exports = {
  success,
  failure,
};

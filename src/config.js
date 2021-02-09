module.exports = {
  port: process.env.PORT || 3000,
  log_level: parseInt(process.env.LOG_LEVEL, 10) || 30,
};

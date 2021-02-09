const pino = require('pino');
const config = require('./config');

const logger = pino({ level: config.log_level });

/**
 * Simple logger wrapper.
 */
module.exports = {
  info: (...args) => logger.info(...args),
  error: (...args) => logger.error(...args),
  warn: (...args) => logger.warn(...args),
  debug: (...args) => logger.debug(...args),
};

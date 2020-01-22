const dotenv = require('dotenv');
const path = require('path');
const { PRODUCTION, TESTING, DEVELOPMENT } = require('../const/env');
const logger = require('../logger/logger');

module.exports = (() => {
  dotenv.config({ path: path.resolve(__dirname, 'node_env.env') });
  const nodeEnv = (`${process.env.NODE_ENV}`).trim();
  logger.info(`node_env is ${process.env.NODE_ENV}`);
  if (nodeEnv === PRODUCTION) {
    logger.info('Loading production config');
    dotenv.config({ path: path.resolve(__dirname, 'production.env') });
  } else if (nodeEnv === TESTING) {
    logger.info('Loading testing config');
    dotenv.config({ path: path.resolve(__dirname, 'testing.env') });
  } else if (nodeEnv === DEVELOPMENT) {
    logger.info('Loading development config');
    dotenv.config({ path: path.resolve(__dirname, 'development.env') });
  } else {
    logger.error(`No environment variable set ${nodeEnv}`);
    process.exit();
  }
  return process.env;
})();

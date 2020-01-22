const { createLogger, format, transports } = require('winston');
const { PRODUCTION } = require('../const/env');
/**
 * Last Update 31-7-2019
 * we are going to create three different logger environment
 * Development
 * Testing
 * Production
 * Logging levels
 * -- For development --
 * info  -> only logged in console
 * waring -> only logged in console
 * error -> all error will be written in file
 * -- For Testing and production --
 * all the warning are going to write on file
 */

const devlopmentEnvironmentLogger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.json(),
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'development.log',
      dirname: 'logs',
      timestamp: true,
    }),
    new transports.File({
      filename: 'error.log',
      dirname: 'logs',
      level: 'error',
      timestamp: true,
    }),
  ],
});

const productionEnvironmentLogger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.json(),
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'development.log',
      dirname: 'logs',
      timestamp: true,
    }),
    new transports.File({
      filename: 'error.log',
      dirname: 'logs',
      level: 'error',
      timestamp: true,
    }),
  ],
});


if (global.nodeEnv === PRODUCTION) module.exports = productionEnvironmentLogger;
else module.exports = devlopmentEnvironmentLogger;

const Sequelize = require('sequelize');
const config = require('../config/config');
const {
  PASSWORD, PORT, USER, DATABASE, HOST,
} = require('./database.const');
const { validateConfig } = require('./database.connection');
const logger = require('../logger/logger');

module.exports = () => new Promise((resolve, reject) => {
  const configValidation = validateConfig(config);
  if (configValidation) {
    const sequelize = new Sequelize(config.db[DATABASE], config.db[USER], config.db[PASSWORD], {
      host: config.db[HOST],
      port: config.db[PORT],
      dialect: 'postgresql',
      logging: false,
    });
    sequelize.authenticate()
      .then(() => resolve(sequelize))
      // eslint-disable-next-line no-unused-vars
      .catch((_err) => reject(new Error('authentication failed')));
  }
  else {
    reject(new Error(configValidation));
  }
});

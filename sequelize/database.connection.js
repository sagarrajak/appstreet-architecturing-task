const _ = require('lodash');
const {
  PASSWORD, PORT, USER, DATABASE, HOST,
} = require('./database.const');

exports.validateConfig = (config) => {
  if (config.db[DATABASE]
    && config.db[USER] && config.db[PASSWORD] && config.db[PORT]
    && config.db[HOST]) { return true; }

  return [PASSWORD, USER, PORT, DATABASE, HOST]
    .reduce((accumulator, key) => {
      if (_.isUndefined(config.db[key]) || !config.db[key]) accumulator[key] = 'Field is missing';
      return accumulator;
    }, {});
};

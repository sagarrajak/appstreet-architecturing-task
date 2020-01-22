const _ = require('lodash');

/**
 * @param {Object} passedConfig
 * @param {Object} passedEnv
 * @return {Object} newConfig
 * */
function recursiveAssignVariable(passedConfig, passedEnv) {
  const newConfig = {};
  Object.keys(passedConfig).forEach((key) => {
    if (_.isPlainObject(passedConfig[key])) {
      newConfig[key] = recursiveAssignVariable(passedConfig[key], passedEnv);
      return;
    }
    if (passedEnv[key.toUpperCase()]) newConfig[key] = passedEnv[key.toUpperCase()];
    else if (passedEnv[key]) newConfig[key] = passedEnv[key];
    else newConfig[key] = passedConfig[key];
  });
  return newConfig;
}
exports.recursiveAssignVariable = recursiveAssignVariable;

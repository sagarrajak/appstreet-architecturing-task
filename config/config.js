'strict mode';

const env = require('../env/dotenv.config');
const logger = require('../logger/logger');
const { PRODUCTION, TESTING } = require('../const/env');
const { recursiveAssignVariable } = require('./recursive-assign-variable');

const development = require('./development.json');
const production = require('./production.json');
const testing = require('./testing.json');

let config;
const nodeEnv = (process.env.NODE_ENV || '').trim();
if (nodeEnv === PRODUCTION) config = production;
else if (nodeEnv === TESTING) config = testing;
else config = development;

const newConfig = recursiveAssignVariable(config, env);
logger.info(newConfig);
module.exports = newConfig;

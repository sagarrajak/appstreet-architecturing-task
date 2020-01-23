const path = require('path');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const shell = require('shelljs');
const _ = require('lodash');
const fs = require('fs');

const app = express();
const config = require('../config/config');
const logger = require('../logger/logger');

const {
  DEVELOPMENT, TESTING, PRODUCTION,
} = require('../const/env');

const nodeEnv = (process.env.NODE_ENV || '').trim();

if (_.isNil(process.env.NODE_ENV)) {
  logger.error('Please set environment variable in \'env/node_env.env\' or set \'NODE_ENV\'');
  process.exit(0);
} else if (
  nodeEnv !== DEVELOPMENT
  && nodeEnv !== TESTING
  && nodeEnv !== PRODUCTION) {
  logger.error(`NODE_ENV must be either ${PRODUCTION} or ${DEVELOPMENT} or ${TESTING}`);
  process.exit(0);
}

const sequelizeConnect = require('../sequelize/sequelize');
// const mainModule = require('../src/main/routes/route.main');
// const modelsModule = require('../models/models');

app.use(helmet());
app.use(cors());
app.use(compress());
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));

if (process.platform === 'linux') {
  shell.exec('touch env/development.env');
  shell.exec('touch env/testing.env');
  shell.exec('touch env/production.env');
} else {
  if (!fs.existsSync('env/development.env')) { fs.writeFile('env/development.env', '', 'utf8', (err) => { if (err) { throw err; } }); }
  if (!fs.existsSync('env/testing.env')) { fs.writeFile('env/testing.env', '', 'utf8', (err) => { if (err) { throw err; } }); }
  if (!fs.existsSync('env/production.env')) { fs.writeFile('env/production.env', '', 'utf8', (err) => { if (err) { throw err; } }); }
}

(async () => {
  const sequelize = await sequelizeConnect();
  logger.info('Connected to database');
  // await modelsModule(sequelize);
  if (nodeEnv === TESTING) {
    await sequelize.sync({ force: true });
  } else {
    await sequelize.sync();
  }
  http.createServer(app);
  app.listen(process.env.APP_PORT || 3000, () => {
    logger.info(`listening at ${process.env.APP_PORT || 3000} at ${nodeEnv}`);
  });
})();

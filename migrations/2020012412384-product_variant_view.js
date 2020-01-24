const fs = require('fs');
const path = require('path');

const query = fs.readFileSync(path.resolve(__dirname, 'sql/product_variant.sql'));

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(query.toString());
  },
  down: (queryInterface, Sequelize) => {
    return Promise.resolve();
  },
};

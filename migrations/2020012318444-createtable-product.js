const TableName = require('../const/tablename');
const { definition } = require('../models/product');

module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(TableName.PRODUCT, definition, {
      timestamps: true,
      freezeTableName: true,
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(TableName.PRODUCT);
  },
};

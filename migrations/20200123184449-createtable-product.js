const TableName = require('../const/tablename');
const { definition } = require('../models/product');

module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => queryInterface.createTable(TableName.PRODUCT, definition, {
    timestamps: true,
    freezeTableName: true,
  }),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.dropTable(TableName.PRODUCT),
};

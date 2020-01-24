const TableName = require('../const/tablename');
const { definition } = require('../models/attribute');

module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => queryInterface.createTable(TableName.ATTRIBUTES, definition, {
    timestamps: true,
    freezeTableName: true,
  }),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.dropTable(TableName.ATTRIBUTES),
};

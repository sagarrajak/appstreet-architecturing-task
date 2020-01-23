const TableName = require('../const/tablename');
const { definition } = require('../models/variant');

module.exports = {
  // eslint-disable-next-line no-unused-vars
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(TableName.VARIANT, definition, {
      timestamps: true,
      freezeTableName: true,
    });
  },
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(TableName.VARIANT);
  },
};

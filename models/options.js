
const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const TableName = require('../const/tablename');

exports.definition = {
  value: {
    type: DataTypes.TEXT,
    validate: {
      len: [0, 1000],
    },
  },
  attr_id: {
    references: {
      model: TableName.ATTRIBUTES,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_DEFERRED,
    },
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

module.exports = (sequelize) => {
  const Options = sequelize.define(TableName.OPTIONS, exports.definition, {
    timestamps: true,
    freezeTableName: true,
  });
  return Options;
};

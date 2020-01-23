const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');
const TableName = require('../const/tablename');

exports.definition = {
  name: {
    type: DataTypes.TEXT,
    validate: {
      len: [0, 1000],
    },
  },
  variant_id: {
    type: DataTypes.TEXT,
    references: {
      model: TableName.VARIANT,
      key: 'id',
      deferrable: Sequelize.INTEGER,
    },
  },
  default_value: {
    type: DataTypes.TEXT,
    validate: {
      len: [0, 1000],
    },
  },
};

module.exports = (sequelize) => {
  const Attribute = sequelize.define(TableName.ATTRIBUTES, exports.definition, {
    timestamps: true,
    freezeTableName: true,
  });
  return Attribute;
};

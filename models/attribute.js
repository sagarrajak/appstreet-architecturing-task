const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');
const TableName = require('../const/tablename');

const definition = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.TEXT,
    validate: {
      len: [0, 1000],
    },
  },
  default_value: {
    type: DataTypes.TEXT,
    validate: {
      len: [0, 1000],
    },
  },
  product_id: {
    references: {
      model: TableName.PRODUCT,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_DEFERRED,
    },
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  updatedAt: DataTypes.DATE,
  createdAt: DataTypes.DATE,
};

exports.attributeModel = (sequelize) => {
  const Attribute = sequelize.define(TableName.ATTRIBUTES, definition, {
    timestamps: true,
    freezeTableName: true,
  });
  return Attribute;
};

exports.definition = definition;

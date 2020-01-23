
const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const TableName = require('../const/tablename');

const definition = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
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
  updatedAt: DataTypes.DATE,
  createdAt: DataTypes.DATE,
};

exports.optionsModel = (sequelize) => {
  const Options = sequelize.define(TableName.OPTIONS, definition, {
    timestamps: true,
    freezeTableName: true,
  });
  return Options;
};

exports.definition = definition;

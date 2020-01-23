const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');
const TableName = require('../const/tablename');

const definition = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  variant_name: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.DOUBLE,
  },
  variant_description: {
    type: DataTypes.TEXT,
  },
  updatedAt: DataTypes.DATE,
  createdAt: DataTypes.DATE,
};

exports.variantModel = (sequelize) => {
  const Variant = sequelize.define(TableName.VARIANT, definition, {
    timestamps: true,
    freezeTableName: true,
  });
  return Variant;
};

exports.definition = definition;

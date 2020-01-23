const { DataTypes } = require('sequelize');
const TableName = require('../const/tablename');

const definition = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  product_name: {
    type: DataTypes.TEXT,
    validate: {
      len: [0, 1000],
    },
  },
  company_name: {
    type: DataTypes.TEXT,
    validate: {
      len: [0, 1000],
    },
  },
  description_product: {
    type: DataTypes.TEXT,
    validate: {
      len: [0, 2000],
    },
  },
  updatedAt: DataTypes.DATE,
  createdAt: DataTypes.DATE,
};

exports.productModel = (sequelize) => {
  const Product = sequelize.define(TableName.PRODUCT, definition, {
    timestamps: true,
    freezeTableName: true,
  });
  return Product;
};

exports.definition = definition;

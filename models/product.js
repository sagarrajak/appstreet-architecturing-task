const { DataTypes } = require('sequelize');
const TableName = require('../const/tablename');

exports.definition = {
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
};

module.exports = (sequelize) => {
  const Product = sequelize.define(TableName.PRODUCT, exports.definition, {
    timestamps: true,
    freezeTableName: true,
  });
  return Product;
};

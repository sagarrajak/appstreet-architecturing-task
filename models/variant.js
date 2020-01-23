const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');
const TableName = require('../const/tablename');

exports.definition = {
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
};

module.exports = (sequelize) => {
  const Variant = sequelize.define(TableName.VARIANT, exports.definition, {
    timestamps: true,
    freezeTableName: true,
  });
  return Variant;
};

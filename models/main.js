const OptionModel = require('../models/options');
const ProductModel = require('../models/product');
const VariantModel = require('../models/variant');
const AttributesModel = require('../models/attribute');

module.exports = (sequelize) => {
  const Options = OptionModel(sequelize);
  const Product = ProductModel(sequelize);
  const Variant = VariantModel(sequelize);
  const Attribute = AttributesModel(sequelize);

  return {
    Options,
    Product,
    Variant,
    Attribute,
  };
};

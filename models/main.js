const { optionsModel } = require('../models/options');
const { productModel } = require('../models/product');
const { variantModel } = require('../models/variant');
const { attributeModel } = require('../models/attribute');


module.exports = (sequelize) => {
  const Product = productModel(sequelize);
  const Variant = variantModel(sequelize);
  const Attribute = attributeModel(sequelize);
  const Options = optionsModel(sequelize);
  return {
    Product,
    Options,
    Variant,
    Attribute,
  };
};

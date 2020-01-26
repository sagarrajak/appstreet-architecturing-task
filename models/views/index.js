const { productVariantView } = require('./product_varient');

module.exports = async (sequelize) => {
  await productVariantView(sequelize);
};

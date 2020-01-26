const productVariant = require('./product_varient');

module.exports = async (sequelize) => {
  await productVariant(sequelize);
};

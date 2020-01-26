const fs = require('fs');
const path = require('path');

const query = fs.readFileSync(path.join(__dirname, 'product_varient.sql'));

exports.productVariantView = async (sequelize) => {
  await sequelize.query(query.toString());
};

/* eslint-disable max-len */
const _ = require('lodash');
const productsJSON = require('./products.json');
const TableName = require('../const/tablename');
const variantJSON = require('./varient.json');
const { variantModel } = require('../models/variant');
const { productModel } = require('../models/product');
const { attributeModel } = require('../models/attribute');
const { optionsModel } = require('../models/options');
const config = require('../config/config');
const logger = require('../logger/logger');

const {
  DEVELOPMENT, TESTING, PRODUCTION,
} = require('../const/env');

const nodeEnv = (process.env.NODE_ENV || '').trim();

if (_.isNil(process.env.NODE_ENV)) {
  logger.error('Please set environment variable in \'env/node_env.env\' or set \'NODE_ENV\'');
  process.exit(0);
} else if (
  nodeEnv !== DEVELOPMENT
  && nodeEnv !== TESTING
  && nodeEnv !== PRODUCTION) {
  logger.error(`NODE_ENV must be either ${PRODUCTION} or ${DEVELOPMENT} or ${TESTING}`);
  process.exit(0);
}

const sequelizeConnect = require('../sequelize/sequelize');
const modelsModule = require('../models/main');

const getAllAttributesId = (sequelize, attributes, productId) => {
  const Attribute = attributeModel(sequelize);
  const attributesArray = attributes.map((attr) => Attribute.create({
    name: attr,
    product_id: productId,
  }));
  return Promise.all(attributesArray);
};


const variantCreator = async (sequelize, attrMap, productId, variantObject) => {
  const Variant = variantModel(sequelize);
  const Options = optionsModel(sequelize);
  const createdVariant = await Variant.create({
    ...variantObject,
    product_id: productId,
  });

  const variantPromises = Object.keys(variantObject).map((key) => {
    if (attrMap[key]) {
      return Options.create({
        value: variantObject[key],
        attr_id: attrMap[key].id,
        variant_id: createdVariant.id,
      });
    }
    return null;
  })
    .filter((val) => val != null);
  const optionsCreated = await Promise.all(variantPromises);
  return createdVariant;
};


const seedFunction = async (sequelize) => {
  const attrMaps = {};
  const Product = productModel(sequelize);

  productsJSON.forEach(async (product) => {
    const createdProduct = await Product.create({
      ...product,
    });
    const attributesArray = await getAllAttributesId(sequelize,
      product.attr || [],
      createdProduct.id); // get all created attributes

    product.attr.forEach((attr, index) => {
      attrMaps[attr] = attributesArray[index]; // map created attributes
    });

    if (product.product_name && variantJSON[product.product_name]) {
      variantJSON[product.product_name].forEach(async (variant) => {
        const createdVariant = await variantCreator(sequelize, attrMaps, createdProduct.id, variant);
      });
    }
  });
};

(async () => {
  const sequelize = await sequelizeConnect();
  logger.info('Connected to database');
  await modelsModule(sequelize);
  if (nodeEnv !== PRODUCTION) {
    logger.info('Deleting everting...');
    await sequelize.sync({ force: true }); // delete everything when testing or development
  } else {
    await sequelize.sync();
  }
  await seedFunction(sequelize);
  logger.info('Data Seeded successfully');
})();

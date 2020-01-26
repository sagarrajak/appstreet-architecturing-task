/* eslint-disable no-multi-str */
const { Op } = require('sequelize');
const _ = require('lodash');
const { optionsModel } = require('../../models/options');
const { attributeModel } = require('../../models/attribute');
const logger = require('../../logger/logger');

/**
 * Returns list of all purchasable items
 */
const mapFunction = async (sequelize, prodVar, filterArray) => {
  const Options = optionsModel(sequelize);
  const Attribute = attributeModel(sequelize);
  let allOptions = null;
  if (filterArray && filterArray.length > 0) {
    allOptions = await Options.findAll({
      where: {
        variant_id: prodVar.variant_id,
        [Op.or]: filterArray.map((filterStr) => ({ value: { [Op.like]: `%${filterStr}%` } })),
      },
    });
  } else {
    allOptions = await Options.findAll({
      where: {
        variant_id: prodVar.variant_id,
      },
    });
  }
  const allAttributes = await Promise.all(allOptions.map((option) => Attribute.findOne({
    where: {
      id: option.attr_id,
    },
  })));
  allAttributes.forEach((attribute, index) => {
    prodVar[attribute.name] = allOptions[index].value;
  });
  return prodVar;
};

exports.controller = async (sequelize, req, res, next) => {
  const { search } = req.query; // will be string
  let { filter } = req.query; // will be array
  if (_.isNil(filter)) { filter = []; }
  else if (Array.isArray(filter)) { filter = [filter]; }
  let productVariants = null;
  if (search) {
    productVariants = await sequelize.query(`SELECT * from public.product_variant where \
          variant_name LIKE %${search}% OR \
          variant_description LIKE %${search}% OR \
          price LIKE %${search}% OR \
          product_name LIKE %${search}% OR \
          description_product LIKE %${search}% OR \
          company_name LIKE %${search}% OR \
        `);
  } else {
    productVariants = await sequelize.query('SELECT * from public.product_variant');
  }
  logger.info(productVariants);
  try {
    const listProducts = await Promise.all(
      productVariants[0].map((prodVar) => mapFunction(sequelize, prodVar, filter)),
    );
    return res.status(200).json(listProducts);
  } catch (err) {
    return res.status(401).json({
      err: err.errors,
    });
  }
};

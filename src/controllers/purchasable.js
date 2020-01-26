/* eslint-disable no-multi-str */
const { Op, QueryTypes } = require('sequelize');
const _ = require('lodash');
const fs = require('fs');
const path = require('path');
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
        value: {
          [Op.iLike]: {
            [Op.any]: filterArray.map((str) => `%${str}%`),
          },
        },
      },
    });
    // any option is matching means this is in search
    if (allOptions.length > 0) {
      allOptions = await Options.findAll({
        where: {
          variant_id: prodVar.variant_id,
        },
      });
    } else {
      return null;
    }
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
  else if (!Array.isArray(filter)) { filter = [filter]; }
  let productVariants = null;
  if (search) {
    const query = fs.readFileSync(path.join(__dirname, 'query.sql')).toString().split('\n').join(' ');
    productVariants = await sequelize.query(query.split('\n').join(' '), {
      replacements: { search_name: `%${search}%` },
    });
  } else {
    productVariants = await sequelize.query('SELECT * from public.product_variant');
  }
  try {
    const listProducts = await Promise.all(
      productVariants[0].map((prodVar) => mapFunction(sequelize, prodVar, filter)),
    );
    return res.status(200).json(listProducts.filter((prod) => prod != null));
  } catch (err) {
    return res.status(400).json({
      err,
    });
  }
};

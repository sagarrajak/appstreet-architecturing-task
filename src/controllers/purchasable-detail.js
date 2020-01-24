const { optionsModel } = require('../../models/options');
const { attributeModel } = require('../../models/attribute');

const getProductVariantPromise = async (sequelize, prodVar) => {
  const Options = optionsModel(sequelize);
  const Attribute = attributeModel(sequelize);
  const allOptions = await Options.findAll({
    where: {
      variant_id: prodVar.variant_id,
    },
  });
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

const populateAllData = (sequelize, variants) => {
  return variants.map((variant) => getProductVariantPromise(sequelize, variant));
};

exports.controller = async (sequelize, req, res, next) => {
  const { id } = req.params;
  if (id) {
    try {
      const askedVariants = await sequelize.query(`SELECT * from public.product_variant where variant_id=${id}`);
      if (askedVariants && askedVariants[0][0]) {
        const askedPurchasable = await Promise.all(populateAllData(sequelize, askedVariants[0]));
        const siblingsVariants = await sequelize.query(`SELECT * from public.product_variant where product_id=${askedVariants[0][0].product_id}`);
        const siblingPurchasable = await Promise.all(populateAllData(sequelize, siblingsVariants[0] || []));
        res.status(200).json({
          siblingPurchasable,
          askedPurchasable,
        });
      } else {
        res.status(404).json({
          message: 'Not found',
        });
      }
    } catch (err) {
      res.status(401).json({
        error: err.error,
      });
    }
  } else {
    res.status(404).json({
      message: 'Variation id not found',
    });
  }
};

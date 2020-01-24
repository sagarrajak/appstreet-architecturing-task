const { optionsModel } = require('../../models/options');
const { attributeModel } = require('../../models/attribute');
/**
 * Returns list of all purchasable items
 */
const mapFunction = async (sequelize, prodVar) => {
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


exports.controller = async (sequelize, req, res, next) => {
  const productVariants = await sequelize.query('SELECT * from public.product_variant');
  try {
    const listProducts = await Promise.all(
      productVariants[0].map((prodVar) => mapFunction(sequelize, prodVar)),
    );
    return res.status(200).json(listProducts);
  } catch (err) {
    return res.status(401).json({
      err: err.errors,
    });
  }
};

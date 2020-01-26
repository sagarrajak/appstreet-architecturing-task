/* eslint-disable camelcase */
/* eslint-disable no-plusplus */

/**
 * A file will generate random dataset according to product.json
 * with all possible product and varient
 * it is assumed all the product have unique name
 */
const fs = require('fs');
const path = require('path');
const products = require('./products.json');

/**
 * Asuming unique product name
 */
let ans = [];
const objectToWrite = {};

function dfs(product, i, setVal = {}, attr, company_name) {
  if (i < product.length - 1) {
    for (let j = 0; j < product[i].length; j++) {
      setVal[attr[i]] = product[i][j];
      dfs(product, i + 1, { ...setVal }, attr, company_name);
    }
  }
  else {
    for (let j = 0; j < (product[i]).length; j++) {
      const varient = {
        ...setVal,
        [attr[i]]: product[i][j],
      };
      const description = {
        variant_name: `${Object.values(setVal).join(' ')} ${company_name}`,
        variant_description: Object.values(setVal).join(' '),
        price: (Math.floor(Math.random() * 100000)),
      };
      ans.push({
        ...varient,
        ...description,
      });
    }
  }
}
products.forEach((element) => {
  ans = [];
  dfs(Object.values(element.values), 0, {}, Object.keys(element.values), `${element.product_name} ${element.company_name}`);
  objectToWrite[element.product_name] = ans;
});
fs.writeFileSync(path.join(__dirname, 'varient.json'), JSON.stringify(objectToWrite));

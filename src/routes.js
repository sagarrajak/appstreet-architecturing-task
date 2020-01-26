const express = require('express');
const purchasableController = require('../src/controllers/purchasable').controller;
const purchasableDetailsController = require('../src/controllers/purchasable-detail').controller;

module.exports = (sequelize) => {
  const api = express.Router();
  api.get('/details/:id', (req, res, next) => purchasableDetailsController(sequelize, req, res, next));
  api.get('/list', (req, res, next) => purchasableController(sequelize, req, res, next));
  api.get('/querystring', (req, res, next) => {
    res.json(req.query);
  });
  return api;
};

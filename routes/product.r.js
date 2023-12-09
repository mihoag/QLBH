const express = require('express')
const productController = require('../controller/product.c')
const route = express.Router();



route.get('/', productController.showProducts);

module.exports = route;
const express = require('express')
const route = express.Router();
const logoutController = require('../controller/logout.c')

route.get('/', logoutController.logout);

module.exports = route;
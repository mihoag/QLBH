const express = require('express')
const route = express.Router();
const loginController = require('../controller/login.c')

route.get('/', loginController.showLogin);
route.post('/', loginController.processLogin);

module.exports = route;
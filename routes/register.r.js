const express = require('express')
const registerController = require('../controller/register.c')
const route = express.Router();
route.get('/', registerController.showRegister);
route.post('/', registerController.processSignUp);
module.exports = route;
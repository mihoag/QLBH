const express = require('express')
const homeController = require('../controller/home.c')
const route = express.Router();


route.post('/changeColor', homeController.changeDM)
route.post('/update', homeController.updateCate)
route.post('/delete', homeController.deleteCate)

route.get('/', homeController.showHome);
route.post('/', homeController.addCate)

module.exports = route;
const express = require('express')
const path = require('path')

//my own import 
const prodsController = require('../controllers/products')
//const routeDir = require('./utiils/path')

const router = express.Router()

router.get('/add-product', prodsController.getAddProduct)

router.post('/add-product', prodsController.postAddProduct)

module.exports = router;

const express = require('express')
const path = require('path')

//my own import 
const prodsController = require('../controllers/products')

const router = express.Router()

router.get('/', prodsController.getProducts)

module.exports = router
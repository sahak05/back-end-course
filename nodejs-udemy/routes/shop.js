const express = require('express')
const path = require('path')

//my own import 
const adminData = require('./admin')

const router = express.Router()

router.get('/', (req, res, next) => {
    const products = adminData.products
    //res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'))
    res.render('shop', {prods: products, pageTitle:"My Shop", hasproducts: products.length>0, activeShop: true, productCSS: true})
})

module.exports = router
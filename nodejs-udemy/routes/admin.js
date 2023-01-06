const express = require('express')
const path = require('path')

//my own import 
//const routeDir = require('./utiils/path')
const products = []
const router = express.Router()

router.get('/add-product', (req, res, next) => {
    //res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'))
    res.render('add-product', {pageTitle: 'Add a product', activeAddProduct: true, formsCSS: true, productCSS: true})
})

router.post('/add-product', (req, res, next) => {
    products.push( {title: req.body.title} )
    res.redirect('/')
})

exports.routes = router
exports.products = products

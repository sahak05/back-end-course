const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    //res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'))
    res.render('add-product', {pageTitle: 'Add a product', 
                                activeAddProduct: true, 
                                formsCSS: true, 
                                productCSS: true, 
                                path:'/admin/add-product'
                            })
}

exports.postAddProduct = (req, res, next) => {
    const product  = new Product(req.body.title)
    product.save()
    res.redirect('/')
}

exports.getProducts = (req, res, next) => {
    //res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'))
    Product.fetchAll(products => {
        res.render('shop', 
        {prods: products, 
        pageTitle:"My Shop", 
        path:'/', 
        hasproducts: products.length>0, 
        activeShop: true, 
        productCSS: true
        })
    })
    
}
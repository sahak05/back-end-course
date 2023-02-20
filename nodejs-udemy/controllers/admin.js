const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if(!editMode) {
    return res.redirect('/')
  }

  const prodId = req.params.productId
  req.user.getProducts({where:{id:prodId}}).then(
    products => {
      const product = products[0]
      if(product) {
        res.render('admin/edit-product', {
          pageTitle: 'Edit Product',
          path: '/admin/edit-product',
          editing: editMode,
          product: product
        });
      }
      else{
        return res.redirect('/')
      }
    }
  ).catch(err => console.log(err))
  
  
};

exports.postEditProduct = (req, res,next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const productId = req.body.productId
  Product.findByPk(productId).then(
    product => {
      product.title = title;
      product.price = price;
      product.description = description;
      product.imageUrl = imageUrl
      return product.save()
    }
  )
  .then(result => {
    console.log('Updated product')
    res.redirect('/admin/products');
  })
  .catch(err => console.log(err))
}

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  
  req.user.createProduct({
    description: description,
    title: title,
    price: price,
    imageUrl: imageUrl,
  }).then(
    result => {
      res.redirect('/admin/products')
    }
  ).catch(err => console.log(err))
};

exports.getProducts = (req, res, next) => {
  req.user.getProducts()
  .then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err => console.log(err))
};

exports.deleteProduct = (req, res, next) => {
  const productId = req.body.productId
  Product.findByPk(productId).then( product => {
    return product.destroy()
    
  })
  .then( res => {
    console.log('Product destroyed')
    res.redirect('/admin/products')
  })
  .catch(err => console.log(err))
  
}

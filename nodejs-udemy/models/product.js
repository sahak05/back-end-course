const fs = require('fs')
const path = require('path')

const Cart = require('./cart')
const p = path.join(path.dirname(require.main.filename), 'data', 'products.json')

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(fileContent));
      }
    });
  };
  
  module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
      this.id = id
      this.title = title;
      this.imageUrl = imageUrl;
      this.description = description;
      this.price = +price;
    }
  
    save() {
      getProductsFromFile(products => {
        if(this.id) {
          const existingProductIndex = products.findIndex(p => p.id === this.id)
          const updatedProduct = [... products]
          updatedProduct[existingProductIndex] = this
          fs.writeFile(p, JSON.stringify(updatedProduct), err => {
            console.log(err);
          });
          return
        }
        this.id = Math.random().toString()
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), err => {
          console.log(err);
        });
      });
    }

    static deleteProduct(id) {
      getProductsFromFile(products => {
        const product = products.find(p => p.id === id)
        const existingProductIndex = products.findIndex(p => p.id === id)
        const updatedProduct = [... products]
        updatedProduct.splice(existingProductIndex, 1)
        fs.writeFile(p, JSON.stringify(updatedProduct), err => {
          if(!err) {
            Cart.deleteProduct(id, product.price);
          }
        });
      })
      
    }
  
    static fetchAll(cb) {
      getProductsFromFile(cb);
    }

    static findById(id, cb) {
        getProductsFromFile( products => {
            const product = products.find( prod => prod.id === id)
            cb(product)
        })
    } 
  };
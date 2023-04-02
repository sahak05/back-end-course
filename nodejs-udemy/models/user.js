
const mongodb = require('mongodb')

const {getDb} = require('../util/database')
class User {

  constructor(username, email, cart, _id) {
    this.username = username
    this.email = email
    this.cart = cart // {items: []}
    this._id = _id
  }

  save() {
    const db = getDb()
    return db.collection('users').insertOne(this)
    .then(result => console.log(result))
    .catch(err => console.log(err))
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex(cp => cp.productId.toString() === product._id.toString())
    let newQuantity = 1 
    const updatedCartItems = [...this.cart.items]
    if(cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1
      updatedCartItems[cartProductIndex].quantity = newQuantity
    }
    else{
      updatedCartItems.push(
        {
          productId: new mongodb.ObjectId(product._id),
          quantity: newQuantity
        }
      )
    }
    const updatedCart = {items:updatedCartItems}
    const db = getDb()
    return db.collection('users').updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: {cart:updatedCart}})

  }

  getCart() {
    const db = getDb()
    const productsId = this.cart.items.map(p => p.productId)
    db.collection('products').find({_id: {$in: productsId}}).toArray().then(products => {
      return products.map(p => {
        return  {...p, quantity:this.cart.items.find(i => i.productId.toString() === p._id.toString()).quantity}
      })
    })
    return this.cart
  }

  static findById(userId) {
    const db =getDb()
    return db.collection('users').find({_id: new mongodb.ObjectId(userId)}).next()
    .then(user => user)
    .catch(er => console.Consolelog(err))
  }
}

module.exports = User;

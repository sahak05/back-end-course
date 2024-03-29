const mongodb = require('mongodb')

const {getDb} = require('../util/database')
class Product {
  constructor(title, price, description ,imageUrl, id, userId) {
    this.title= title
    this.price = price
    this.description = description
    this.imageUrl = imageUrl
    this._id = id
    this.userId = userId
  }

  save() {
    const db = getDb()
    let dbOp;
    if(this._id){
      //update the product
      dbOp = db.collection('products').updateOne({_id:new mongodb.ObjectId(this._id)}, {$set: this})
    }
    else{
      dbOp = db.collection('products').insertOne(this)

    }
    
    return dbOp.then(
      result => console.log(result)
    ).catch(err => {throw err})
  }

  static fetchAll () {
    const db = getDb()
    return db.collection('products').find().toArray()
    .then( products => {
      return products
    })
    .catch( err => {throw err})
  }

  static findById(prodId) {
    const db = getDb()
    return db.collection('products').find({_id: new mongodb.ObjectId(prodId)})
    .next()
    .then(product => {return product})
    .catch(err => console.log(err))
  }

  static deleteByID(prodId) {
    const db = getDb()
    return db.collection('products').deleteOne({_id:new mongodb.ObjectId(prodId)})
    .then(result => console.log('DELETED!'))
    .catch(err => console.log(err))
  }
}


module.exports = Product;

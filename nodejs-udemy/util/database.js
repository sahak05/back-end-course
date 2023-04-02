const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient
let  _db
const mongoConnect = (callback) => {
  MongoClient.connect('mongodb+srv://sadikouhak:sadikouhak@cluster0.isiyu9f.mongodb.net/shop?retryWrites=true&w=majority')
  .then(client => {
    _db = client.db()
    callback()
  })
  .catch(err => {
    throw err
  })
}


const getDb = () => {
  if(_db) {
    return _db
  }
  throw 'No database found'
}
module.exports = {mongoConnect, getDb}



const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient

let _db;

const mongoConnect = (callback) => {
   MongoClient.connect('mongodb+srv://praveens321123:iQrL11ZxjjkSJmwP@cluster0.jbmmbh0.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0')
   .then((client)=> {
   _db = client.db()
   callback()
   }).catch((err)=> {
     console.log(err);
     throw err
   })
}

const getDb = () => {
    if(_db){
        return _db
    }
    throw "No Database Found"
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb
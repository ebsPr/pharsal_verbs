/**
 * Created by saida on 08/04/2015.
 */

var MongoClient = require('mongodb').MongoClient;

var mongoUrl = "mongodb://"+process.env.database_user+":"+process.env.database_password+"@ds035643.mongolab.com:35643/pharsalverbs";
var mongoNameCollection = "verbs";
var mongoCollection = null;
var mongoDB = null;

exports.connectDB = function(){
    MongoClient.connect(mongoUrl, function (err, db) {
        if (err) {
            console.error(err);
        } else {
            mongoDB = db;
            mongoCollection = mongoDB.collection(mongoNameCollection);
            console.log("bbdd conected");
        }
    });
}

exports.getCollection = function(){
    return mongoCollection;
}
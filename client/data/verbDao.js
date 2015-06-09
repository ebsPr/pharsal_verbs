/**
 * Created by saida on 07/04/2015.
 */
var verbDao = (function(){

    var random = require("random-js")();
    var Q = require('q');
    var databaseConfig = require("./databaseConfig.js");
    databaseConfig.connectDB();


    return {
        selectRandom: function (respuesta) {
            var deferred = Q.defer();
            var index = random.integer(0,147)
            console.log(index);
            databaseConfig.getCollection().find().skip(index).limit(1).toArray(

                function(err, result) {
                console.log(result);
                if (!err) {
                    deferred.resolve(result[0]);
                } else {
                    rejectOnError(deferred, err);
                }
            });

            return deferred.promise;
        },
        selectAll: function (respuesta) {
            var deferred = Q.defer();
            databaseConfig.getCollection().find().toArray(function (err, result) {
                if (!err) {
                    deferred.resolve(result);
                } else {
                    rejectOnError(deferred, err);
                }
            });
            return deferred.promise;
        }
    }
})();

module.exports = verbDao;
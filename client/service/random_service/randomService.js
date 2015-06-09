/**
 * Created by saida on 07/04/2015.
 */



var verbDao = require('../../data/VerbDao.js');

exports.randomService = function(router){

    var rutaVerb = router.route('/random/verb');

   rutaVerb.get(function(req,res){
       console.log('peticion random/verb');

       verbDao.selectRandom().then(function(data){
           console.log(data);
           res.json(data);
       })
    });

}
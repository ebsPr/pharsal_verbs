var verbDao = require('../../data/VerbDao.js');

exports.listService = function(router){

    var rutaVerb = router.route('/list/verb');

    rutaVerb.get(function(req,res){
        console.log('peticion list/verb');

        verbDao.selectAll().then(function(data){
            console.log(data);
            res.json(data);
        })
    });

}
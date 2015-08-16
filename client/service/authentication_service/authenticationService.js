/**
 * Created by SAIDA on 15/08/2015.
 */

exports.authenticationService= function(router){

    var ruta = router.route('/login');

    ruta.post(function(req,res){
        console.log('login');
        res.json({token:'123'});
    });

}
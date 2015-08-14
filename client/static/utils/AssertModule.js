

angular.module('pharsalVerbs').factory("Assert", function($filter) {
    return {
        assert : function (valorOk, valorInput,validacion) {
            console.log("params modulo assert: "+ validacion);

            var _valorInput = $filter('uppercase')(valorInput).trim();

            var resultado = false;

            // hay verbos que tienen una array de las opciones válidas
            // en este caso solamente hay que recorrer la array comprobando que se haya introducido una de las opciones
            if(validacion){
                var _valOk = null;
                validacion.forEach(function (e){
                    _valOk = $filter('uppercase')(e);
                    if(_valOk == _valorInput){
                        resultado = true;
                    }
                });
            }else{
                // pasar todos los valores a upper
                var _valorOk = $filter('uppercase')(valorOk);

                //  comprobamos si tienen espacios
                var ok_split = _valorOk.split(" ");
                var input_split = _valorInput.split(" ");

                console.log(ok_split.length  +"/"+input_split.length);
                // si la solución contiene espacios y lo introducido contiene espacios --> ya veremos
                if (ok_split.length > 1 && input_split.length > 1){
                    console.log('opcion1');
                    ok_split.forEach(function(item){
                        input_split.forEach(function(item2){
                            console.log(item + ' - ' + item2);
                            if (item == item2 && item.length > 2 && !resultado){
                                console.log('opcion1-OK');
                                resultado = true;
                            }else if (item.indexOf(item2) != -1 &&  (item.length*80/100) <= item2.length){
                                resultado = true;
                            }else if(item2.indexOf(item) != -1 && (item.length*80/100) <= item2.length){
                                resultado = true;
                            }
                        });
                    });
                }else if (ok_split.length > 1 && input_split.length == 1 && !resultado){
                    console.log('opcion2');
                    // si la solución contiene espacios y la introducido no
                    ok_split.forEach(function(item,i){
                        console.log(i+" - " + item);
                        if (item == _valorInput){
                            resultado = true;
                        }else if (item.indexOf(_valorInput) != -1 &&  (item.length*80/100) <= _valorInput.length){
                            resultado = true;
                        }else if (_valorInput.indexOf(item) != -1 && (item.length*80/100) <= _valorInput.length){
                            resultado = true;
                        }
                    });
                }else if(ok_split.length == 1 && input_split.length == 1 && !resultado){
                    console.log('opcion3: '+ _valorOk + "/"+_valorInput);
                    // nada tiene espacios
                    if (_valorOk ===  _valorInput ){
                        resultado = true;
                    }else if(_valorOk.indexOf(_valorInput) != -1 && (_valorOk.length*80/100) <= _valorInput.length){
                        resultado = true;
                    }
                }
                console.log('delución: ' + resultado)

            }

            return resultado;
            //console.log(input_split.length);
        }
    };
});
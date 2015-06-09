/**
 * Created by saida on 23/03/2015.
 */


angular.module('randomModule', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/random.view', {
            templateUrl: 'random/random.html',
            controller: 'RandomController'
        });
    }]).controller('RandomController', ['$scope','$filter','$timeout','Random',function($scope,$filter,$timeout,Random) {

        // declaracion atributos
        $scope.pharsalVerb = null;
        $scope.inputVerb = null;

        $scope.solucionAMostrar1 = null;
        $scope.solucionAMostrar2 = null;
        $scope.solucionAMostrar3 = null;


        $scope.solucionValida = 0;

        $scope.aciertos = 0;
        $scope.fallos = 0;

        // inicialización atributos
        Random.random(function (data) {
            $scope.pharsalVerb = data;
        });


        // método que se ejecuta cuando se pulsa siguiente
        $scope.nextVerb = function () {
            $scope.reset()
            Random.random(function (data) {
                $scope.pharsalVerb = data;
            });
        }

        // función que sirve para resetear el div de solución
        $scope.reset = function () {
            $scope.solucionAMostrar1 = null;
            $scope.solucionAMostrar2 = null;
            $scope.solucionAMostrar3 = null;
            $scope.inputVerb = null;
            $scope.solucionValida = 0;
        }

        // función que asigna las soluciones
        $scope.showAnswer = function () {
            console.log('showAnwser: '+$scope.solucionValida);
            if ($scope.solucionValida != 1) {
                $scope.fallos++;
            }
            $scope.solucionAMostrar1 = $scope.pharsalVerb.traduccion;
            $scope.solucionAMostrar2 = $scope.pharsalVerb.ejemplo;
            $scope.solucionAMostrar3 = $scope.pharsalVerb.ejemploTraducido;
        }

        // método que valida si lo introducido es correcto
        $scope.comprobarSolucion = function () {
            var correcto = $scope.compararValores($scope.pharsalVerb.traduccion, $scope.inputVerb);
            console.log('IF: ' + correcto + "/"+$scope.solucionValida);
            if ( correcto && $scope.solucionValida != 1 ) {
                console.log('VALIDO');
                $scope.aciertos++;
                $scope.solucionValida=1;
                $scope.showAnswer();

            } else if(!correcto && $scope.solucionValida != 1){
                console.log('INCORRECTO');
                $scope.solucionValida = 2;

            }
        }

        $scope.compararValores = function (valorOk, valorInput) {

            var resultado = false;

            // pasar todos los valores a upper
            var _valorOk = $filter('uppercase')(valorOk);
            var _valorInput = $filter('uppercase')(valorInput)

            // para comprobamos si tienen espacios
            var ok_split = _valorOk.split(" ");
            var input_split = _valorInput.split(" ");

            console.log(ok_split.length  +"/"+input_split.length);
            // si la solución contiene espacios y lo introducido contiene espacios --> ya veremos
            if (ok_split.length > 1 && input_split.length == 1){
                console.log('opcion1');
                ok_split.forEach(function(item){
                    input_split.forEach(function(item2){
                        console.log(item + ' - ' + item2);
                        if (item == item2 && item.length > 2 && !resultado){
                            console.log('opcion1-OK');
                            resultado = true;
                        }
                    });
                });
            }else if (ok_split.length > 1 && input_split.length == 1 && !resultado){
                console.log('opcion2');
                // si la solución contiene espacios y la introducido no
                ok_split.forEach(function(item,i){
                    console.log(i+" - " + item);
                    if (item.indexOf(_valorInput) != -1 ){
                        resultado = true;
                    }
                });
            }else if(ok_split.length == 1 && input_split.length == 1 && !resultado){
                console.log('opcion3: '+ _valorOk + "/"+_valorInput);
                // nada tiene espacios
                if (_valorOk ===  _valorInput ){
                    resultado = true;
                }
            }
            console.log('delución: ' + resultado)
            return resultado;
            //console.log(input_split.length);
        }
    }
]);




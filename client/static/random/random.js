/**
 * Created by saida on 23/03/2015.
 */


angular.module('randomModule', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/random.view', {
            templateUrl: 'random/random.html',
            controller: 'RandomController'
        });
    }]).controller('RandomController', ['$filter','$timeout','Random','Assert',function($filter,$timeout,Random,Assert) {

        var vm = this;
        // declaracion atributos
       vm.pharsalVerb = null;
       vm.inputVerb = null;

       vm.solucionAMostrar1 = null;
       vm.solucionAMostrar2 = null;
       vm.solucionAMostrar3 = null;


       vm.solucionValida = 0;

       vm.aciertos = 0;
       vm.fallos = 0;

        // inicialización atributos
        Random.random(function (data) {
           vm.pharsalVerb = data;
        });


        // método que se ejecuta cuando se pulsa siguiente
       vm.nextVerb = function () {
           vm.reset()
            Random.random(function (data) {
               vm.pharsalVerb = data;
            });
        }

        // función que sirve para resetear el div de solución
       vm.reset = function () {
           vm.solucionAMostrar1 = null;
           vm.solucionAMostrar2 = null;
           vm.solucionAMostrar3 = null;
           vm.inputVerb = null;
           vm.solucionValida = 0;
        }

        // función que asigna las soluciones
       vm.showAnswer = function (valor) {
            console.log('showAnwser: '+this.solucionValida);
            if (this.solucionValida != 1) {
               vm.fallos++;
            }
           vm.solucionAMostrar1 =vm.pharsalVerb.traduccion;
           vm.solucionAMostrar2 =vm.pharsalVerb.ejemplo;
           vm.solucionAMostrar3 =vm.pharsalVerb.ejemploTraducido;

           this.solucionValida = valor;
        }

        // método que valida si lo introducido es correcto
       vm.comprobarSolucion = function ($event) {
            if($event.keyCode == 13){
                var correcto =Assert.assert(this.pharsalVerb.traduccion,vm.inputVerb,this.pharsalVerb.validacion);
                console.log('IF: ' + correcto + "/"+this.solucionValida);
                if ( correcto &&vm.solucionValida != 1 ) {
                    console.log('VALIDO');
                   vm.aciertos++;
                   vm.solucionValida=1;
                   vm.showAnswer(1);

                } else if(!correcto &&vm.solucionValida != 1){
                    console.log('INCORRECTO');
                   vm.solucionValida = 2;
                }
            }
        }

    }
]);




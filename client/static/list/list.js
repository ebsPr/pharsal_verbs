/**
 * Created by saida on 07/04/2015.
 */
angular.module('listModule', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/list.view', {
            templateUrl: 'list/list.html',
            controller: 'ListController'
        });
    }]).controller('ListController', ['$filter','$timeout','List',function($filter,$timeout,List) {

        var vm = this;
        
        vm.pharsalVerb = null;

        List.selectAll(function(data){
            vm.pharsalVerb = data;
        })

        vm.mostrarTraduccion = function(v){
            v.mostrarTraduccion = 1;
        };
        vm.mostrarEjemplo = function(v){
            v.mostrarEjemplo = 1;
        };
        vm.mostrarEjemploTraducido = function(v){
            v.mostrarEjemploTraducido = 1;
        };
    }]);
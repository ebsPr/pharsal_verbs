/**
 * Created by saida on 07/04/2015.
 */
angular.module('listModule', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/list.view', {
            templateUrl: 'list/list.html',
            controller: 'ListController'
        });
    }]).controller('ListController', ['$scope','$filter','$timeout','List',function($scope,$filter,$timeout,List) {

        $scope.pharsalVerb = null;

        List.selectAll(function(data){
            $scope.pharsalVerb = data;
        })

        $scope.mostrarTraduccion = function(v){
            v.mostrarTraduccion = 1;
        };
        $scope.mostrarEjemplo = function(v){
            v.mostrarEjemplo = 1;
        };
        $scope.mostrarEjemploTraducido = function(v){
            v.mostrarEjemploTraducido = 1;
        };
    }]);
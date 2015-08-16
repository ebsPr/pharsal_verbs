(function () {
	"use strict";

    // declaración módulo principal
	var app = angular.module('pharsalVerbs',['ngRoute','ngResource','randomModule','listModule','Authentication']);

    // configuracion ruta principal
    angular.module('pharsalVerbs').config(['$routeProvider','$httpProvider', function($routeProvider,$httpProvider) {
        $routeProvider.when('/', {
            templateUrl: 'login.html',
            controller: 'LoginController',
            access: { requiredLogin: true }
        }).otherwise({
            redirectTo: '/'
        });
        $httpProvider.interceptors.push('TokenInterceptor');
    }]);

    // configuración controlador pantalla login
    angular.module('pharsalVerbs').controller('LoginController',['$window','$location','UserService','AuthenticationService',function($window,$location,UserService,AuthenticationService){
        var vm = this;
        vm.logIn = function(){
            console.log('login!');
            UserService.logIn(vm.user.email,vm.user.pass).save(function(data){
                console.log('returned from login');
                AuthenticationService.isLogged = true;
                $window.sessionStorage.token = data.token;
                $location.path("random.view");
            });
        }
    }]);

    // controlador para el menu: hace que aparezca o no en función de si hay usuario logueado
    angular.module('pharsalVerbs').controller('MenuController',['AuthenticationService',function(AuthenticationService){
        var vm = this;
        vm.isLoggued = function(){
            return AuthenticationService.isLogged;
        }
    }]);

    // interceptor que cuando cambia la ruta comprueba si la ruta a la que se quiere acceder requiere autenticación
    app.run(function($rootScope, $location, AuthenticationService) {
        $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
            if(currentRoute === undefined){
                $location.path("/");
            }else if(!nextRoute.access.requiredLogin && AuthenticationService.isLogged){
                $location.path("/random.view");
            }
        });
    });

}());

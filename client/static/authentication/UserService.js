/**
 * Created by SAIDA on 15/08/2015.
 */

angular.module('Authentication',[]);
angular.module('Authentication').factory('UserService',function($resource){
    return {
        logIn: function(email,pass){
            console.log('login post : ' + email + ' - ' + pass);
            return $resource('/login',{email:email,pass:pass},{save:{method:'POST'}});
        },
        logOut: function(){
            return $resource('/logout',{email:email},{method:'POST'});
        }
    };
});

angular.module('Authentication').factory('AuthenticationService',function(){
    return { isLogged : false};
});

angular.module('Authentication').factory('TokenInterceptor', function ($q, $window, $location, AuthenticationService) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },

        requestError: function(rejection) {
            return $q.reject(rejection);
        },

        /* Set Authentication.isAuthenticated to true if 200 received */
        response: function (response) {
            if (response != null && response.status == 200 && $window.sessionStorage.token && !AuthenticationService.isAuthenticated) {
                AuthenticationService.isAuthenticated = true;
            }
            return response || $q.when(response);
        },

        /* Revoke client authentication if 401 is received */
        responseError: function(rejection) {
            if (rejection != null && rejection.status === 401 && ($window.sessionStorage.token || AuthenticationService.isAuthenticated)) {
                delete $window.sessionStorage.token;
                AuthenticationService.isAuthenticated = false;
                $location.path("/");
            }

            return $q.reject(rejection);
        }
    };
});

 (function () {
    "use strict";

     var config = require('./config.js');
     var randomService = require('./service/random_service/randomService.js');
     var listService = require('./service/list_service/listService.js');
     var authenticationService = require('./service/authentication_service/authenticationService.js');

     var app = config.initApp();

     var router = config.initRouter(app);

     randomService.randomService(router);
     listService.listService(router);
     authenticationService.authenticationService(router);

     app.listen(3000);

  }());


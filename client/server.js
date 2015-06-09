
 (function () {
    "use strict";

     var config = require('./config.js');
     var randomService = require('./service/random_service/randomService.js');
     var listService = require('./service/list_service/listService.js');

     var app = config.initApp();

     var router = config.initRouter(app);

     randomService.randomService(router);
     listService.listService(router);

     app.listen(3000);

  }());


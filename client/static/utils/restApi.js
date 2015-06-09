/**
 * Created by saida on 09/04/2015.
 */

(function () {

angular.module('pharsalVerbs').factory("Random", function($resource) {
    return $resource("/random/verb",{},{
        random:{method:'GET'}
    });
});

angular.module('pharsalVerbs').factory("List", function($resource) {
    return $resource("/list/verb",{},{
        selectAll:{method:'GET',isArray: true}
    });
});

}());

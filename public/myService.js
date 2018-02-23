(function() {
    "use strict";
   angular.module('myApp')
   .factory('myService', function ($http,basePath,$q) {
    return {
    getData: function() {
        var deferred = $q.defer();
        $http.get(basePath)
        .then(function(response){
           console.log(response)
           deferred.resolve(response.data);

        })
        .catch(function(response){
          deferred.reject(response);
        });
       
        return deferred.promise;
    }
  }

/*console.log(basePath);
    service.getData = function() {
  
            return $http.get(basePath).then(function(response) {
              console.log(response);
                return response.data;
    });}*/
/*    service.getData=function () {       
        return service.data;
    };*/
    
});

})();
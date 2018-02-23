(function() {
    "use strict";
   angular.module('myApp')
   .factory('myService', function ($http,basePath,$q,$window, $rootScope) {
    return {
    getData: function() {
       
        var deferred = $q.defer();
        $http.get(basePath)
        .then(function(response){
           console.log(response)
           $window.localStorage.setItem('dashboard', JSON.stringify(response.data));
           deferred.resolve(response.data);

        })
        .catch(function(response){
          deferred.reject(response);
        });
       
        return deferred.promise;
    },
    setData: function(data) {
        $window.localStorage.setItem('dashboard', JSON.stringify(data));
    }
  }


    
});

})();

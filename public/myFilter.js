(function() {
    "use strict";
   angular.module('myApp').filter('start', function () {
                return function (input, start) {
                    if (!input || !input.length) { return; }
                    start = +start;
                    return input.slice(start);
                };
            });

})();
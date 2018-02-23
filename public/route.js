(function() {
    "use strict";

    angular.module('myApp')
    .config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl : 'pages/home.html',
        controller:'myCtrl'

    })
    .when('/edit', {
        templateUrl : 'pages/contact.html',
        controller:'myEditCtrl'
    })
   
    });
    
    
    
    
    
    
    
/*    
    .config(routeConfig);

    routeConfig.$inject = ['$urlRouterProvider', '$stateProvider', '$httpProvider'];

    function routeConfig($urlRouterProvider, $stateProvider, $httpProvider) {
        // If user goes to a path that doesn't exist, redirect to home page
        $urlRouterProvider.otherwise('/');
        // Configures the routes and views
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/index.html'
            })
             .state('contact', {
                url: '/',
                templateUrl: '/contact.html'
            })

  }*/
})();

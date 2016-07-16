'use strict';

// Declare app level module which depends on views, and components
var MyApp = angular.module('myApp', [
  'ui.router',
  'pascalprecht.translate',
  'myApp.version',
  'ui.bootstrap',
  'ngAnimate',
  'ngAria',
  'ngMaterial',
  'myApp.view1',
  'myApp.view2',
  'planningo.authentication'
])

.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'partials/home.tpl.html'
      })
      .state('secret', {
        url: '/secret',
        templateUrl: 'Views/Login/secret.tpl.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'components/Authentication/views/login.html',
        controller: 'LoginCtrl'
      });
  $urlRouterProvider.otherwise('login');

});

/*config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/login'});
}]);*/

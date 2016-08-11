'use strict';

/**
 * @ngdoc overview
 * @name brainBusterApp
 * @description
 * # brainBusterApp
 *
 * Main module of the application.
 */

var underscore = angular.module('underscore', []);
underscore.factory('_', ['$window', function ($window) {
  return $window._; // assumes underscore has already been loaded on the page
}]);

angular
  .module('brainBusterApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'underscore',
    'monospaced.qrcode'
  ])
  .config(function () {
    var config = {
      apiKey: "AIzaSyAy7gy_NH6JNNtuiCGWEuCP_B31KnaBcbU",    // Firebase API key
      authDomain: "brain-buster.firebaseapp.com",           // Firebase Auth domain ("*.firebaseapp.com")
      databaseURL: "https://brain-buster.firebaseio.com",   // Firebase Database URL ("https://*.firebaseio.com")
      storageBucket: "brain-buster.appspot.com"             // Firebase Storage bucket ("*.appspot.com")
    };
    firebase.initializeApp(config);
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/host/:PIN', {
        templateUrl: 'views/host.html',
        controller: 'HostCtrl'
      })
      .when('/player/:PIN?', {
        templateUrl: 'views/player.html',
        controller: 'PlayerCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

'use strict';

/**
 * @ngdoc function
 * @name brainBusterApp.controller:PlayerCtrl
 * @description
 * # PlayerCtrl
 * Controller of the brainBusterApp
 */
angular.module('brainBusterApp')
  .controller('PlayerCtrl', function ($scope, Player, Quiz, $location, $routeParams, $firebaseAuth) {
    $scope.authObj = $firebaseAuth();

    $scope.authObj.$signInAnonymously().then(function(firebaseUser) {
      console.log("Signed in as:", firebaseUser.uid);
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
    
    if (!$routeParams.hasOwnProperty('PIN')) {
      $scope.quiz = {
        data: {
          state: 'joinQuiz'
        }
      };
    } else {
      Player.init($routeParams.PIN)
      .then(function () {
        Player.obj.$bindTo($scope, 'quiz')
        .then(function () {
          $scope.currentQuestion = $scope.quiz.data.questions[$scope.quiz.data.currentQuestion];
          $scope.$watch('quiz.data.currentQuestion', function (newValue, oldValue) {
            $scope.currentQuestion = $scope.quiz.data.questions[$scope.quiz.data.currentQuestion];
          });
        });
        
        $scope.playerId = Player.getUniqueId();
      });
    }
    
    $scope.join = function () {
      $scope.joining = true;
      Player.join($scope.PIN, $scope.screenName)
      .then(function () {
        $location.path('/player/' + $scope.PIN);
      });
    };
    
    $scope.saveAnswer = function (answer) {
      Player.selfSave('answer', answer);
    };
  });

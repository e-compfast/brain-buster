'use strict';

/**
 * @ngdoc function
 * @name brainBusterApp.controller:HostCtrl
 * @description
 * # HostCtrl
 * Controller of the brainBusterApp
 */
angular.module('brainBusterApp')
  .controller('HostCtrl', function ($scope, Host, Quiz, $routeParams, $interval, $location, $firebaseObject) {
    $scope.website = 'https://brain-buster.firebaseapp.com/#/player';
    
    Host.init($routeParams.PIN)
    .then(function () {
      return Host.setupQuiz();
    })
    .then(function () {
      Host.obj.$bindTo($scope, 'quiz');
      $scope.$watch('quiz.data.state', function (newValue, oldValue) {
        switch (newValue) {
          case 'preQuestion':
            $scope.startCountDown(5, 'question');
            break;
          
          case 'question':
            $scope.currentQuestion = Host.getCurrentQuestion();
            $scope.answers = Quiz.getPossibleAnswers($scope.currentQuestion);
            $scope.quiz.data.possibleAnswers = $scope.answers;
            $scope.startCountDown(10, 'postQuestion');
            break;
          
          case 'postQuestion':
            $scope.correct = [];
            $scope.currentQuestion = Host.getCurrentQuestion();
            angular.forEach($scope.quiz.data.users, function (v, k) {
              if (Quiz.checkAnswer(Host.getCurrentQuestion().question, v.answer)) {
                v.currentPoints = (v.currentPoints || 0 ) + 100;
                $scope.correct.push(v.screenName)
              }
            });
            Host.obj.$save();
            break;
          
          case 'leaderboard':
            $scope.leaderboard = _.map($scope.quiz.data.users, function (user) {
              return {
                'screenName': user.screenName,
                'currentPoints': (user.currentPoints || 0 )
              };
            });
            break;
        };
      });
    });
    
    $scope.startCountDown = function (counter, state) {
      $scope.countdown = counter;
      $interval(function () {
        $scope.countdown--;
      }, 1000, $scope.countdown)
      .then(function () {
        Host.setQuizState(state);
      });
    };
    
    $scope.startQuiz = function () {
      $scope.quiz.data.state = 'preQuestion';
    };
    
    $scope.nextQuestion = function () {
      Host.nextQuestion();
    };
    
    $scope.endQuiz = function () {
      Host.setQuizState('leaderboard');
    };
    
    $scope.startOver = function () {
      $location.path('/');
    };
  });

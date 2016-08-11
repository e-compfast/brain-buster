'use strict';

/**
 * @ngdoc function
 * @name brainBusterApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the brainBusterApp
 */
angular.module('brainBusterApp')
  .controller('MainCtrl', function ($scope, $location, _, $firebaseAuth, $firebaseObject) {
    var ref = firebase.database().ref(),
        obj;
    $scope.creatingQuiz = false;
  
    $scope.newQuiz = function () {
      $scope.creatingQuiz = true;
      $scope.authObj = $firebaseAuth();

      $scope.authObj.$signInAnonymously().then(function(firebaseUser) {
        console.log("Signed in as:", firebaseUser.uid);
        
        // Generate random 6 digit pincode for the quiz
        var PIN = _.random(100000,999999),

        // Connect to Firebase
        obj = $firebaseObject(ref.child('quiz').child(PIN));

        // Upon connection, build quiz object
        obj.$loaded().then(function () {
          obj.data = {
            'state': 'waiting'
          };
          return obj.$save();
        })
        .then(function () {
          // after save completes, navigate to host view
          $location.path('/host/' + PIN);
        });
      }).catch(function(error) {
        console.error("Authentication failed:", error);
      });
    };
  });

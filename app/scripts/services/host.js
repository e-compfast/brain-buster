'use strict';

/**
 * @ngdoc service
 * @name brainBusterApp.host
 * @description
 * # host
 * Service in the brainBusterApp.
 */
angular.module('brainBusterApp')
  .service('Host', function ($firebaseObject, Quiz) {
    var self = this,
        ref = firebase.database().ref(),
        _obj;
    
    self.init = function (PIN) {
      self.obj = $firebaseObject(ref.child('quiz').child(PIN));
      _obj = self.obj;
      return self.obj.$loaded();
    };
    
    self.setupQuiz = function () {
      if (!_obj.data.hasOwnProperty('questions')) {
        _obj.data.questions = Quiz.getQuestions();
        _obj.data.currentQuestion = 0;
      }
      return _obj.$save();
    };
    
    self.getCurrentQuestion = function () {
      return _obj.data.questions[_obj.data.currentQuestion];
    };
    
    self.setQuizState = function (state) {
      _obj.data.state = state;
      return _obj.$save();
    };
    
    self.nextQuestion = function () {
      _obj.data.state = 'preQuestion';
      _obj.data.currentQuestion++;
      return _obj.$save();
    };
  });

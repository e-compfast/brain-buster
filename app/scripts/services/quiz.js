'use strict';

/**
 * @ngdoc service
 * @name brainBusterApp.quiz
 * @description
 * # quiz
 * Service in the brainBusterApp.
 */
angular.module('brainBusterApp')
  .service('Quiz', function (_) {
    var self = this;
    
    self.questions = [
      {
        'question': 'What is a service that Firebase does NOT offer?',
        'wrong': ['Database','Firebase Auth','Hosting'],
        'answer': 'Firebase Email'
      },
      {
        'question': 'Firebase uses the ______ Model.',
        'wrong': ['Request-Reply','Pub–Sub','Triggered'],
        'answer': 'Event-Driven'
      },
      {
        'question': 'Firebase allows developers to store and sync data across:',
        'wrong': ['Web Only','Android Only','iOS Only'],
        'answer': 'Multiple Clients'
      },
      {
        'question': 'Firebase stores data formatted in ______',
        'wrong': ['XML','Plain Text','Binary'],
        'answer': 'JSON'
      }
    ];
    
    self.getQuestions = function () {
      return _.shuffle(self.questions);
    };
    
    self.getPossibleAnswers = function (question) {
      return _.shuffle([question.answer].concat(question.wrong));
    };
    
    self.checkAnswer = function (questionText, answer) {
      var question = _.find(self.questions, function (q) {
        return q.question === questionText;
      });
      return question.answer === answer;
    };
  });

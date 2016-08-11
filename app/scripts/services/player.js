'use strict';

/**
 * @ngdoc service
 * @name brainBusterApp.player
 * @description
 * # player
 * Service in the brainBusterApp.
 */
angular.module('brainBusterApp')
  .service('Player', function ($firebaseObject, _, $cookieStore) {
    var self = this,
        ref = firebase.database().ref(),
        _obj;
    
    self.getUniqueId = function () {
      // generate a unique idenftifier for the player and save it in a cookie to allow refreshes
      if ($cookieStore.get('playerId')) {
        return self._id = $cookieStore.get('playerId');
      } else {
        $cookieStore.put('playerId', _.random(0, 999999999));
        return self._id = $cookieStore.get('playerId');
      }
    };
    
    self._connect = function () {
      self.obj = $firebaseObject(ref.child('quiz').child(self.PIN));
      _obj = self.obj;
      return self.obj.$loaded();
    };
    
    self.join = function (PIN, screenName) {
      self.PIN = PIN;
      self.screenName = screenName;
      return self._connect()
      .then(function () {
        // create 'users' node if it doesn't exist
        if (!_obj.data.hasOwnProperty('users')) {
          _obj.data.users = {};
        }

        // register player
        _obj.data.users[self.getUniqueId()] = {
          'screenName': screenName
        };

        return _obj.$save();
      });
    };
    
    self.init = function (PIN) {
      // get unique id from cookie store & connect
      self.getUniqueId();
      self.PIN = PIN;
      return self._connect();
    };
    
    self.selfSave = function (attr, val) {
      _obj.data.users[self._id][attr] = val;
      return _obj.$save();
    };
  });

'use strict';

/* Services */
var appServices = angular.module('myApp.services', []);

appServices.factory('_', function() {
  return window._;
});

appServices.service('BrowserService', ['$window', function($window) {

  return function() {

    var userAgent = $window.navigator.userAgent;

    var result = undefined;
    if (userAgent.indexOf('Chrome') !== -1) {
      result = "Chrome";
    }

    return result;
  }

}]);
'use strict'

angular.module('snipManager', ['ui.router', 'LocalStorageModule', 'snipControllers', 'snipServices'])
.config(['$stateProvider', '$urlRouterProvider', 'localStorageServiceProvider', function($stateProvider, $urlRouterProvider, localStorageServiceProvider) {

  // setting a prefix to avoid overwriting local storage variable
  localStorageServiceProvider
  .setPrefix('snipManager')
  
  // default values... may want to change them later
  .setStorageType('localStorage')
  .setStorageCookie(30, '/')
  .setStorageCookieDomain('')
  .setNotify(true, false) // (setItem, removeItem)

  // for unmatched url's redirect to root
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('landing', {
    url: '/',
    views: {
      '': {
        templateUrl: 'partials/landing.html',
        controller: 'LandingCtrl'
      },
      'nav@landing': {
        templateUrl: 'partials/nav.html'
      }
    }
  })
}])
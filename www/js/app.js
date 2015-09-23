// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.paper', {
      url: '/paper',
      views: {
        'tab-paper': {
          templateUrl: 'templates/tab-paper.html',
          controller: 'PaperCtrl'
        }
      }
    })

  .state('tab.wrong', {
    url: '/wrong',
    views: {
      'tab-paper': {
        templateUrl: 'templates/tab-wrong.html',
        controller: 'WrongCtrl'
      }
    }
  })

  .state('tab.exercise', {
    url: '/exercise/:id',
    views: {
      'tab-paper': {
        templateUrl: 'templates/tab-exercise.html',
        controller: 'ExerciseCtrl'
      }
    }
  })

  .state('tab.answer', {
    url: '/answer/:id',
    views: {
      'tab-paper': {
        templateUrl: 'templates/tab-answer.html',
        controller: 'AnswerCtrl'
      }
    }
  })

  $ionicConfigProvider.platform.ios.tabs.position('bottom');
  $ionicConfigProvider.platform.android.tabs.position('bottom');
  $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
  $ionicConfigProvider.platform.android.navBar.alignTitle('center');
  $ionicConfigProvider.views.swipeBackEnabled(false);
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/paper');

});

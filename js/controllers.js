'use strict'

angular.module('snipControllers', [])
.controller('LandingCtrl', ['$scope', '$http', 'localStorageService', 'Landing', function($scope, $http, localStorageService, Landing) {
  
  Landing.showLanguage();
  $scope.allSnippets = Landing.retrieveAllSnippets();
  
  $scope.slanguage = function(selectedLang) {
    $scope.slang = selectedLang;
    $scope.snippet_language = selectedLang;
  }

  $scope.submit = function() {
    var formData = {
      title: $scope.snippet_title,
      body: $scope.snippet_body,
      language: $scope.slang
    }

    if($scope.snippetID) {
      formData['sid'] = $scope.snippetID;
    }

    var isValid = false;
    isValid = $scope.validate(formData);

    if(isValid) {
      $scope.save(formData);
    }
  }

  $scope.validate = function(formData) {
    if(formData.title && formData.body && $scope.snippet_language) {
      return true;
    } else {
      alert('Please check all fields');
    }
  }

  $scope.save = function(formData) {
    if(localStorageService.isSupported) {
      Landing.addSnippet(formData);
        
    } else {
      alert('local storage is not supported!');
    }
  }

  $scope.snippet_load = function(snipID) {
    if(snipID) {
      var theSnip = Landing.loadSnippet(snipID);

      $('ul.nav-sidebar li').removeClass('active');
      $('#' + snipID ).addClass('active');

      $scope.snippet_title = theSnip.title;
      $('#language-btn').html( theSnip.language + ' ' + '<span class="caret"></span>').css( { 'text-transform': 'uppercase' } );
      $scope.snippet_language = theSnip.language;
      $scope.slang = theSnip.language;
      $scope.snippet_body = theSnip.body;
      $scope.snippetID = theSnip.sid;
    }
  }

  $scope.snippet_delete = function(snipID) {
    if(snipID) {
      Landing.deleteSnippet(snipID);
    }
  }  
}])
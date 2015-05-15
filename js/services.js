'use strict'

angular.module('snipServices', [])
.factory('Landing', ['localStorageService', function(localStorageService) {
  var storageContainer = localStorageService.get('localStorageContainer') || [];
  
  return {
    showLanguage: function() {
      $('.dropdown-menu a').on('click', function(){    
        $('.dropdown-toggle').html($(this).html() + ' ' + '<span class="caret"></span>');    
      });
    },

    addSnippet: function(snippet) {
      if(snippet.sid) {
        console.log(snippet.sid);
        for(var snipIndex in storageContainer) {
          var snip = storageContainer[snipIndex];
          if(snip.sid == snippet.sid) {
            snip.title = snippet.title;
            snip.language = snippet.language;
            snip.body = snippet.body;
            return;
          }
        }
      }

      snippet.sid  = (function () { // http://www.ietf.org/rfc/rfc4122.txt
          var s = [],
            hexDigits = '0123456789ABCDEF';
          for ( var i = 0; i < 32; i++ ) ( i == 12 ) ? '4': ( i == 16 ) ? hexDigits.substr((s[16] & 0x3) | 0x8, 1) : s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
          return s.join('')
        })();
      storageContainer.push(snippet);

      localStorageService.set('localStorageContainer', storageContainer);
    },

    loadSnippet: function(snipID) {
      console.log('in loadSnippet', snipID);
      for(var snip in storageContainer) {
        var theSnip = storageContainer[snip];
        if(theSnip.sid === snipID) {
          return theSnip;
        }
      }
    },

    retrieveAllSnippets: function() {
      return storageContainer;
    },
    
    deleteSnippet: function(snippet) {
      if(snippet) {
        for(var snipIndex in storageContainer) {
          var snip = storageContainer[snipIndex];
          if(snip.sid == snippet) {           
            localStorageService.set('localStorageContainer', storageContainer.splice( snipIndex, 1 ));
            return;
          }
        } // end of for loop
      } // end of if
    }

  }
}]);
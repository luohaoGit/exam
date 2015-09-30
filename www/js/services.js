angular.module('starter.services', [])

    .factory('DataService', function($http) {



      return {
        getSchApKp: function(param) {
          var url = "http://111.208.58.117:8092/api.php/Home/Analyze/getSchApKp?informid=58&gradeid=1&subjectid=1" + param;
          var promise = $http({
            method: 'GET',
            url: url
          });
          return promise;
        }
      };
    });

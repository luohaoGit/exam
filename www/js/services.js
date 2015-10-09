angular.module('starter.services', [])

.factory('DataService', function($http) {

  var remotesite = "http://111.211.167.6:8094";

  return {
    getPaperInfo: function(param) {
      var url = remotesite + "/api.php/Home/Analyze/getPerStuReport" + param;
      var promise = $http({
        method: 'GET',
        url: url
      });
      return promise;
    },

    getWrongInfo: function(param){
      //param = "?informid=1&stuid=1";
      var url = remotesite + "/api.php/Home/Analyze/getPerMisQues" + param;
      var promise = $http({
        method: 'GET',
        url: url
      });
      return promise;
    },

    getExerciseInfo: function(param){
      //param = "?questionid=d215591c-2e6b";
      var url = remotesite + "/api.php/home/testpaper/gettytestpaper" + param;
      var promise = $http({
        method: 'GET',
        url: url
      });
      return promise;
    },

    getSchApKp: function(param) {
      var url = remotesite + "/api.php/Home/Analyze/getSchApKp" + param;
      var promise = $http({
        method: 'GET',
        url: url
      });
      return promise;
    },

    getKpSchPropCount: function(param) {
      var url = remotesite + "/api.php/Home/Analyze/getKpSchPropCount" + param;
      var promise = $http({
        method: 'GET',
        url: url
      });
      return promise;
    },

    getKpSchScoreAbility: function(param){
      var url = remotesite + "/api.php/Home/Analyze/getKpSchScoreAbility" + param;
      var promise = $http({
        method: 'GET',
        url: url
      });
      return promise;
    },

    getKpClassScoreAbility: function(param){
      var url = remotesite + "/api.php/Home/Analyze/getKpClassScoreAbility" + param;
      var promise = $http({
        method: 'GET',
        url: url
      });
      return promise;
    },

    getKpPerScoreAbility: function(param){
      var url = remotesite + "/api.php/Home/Analyze/getKpPerScoreAbility" + param;
      var promise = $http({
        method: 'GET',
        url: url
      });
      return promise;
    }
  };
});

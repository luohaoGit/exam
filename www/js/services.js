angular.module('starter.services', [])

.factory('DataService', function($http) {

  var fakeData1 = [{
    name: "人数",
    colorByPoint: true,
    data: [{
      name: "A挡（90-100分）",
      y: 2,
      sliced: true,
      selected: true
    }, {
      name: "B挡（80-89分）",
      y: 20
    }, {
      name: "C挡（70-79分）",
      y: 12
    }, {
      name: "D挡（60-69分）",
      y: 6
    }, {
      name: "E挡（59分以下）",
      y: 13
    }]
  }];

  var fakeData2 = [{
    name: "占比",
    colorByPoint: true,
    data: [{
      name: "A",
      y: 3.70
    }, {
      name: "B",
      y: 25.93
    }, {
      name: "C",
      y: 62.96
    }, {
      name: "D",
      y: 7.41
    }]
  }];


  return {
    getPaperInfo: function(param) {
      var url = "http://111.211.167.6:8094/api.php/Home/Analyze/getPerStuReport" + param;
      var promise = $http({
        method: 'GET',
        url: url
      });
      return promise;
    },

    getWrongInfo: function(param){
      param = "?informid=1&stuid=1";
      var url = "http://111.211.167.6:8094/api.php/Home/Analyze/getPerMisQues" + param;
      var promise = $http({
        method: 'GET',
        url: url
      });
      return promise;
    },

    getExerciseInfo: function(param){
      param = "?questionid=d215591c-2e6b";
      var url = "http://111.211.167.6:8094/api.php/home/testpaper/gettytestpaper" + param;
      var promise = $http({
        method: 'GET',
        url: url
      });
      return promise;
    },

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

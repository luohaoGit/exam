angular.module('starter.services', [])

.factory('DataService', function() {

  //根据年级、学期、学科得到试卷，选择试卷后展示试卷测评结果
  var terms = ["上学期", "下学期"];
  var grades = ["", ""];
  var subjects = ["", ""];

  var papers = [];

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

  // Some templet data
  var data = {
    statisticsSeries : fakeData1,
    wrongSeries : fakeData2,
    pics : [
      "http://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/fashion-backless.jpg",
      "http://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/fashion-front.jpg",
      "http://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/fashion-pair.jpg"
    ]
  };

  return {
    getStatisticsSeries: function() {
      return data.statisticsSeries;
    },
    getWrongSeries: function(){
      return data.wrongSeries;
    },
    getPics: function(){
      return data.pics;
    }
  };
});

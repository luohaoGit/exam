angular.module('starter.controllers', ['highcharts-ng'])

.controller('PaperCtrl', function($scope, $location, DataService){
	$scope.data = {};

	var absUrl = $location.absUrl();
	var param = "";

	if(absUrl){
		var i = absUrl.indexOf("?");
		var j = absUrl.indexOf("#");
		param = absUrl.substring(i, j);
	}

	DataService.getPaperInfo(param).then(function(resp){
		$scope.data = resp.data.data[0];

		$scope.chartConfig = {
			options: {
				chart: {
					type: 'column'
				},
				xAxis: {
					type: 'category',
					title: {
						text: '得分分布统计'
					}
				},
				yAxis: {
					title: {
						text: '人数（人）'
					}
				},
				legend: {
					enabled: false
				},
				plotOptions: {
					series: {
						borderWidth: 0,
						cursor: 'pointer',
						dataLabels: {
							enabled: true,
							format: '{point.y}人'
						}
					}
				},

				tooltip: {
					headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
					pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}人</b><br/>'
				}
			},
			series: [{
				data: [{
					name: "A 90-100分",
					y: $scope.data.a_level ? parseInt($scope.data.a_level) : 0
				}, {
					name: "B 80-89分",
					y: $scope.data.b_level ? parseInt($scope.data.b_level) : 0
				}, {
					name: "C 70-79分",
					y: $scope.data.c_level ? parseInt($scope.data.c_level) : 0
				}, {
					name: "D 60-69分",
					y: $scope.data.d_level ? parseInt($scope.data.d_level) : 0
				}, {
					name: "E 59分以下",
					y: $scope.data.e_level ? parseInt($scope.data.e_level) : 0
				}],
				colorByPoint: true,
				name: "人数"
			}],
			title: {
				text: '基础统计'
			},

			loading: false
		};
	},function(resp){
		alert("网络错误")
	});
})

.controller('WrongCtrl', function($scope, DataService, $stateParams) {

	$scope.questionId = $stateParams.id;

	$scope.chartConfig = {
		options: {
			chart: {
				type: 'column'
			},
			xAxis: {
				type: 'category',
				title: {
					text: '答题分布统计'
				}
			},
			yAxis: {
				title: {
					text: '选项人数占比（%）'
				}
			},
			legend: {
				enabled: false
			},
			plotOptions: {
				series: {
					borderWidth: 0,
					cursor: 'pointer',
					dataLabels: {
						enabled: true,
						format: '{point.y:.1f}%'
					}
				}
			},

			tooltip: {
				headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
				pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b><br/>'
			}
		},
		series: DataService.getWrongSeries(),
		title: {
			text: '本班该题的正确率'
		},

		loading: false
	};
})

.controller('ExerciseCtrl', function($scope, DataService, $stateParams) {

})

.controller('AnswerCtrl', function($scope, DataService, $stateParams) {

})

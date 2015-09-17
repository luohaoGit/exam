angular.module('starter.controllers', ['highcharts-ng'])

.controller('PaperCtrl', function($scope, DataService) {
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
				y: 25
			}, {
				name: "B 80-89分",
				y: 18
			}, {
				name: "C 70-79分",
				y: 5
			}, {
				name: "D 60-69分",
				y: 2
			}, {
				name: "E 59分以下",
				y: 1
			}],
			colorByPoint: true,
			name: "人数"
		}],
		title: {
			text: '基础统计'
		},

		loading: false
	};
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

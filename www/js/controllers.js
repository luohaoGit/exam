angular.module('starter.controllers', ['highcharts-ng'])

.controller('HomeCtrl', function($scope, DataService) {
	$scope.chartConfig = {
		options: {
			chart: {
				type: 'column'
			},
			xAxis: {
				categories: [
					'知识点1',
					'知识点2',
					'知识点3',
					'知识点4',
					'知识点5'
				],
				crosshair: true
			},
			yAxis: {
				min: 0,
				title: {
					text: '得分率 (%)'
				}
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
				headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
				pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
				'<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
				footerFormat: '</table>',
				shared: true,
				useHTML: true
			}
		},
		series: [{
			name: '三年二班得分率',
			data: [49.9, 71.5, 106.4, 129.2, 144.0]

		}, {
			name: '三年三班得分率',
			data: [83.6, 78.8, 98.5, 93.4, 106.0]

		},{
			name: '校平均得分率',
			data: [48.9, 38.8, 39.3, 41.4, 47.0]

		}],
		title: {
			text: '各班级知识点得分率比较统计图'
		},

		loading: false
	};
})

.controller('ClassCtrl', function($scope, DataService, $stateParams) {
	$scope.classId = $stateParams.classId;
})

.controller('StatisticsCtrl', function($scope, DataService) {
	$scope.chartConfig = {
		options: {
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie'
			},
			tooltip: {
				pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: false
					},
					showInLegend: true
				}
			}
		},
		series: DataService.getStatisticsSeries(),
		title: {
			text: '人数'
		},

		loading: false
	};
})

.controller('WrongCtrl', function($scope, DataService, $stateParams) {

	$scope.questionId = $stateParams.questionId;

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


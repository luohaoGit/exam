angular.module('starter.controllers', ['highcharts-ng'])

.controller('HomeCtrl', function($scope, DataService) {
	$scope.slides = [];
	var picUrl = DataService.getPics();
	for(var i=0; i<picUrl.length; i++){
		var item = {
			title : "Slide " + i,
			data  : picUrl[i]
		}
		$scope.slides.push(item);
	}
})

.controller('StatisticsCtrl', function($scope, DataService) {
	$scope.data = {
		terms : ['上学期', '下学期']
	}

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


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

.controller('StudentCtrl', function($scope, DataService, $stateParams) {
	$scope.studentId = $stateParams.studentId;

	$scope.chartConfig1 = {
		options: {
			title: {
				text: '个人能力点得分率统计图',
				x: -20 //center
			},
			subtitle: {
				text: '',
				x: -20
			},
			xAxis: {
				categories: ['能力点1', '能力点2', '能力点3', '能力点4', '能力点5']
			},
			yAxis: {
				title: {
					text: '得分率 (%)'
				},
				plotLines: [{
					value: 0,
					width: 1,
					color: '#808080'
				}]
			},
			tooltip: {
				valueSuffix: '%'
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'middle',
				borderWidth: 0
			}
		},
		series: [{
			name: '张三',
			data: [7.0, 6.9, 9.5, 14.5, 18.2]
		}],
		title: {
			text: '个人能力点得分率统计图'
		},

		loading: false
	};

	$scope.chartConfig2 = {
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
	}
})


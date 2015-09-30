angular.module('starter.controllers', ['highcharts-ng'])

.controller('PaperCtrl', function($scope, $rootScope, $location, DataService){
	$scope.data = {};

	var absUrl = $location.absUrl();
	var param = "";

	if(absUrl){
		var i = absUrl.indexOf("?");
		var j = absUrl.indexOf("#");
		param = absUrl.substring(i, j);
		$rootScope.param = param;
	}

	DataService.getPaperInfo($rootScope.param).then(function(resp){
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
			credits: {
				enabled:false
			},

			loading: false
		};
	},function(resp){
		alert("网络错误")
	});
})

.controller('WrongCtrl', function($scope, $rootScope, DataService, $stateParams) {
	$scope.data = [];

	DataService.getWrongInfo($rootScope.param).then(function(resp){
		$scope.data = resp.data.data;
	},function(resp){
		alert("网络错误")
	});

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
		series: [],
		title: {
			text: '本班该题的正确率'
		},

		loading: false
	};
})

.controller('ExerciseCtrl', function($scope, DataService, $stateParams, $rootScope) {
	$scope.data = [];
	$scope.wrongIndex = $stateParams.index;

	DataService.getExerciseInfo($stateParams.id).then(function(resp){
		$rootScope.exerciseData[$stateParams.index] = resp.data.data;
		for(var i=0; i<resp.data.data.length; i++){
			$rootScope.exerciseData[$stateParams.index][i]['myAnswer'+i] = '';
		}
		$scope.data = $rootScope.exerciseData[$stateParams.index];
	},function(resp){
		alert("网络错误")
	});

})

.controller('AnswerCtrl', function($scope, DataService, $stateParams, $rootScope) {
	$scope.data = $rootScope.exerciseData[$stateParams.wrongIndex];
	console.log($scope.data)
})

.controller('TeacherCtrl', function($scope, DataService) {
	$scope.data = {};

	//var absUrl = $location.absUrl();
	var param = "?informid=58&gradeid=1&subjectid=1";

	/*	if(absUrl){
	 var i = absUrl.indexOf("?");
	 var j = absUrl.indexOf("#");
	 param = absUrl.substring(i, j);
	 $rootScope.param = param;
	 }*/

	DataService.getSchApKp(param).then(function(resp){
		console.log(resp)
	},function(resp){
		alert("网络错误")
	});

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


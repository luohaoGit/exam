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

	DataService.getExerciseInfo("?questionid=" + $stateParams.id).then(function(resp){
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

.controller('TeacherCtrl', function($scope, DataService, $location, $rootScope) {
	$scope.data = $rootScope.data;

	var absUrl = $location.absUrl();
	//var param = "?areaid=1&informid=69&gradeid=1&subjectid=1";

	if(absUrl){
		var i = absUrl.indexOf("?");
		var j = absUrl.indexOf("#");
		var param = absUrl.substring(i, j);
		$rootScope.teacherParam = param;
		console.log(param)
	}

	DataService.getSchApKp($rootScope.teacherParam).then(function(resp){
		$scope.data.schApKp = resp.data.data;
		console.log($scope.data)
	},function(resp){
		alert("网络错误")
	});

/*	DataService.getKpSchPropCount($rootScope.teacherParam).then(function(resp){
		$scope.data.kpSchPropCount = resp.data.data;
		console.log($scope.data)

		var chartData = [];
		var count = [];
		for(var i=0; i<resp.data.data.length; i++){
			var item = resp.data.data[i];
			var score = item.detail[i].kpSchScore;
			if(!count[i])	count[i] = 0;
			count[i] += (score ? parseFloat(score) : 0);

			if(i == resp.data.data.length-1){
				var o = {
					name : item.detail[j].schname,
					y : count[j]
				}
				chartData.push(o);
			}
		}
console.log(chartData)
		$scope.chartConfig = {
			options: {
				chart: {
					type: 'column'
				},
				xAxis: {
					type: 'category',
					title: {
						text: '知识点得分率统计'
					}
				},
				yAxis: {
					title: {
						text: '得分率（%）'
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
							format: '{point.y}%'
						}
					}
				},

				tooltip: {
					headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
					pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}%</b><br/>'
				}
			},
			series: [{
				name: "Brands",
				colorByPoint: true,
				data: chartData
			}],
			title: {
				text: '知识点得分率统计'
			},
			credits: {
				enabled:false
			},

			loading: false
		};
	},function(resp){
		alert("网络错误")
	});*/

	DataService.getKpSchScoreAbility($rootScope.teacherParam).then(function(resp){
		$scope.data.kpSchScoreAbility = $rootScope.data.kpSchScoreAbility = resp.data.data;
		console.log($scope.data)
		var categories = [];
		var chartData = [];
		for(var i=0; i<resp.data.data.length; i++){
			var item = resp.data.data[i];
			var o = {
				name : item.schname
			}
			var arr = [];
			for(var j=0; j<item.detail.length; j++){
				var score = item.detail[j].kpSchProp;
				score = score ? parseFloat(score) : 0;
				arr.push(score);
				if(i == 0){
					categories.push(item.detail[j].kpname);
				}
			}
			o.data = arr;
			chartData.push(o);
		}

		$scope.chartConfig1 = {
			options: {
				chart: {
					type: 'column'
				},
				xAxis: {
					categories: categories,
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
			series: chartData,
			title: {
				text: '各班学校识点得分率比较统计图'
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

.controller('SchoolCtrl', function($scope, DataService, $stateParams, $rootScope) {
	$scope.schoolId = $stateParams.schoolId;
	$rootScope.schoolId = $scope.schoolId;
	$scope.data = [];
	DataService.getKpClassScoreAbility($rootScope.teacherParam + "&schid=" + $stateParams.schoolId).then(function(resp){
		$scope.data.kpClassScoreAbility = $rootScope.data.kpClassScoreAbility = resp.data.data;
		console.log($scope.data)
		var categories = [];
		var chartData = [];
		for(var i=0; i<resp.data.data.length; i++){
			var item = resp.data.data[i];
			var o = {
				name : item.classname
			}
			var arr = [];
			for(var j=0; j<item.detail.length; j++){
				var score = item.detail[j].kpClassScore;
				score = score ? parseFloat(score) : 0;
				arr.push(score);
				if(i == 0){
					categories.push(item.detail[j].kpname);
				}
			}
			o.data = arr;
			chartData.push(o);
		}
		$scope.chartConfig = {
			options: {
				chart: {
					type: 'column'
				},
				xAxis: {
					categories: categories,
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
			series: chartData,
			title: {
				text: '各班班级识点得分率比较统计图'
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

.controller('ClassCtrl', function($scope, DataService, $stateParams, $rootScope) {
	$scope.classId = $stateParams.classId;
	$scope.data = [];
	DataService.getKpPerScoreAbility($rootScope.teacherParam + "&classid=" + $stateParams.classId + "&schid=" + $rootScope.schoolId).then(function(resp){
		$scope.data.kpPerScoreAbility = $rootScope.data.kpPerScoreAbility = resp.data.data;
		console.log($scope.data)
	},function(resp){
		alert("网络错误")
	});
})

.controller('StudentCtrl', function($scope, DataService, $stateParams, $rootScope) {
	$scope.stuid = $stateParams.stuid;

	var categories = [];
	var series = [];
	var seriesData = [];
	var classData = [];
	var schData = [];
	for(var i=0; i<$rootScope.data.kpPerScoreAbility.length; i++){
		var item = $rootScope.data.kpPerScoreAbility[i];

		if(item.stuid == $scope.stuid){
			for(var j=0; j<item.detail.length; j++){
				if(i == 0){
					categories.push(item.detail[j].kpname);
				}
				var score = item.detail[j].kpPerScore ? parseFloat(item.detail[j].kpPerScore) : 0;
				seriesData.push(score);

				var classScore = item.detail[j].kpClassScore ? parseFloat(item.detail[j].kpClassScore) : 0;
				classData.push(classScore);

				var schScore = item.detail[j].kpSchScore ? parseFloat(item.detail[j].kpSchScore) : 0;
				schData.push(schScore);
			}
			var o = {
				name: item.stuname,
				data: seriesData
			}
			series.push(o);
		}
	}

	$scope.chartConfig1 = {
		options: {
			title: {
				text: '个人知识点得分率统计图',
				x: -20 //center
			},
			subtitle: {
				text: '',
				x: -20
			},
			xAxis: {
				categories: categories
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
			data: seriesData
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
				categories: categories,
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
			name: '个人得分率',
			data: seriesData

		}, {
			name: '班级得分率',
			data: classData

		},{
			name: '学校得分率',
			data: schData

		}],
		title: {
			text: '个人知识点得分率比较统计图'
		},

		loading: false
	}
})


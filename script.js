var app = angular.module('project351', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/home', {
			templateUrl: 'home.html'
		})
		.when('/report1', {
			templateUrl: 'report1.html'
		})
		.when('/report2', {
			templateUrl: 'report2.html'
		})
		.when('/project',{
			templateUrl: 'project.html'
		})
		.when('/presentation', {
			templateUrl: 'presentation.html'
		})
		.when('/code', {
			templateUrl: 'code.html'
		})
		.when('/info', {
			templateUrl: 'info.html'
		})
		.otherwise( {
			redirectTo: '/home'
		});
}])

app.controller('main-controller', ['$scope', function($scope){
}]);



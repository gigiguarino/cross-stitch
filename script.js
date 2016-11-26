var app = angular.module('project351', ['ngRoute']);
app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/home', {
			templateUrl: 'blank.html'
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
		.otherwise( {
			redirectTo: '/home'
		});
}])

app.controller('main-controller', ['$scope', function($scope){
}]);


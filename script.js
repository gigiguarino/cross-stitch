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
		.when('/code', {
			templateUrl: 'code.html'
		})
		.when('/info', {
			templateUrl: 'info.html'
		})
		.otherwise( {
			redirectTo: '/home'
		});
}]);

app.factory('requesting', ['$http', function($http) {
	
	var data = function(params_in) {
		console.log($)
	};

	return { data: data}
}]);

app.controller('main-controller', ['$scope', '$window', function($scope, $window){
	
	$scope.scroll_top = function() {
		$window.scrollTo(0, 0);
	};

}])

app.controller('py-controller', ['$scope', '$http', 'requesting', function($scope, $http, requesting){

	$scope.helper_func = function(params_in) {
		var received_data = requesting.data(params_in);
		received_data.then(function(result){
			console.log("Received data");
			console.log(result.data);
		}, function() {
			console.log("Didn't receive data");
		});
	};

	$scope.reset = function() {
		document.getElementById("loading-gif").style.visibility = 'hidden';
		$scope.imglink = 0;
		$scope.maxheight = 0;
		$scope.maxwidth = 0;
		$scope.fabriccount = 0;
		$scope.numcolors = 0;
	};

	$scope.submit = function() {
		var python_params = [{
			'img-link': $scope.imglink,
			'height': $scope.maxheight,
			'width': $scope.maxwidth,
			'num-colors': $scope.numcolors,
			'fabric_count': $scope.fabriccount
		}];

		var error_print = "Error(s):\n\n";
		var error_found = 0;

		if (isNaN($scope.maxheight)) {
			error_found = 1;
			error_print += "Your maximum height is not an integer number\n\n";
		} else if ($scope.maxheight <= 0 || $scope.maxheight > 20) {
			error_found = 1;
			error_print += "Your maximum height is out of desired range: 1 - 20\n\n";
		}

		if (isNaN($scope.maxwidth)) {
			error_found = 1;
			error_print += "Your maximum width is not an integer number\n\n";
		} else if ($scope.maxwidth <= 0 || $scope.maxwidth > 20) {
			error_found = 1;
			error_print += "Your maximum width is out of desired range: 1 - 20\n\n";
		} 

		if (isNaN($scope.numcolors)) {
			error_found = 1;
			error_print += "Your number of colors is not an integer number\n\n";
		} else if ($scope.numcolors <= 0 || $scope.numcolors > 20) {
			error_found = 1;
			error_print += "Your number of colors is out of desired range: 1 - 20\n\n";
		} 

		if (isNaN($scope.fabriccount)) {
			error_found = 1;
			error_print += "Your fabric count is not an integer number\n\n";
		} else if ($scope.fabriccount <= 0 || $scope.fabriccount > 20) {
			error_found = 1;
			error_print += "Your fabric count is out of desired range: 1 - 20\n\n";
		} 


		if (error_found) {
			// not valid inputs
			alert(error_print);
		} else {
			document.getElementById("loading-gif").style.visibility = 'visible';
			$scope.helper_func(python_params);
		}
	};

}]);





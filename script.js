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

app.controller('main-controller', ['$scope', '$http', function($scope, $http){
	$scope.submit = function() {
		$scope.img_link = document.getElementById('image-link').value;
		$scope.max_height = document.getElementById('max-height').value;
		$scope.max_width = document.getElementById('max-width').value;
		$scope.fabric_count = document.getElementById('fabric-count').value;
		$scope.num_colors = document.getElementById('num-colors').value;
		var error_found = 0;
		var error_print = "Error(s):\n\n";
		var img_check = $scope.img_link.substring(0, 10);
		if (img_check != 'http://www') {
			error_print += "Your image link is invalid\n";
			error_print += "Please put it in the form http://www\n\n";
			error_found = 1;
		}
		if (isNaN($scope.max_height)) {
			error_print += "Your max height is not a number\n\n";
			error_found = 1;
		} 
		if ($scope.max_height <= 0 || $scope.max_height > 20) {
			error_print += "Your max height is not in desired range: 1 - 20\n\n";
			error_found = 1;
		} 	
		if (isNaN($scope.max_width)) {
			error_print += "Your max width is not a number\n\n";
			error_found = 1;
		} 
		if ($scope.max_width <= 0 || $scope.max_width > 20) {
			error_print += "Your max width is not in desired range: 1 - 20\n\n";
			error_found = 1;
		} 
		if (isNaN($scope.fabric_count)) {
			error_print += "Your fabric count is not a number\n\n";
			error_found = 1;
		} 
		if ($scope.fabric_count > 20 || $scope.fabric_count <= 0) {
			error_print += "Your fabric count is not in desired range: 1 - 20\n";
			error_print += "Some typical fabric counts are 8, 11, 12, 14, 16, 18, 20\n\n"
			error_found = 1;
		}
		if (isNaN($scope.num_colors)) {
			error_print += "Your number of colors is not a number\n\n";
			error_found = 1;
		} 
		if ($scope.num_colors > 15 || $scope.num_colors <= 0) {
			error_print += "Your number of colors is not in desired range: 1 - 20\n\n";
			error_found = 1;
		} 
		if (error_found) {
			alert(error_print);
		} else {
			document.getElementById("loading-gif").style.visibility = 'visible';
			
			$http({
				method: 'POST',
				url: 'project.py',
				data: {
					img_link:		$scope.img_link,
					height: 		$scope.max_height,
					width: 			$scope.max_width,
					num_colors:     $scope.num_colors,
					fabric_count:   $scope.fabric_count
				}

			}).then(function(response){
				console.log(response);
				console.log('here i am');
			}, function(error) {
				console.log(error);
			});
		}	

		return;
	}
}]);







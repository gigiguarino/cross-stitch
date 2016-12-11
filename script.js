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
	$scope.submit = function() {
		var img_link = document.getElementById('image-link').value;
		var max_height = document.getElementById('max-height').value;
		var max_width = document.getElementById('max-width').value;
		var fabric_count = document.getElementById('fabric-count').value;
		var num_colors = document.getElementById('num-colors').value;


		var error_found = 0;
		var error_print = "Error(s):\n\n";

		var img_check = img_link.substring(0, 10);
		if (img_check != 'http://www') {
			error_print += "Your image link is invalid\n";
			error_print += "Please put it in the form http://www\n\n";
			error_found = 1;
		}

		if (isNaN(max_height)) {
			error_print += "Your max height is not a number\n\n";
			error_found = 1;
		} 

		if (max_height <= 0 || max_height > 20) {
			error_print += "Your max height is not in desired range: 1 - 20\n\n";
			error_found = 1;
		} 
				
		if (isNaN(max_width)) {
			error_print += "Your max width is not a number\n\n";
			error_found = 1;
		} 

		if (max_width <= 0 || max_width > 20) {
			error_print += "Your max width is not in desired range: 1 - 20\n\n";
			error_found = 1;
		} 

		if (isNaN(fabric_count)) {
			error_print += "Your fabric count is not a number\n\n";
			error_found = 1;
		} 

		if (fabric_count > 20 || fabric_count <= 0) {
			error_print += "Your fabric count is not in desired range: 1 - 20\n";
			error_print += "Some typical fabric counts are 8, 11, 12, 14, 16, 18, 20\n\n"
			error_found = 1;
		}

		if (isNaN(num_colors)) {
			error_print += "Your number of colors is not a number\n\n";
			error_found = 1;
		} 
			
		if (num_colors > 15 || num_colors <= 0) {
			error_print += "Your number of colors is not in desired range: 1 - 20\n\n";
			error_found = 1;
		} 

		if (error_found) {
			alert(error_print);
		} else {
			document.getElementById("loading-gif").style.visibility = 'visible';
			alert('hi');
			/*
			$.getJSON($SCRIPT_ROOT + '/start', {
				img_url: img_link,
				height: max_height,
				width: max_width,
				num_colors: num_colors,
				fabric_count: fabric_count,


			})
			*/
		}	

		return;
	}
}]);

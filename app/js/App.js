var app = angular.module("app",[]).config(function($routeProvider) {
	$routeProvider.when('/login', {
		templateUrl : 'login.html',
		controller  : 'LoginController'
	});
	
	$routeProvider.when('/home' , {
		templateUrl : 'home.html',
		controller  : 'HomeController'
	});

	$routeProvider.otherwise({ redirectTo: '/login'});
}); // end routing


app.controller('LoginController', function($scope,$http) {
	$scope.credentials = { username:"", passoword:"" };
	
	$scope.url = GLOBAL_URL+'/handlers/login.php';

	$scope.login = function() {
		$http.post($scope.url,
			{ data : $scope.credentials }).
	        success(function(data, status) {
	        	if(data == true) {
	        		alert("you are alowed");
	        	}
	            $scope.status = status;
	            $scope.data = data;
	            $scope.result = data; // Show result from server in our <pre></pre> element
	        })
	        .
	        error(function(data, status) {
	        	if(status==404) {
	        		alert("Boom in the back exploded");
	        	}
	            $scope.data = data || "Request failed";
	            $scope.status = status;         
	    });

	        

	}

}); // end LoginController

app.controller('HomeController', function() {
}); // end HomeController
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
});


app.factory('myUsername', function () {
		var username = "";
        return {
        	setUser : function(name) { 
        		this.username = name; },
        	getUser : function() {
        		return this.username;
        	}
        }
    }); 


app.controller('LoginController', function($scope,$http,$location,myUsername) {
	$scope.credentials = { username:"", passoword:"" };
	
	$scope.url = GLOBAL_URL+'/handlers/login.php';

	$scope.login = function() {
		$http.post($scope.url,
			{ data : $scope.credentials }).
	        success(function(data, status) {
	        	if(data == true) {
	        		myUsername.setUser($scope.credentials.username);
	        		$location.path('/home');
	        	} else {
	        		alert("Wrong username / passoword");
	        	}
	            $scope.status = status;
	            $scope.data   = data;
	            $scope.result = data; // Show result from server in our <pre></pre> element
	        })
	        .
	        error(function(data, status) {
	        	if(status==404) {
	        		alert("Boom in the back exploded");
	        	}
	            $scope.data   = data || "Request failed";
	            $scope.status = status;         
	    });
	}

}); // end LoginController

app.controller('HomeController', function($scope,myUsername) {
	$scope.free_text = myUsername.getUser();

}); // end HomeController
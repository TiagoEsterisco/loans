var app = angular.module("app",['ngCookies']);

app.config(function($routeProvider,$locationProvider) {

	$routeProvider.when('/login', {
		templateUrl : 'login.html',
		controller  : 'LoginController'
	});

	$routeProvider.when('/home' , {
		templateUrl : 'home.html',
		controller  : 'HomeController'
	});

	$routeProvider.otherwise({ redirectTo: '/login'});

	// In production need to change to false.
	$locationProvider.html5Mode(false);
});


// Check if user is logged in, if not Block Access
app.run(function(logincheck, $location, myUser){
        //console.log("Into run mode");
        console.log("Is logged in: ", logincheck( myUser.getUser() ));
        if(!logincheck(myUser.getUser()))
        {
        	$location.path('/login');
        }
});


// FACTORIES

// Login logic
app.factory('logincheck', function(){
  return function(userid){
	  //Perform logical user loging check either by looking at cookies or make a call to server
	  if(userid != undefined ) return true;
	  return false;
	  };
});

// User object
app.factory('myUser', function ($cookieStore) {
    return {
    	setUser : function(name) {
    		$cookieStore.put('username', name);
    	},
    	getUser : function() {
    		return $cookieStore.get('username');
    	},
    	setId   : function(id) {
    		$cookieStore.put('user_id', id);
    	},
    	getId   : function() {
    		return $cookieStore.get('user_id');
    	}
    }
});

// END FACTORIES



// LOGIN.HTML
app.controller('LoginController', function($scope,$http,$location,myUser) {

	$scope.credentials = { username:"", passoword:"" };

	$scope.url = GLOBAL_URL+'/handlers/login.php';

	$scope.login = function() {
		$http.post($scope.url,
			{ data : $scope.credentials }).
	        success(function(data, status) {
	        	if(data >= 1) {
	        		myUser.setUser($scope.credentials.username);
	        		myUser.setId(data);
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


// HOME.HTML
app.controller('HomeController', function($scope,myUser,$http) {
	$scope.username = myUser.getUser();
	$scope.id = myUser.getId();

	var query_elements = { user_id: $scope.id, type_id:"1" };

	$scope.url = GLOBAL_URL+'/handlers/loans.php';
	$http.post($scope.url,
		{ data : query_elements }).
        success(function(data, status) {
            window.ted = data;
        	$scope.loans  = data;
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

    $scope.order = '-days';

    var count = 0;
    $scope.biggest = function(loan) {
        if(loan>=count) {
            count = loan;
            return true;
        } else {
            return false;
        }
    }

    // Add Loan
    $scope.loan = { user_id: $scope.id, friend_name:"", object:"", date:""};
    $scope.url = GLOBAL_URL+'/handlers/set_loan.php';

    $scope.set_loan = function() {
        $http.post($scope.url,
            { data : $scope.loan }).
            success(function(data, status) {
                $scope.loans.push ($scope.loan);
                $scope.status = status;
                $scope.data   = data;
                $scope.result = data; // Show result from server in our <pre></pre> element
            })
            .
            error(function(data, status) {
                $scope.data   = data || "Request failed";
                alert($scope.data + " " + status);
                $scope.status = status;
        });
    }


    $scope.returned_loan = function(loan) {
        var index = $scope.loans.indexOf(loan)
        $scope.loans.splice(index,1);
    }

        $scope.isActive = false;

    $scope.rotate_cube = function() {
        $scope.isActive = !$scope.isActive;
    }



}); // end HomeController










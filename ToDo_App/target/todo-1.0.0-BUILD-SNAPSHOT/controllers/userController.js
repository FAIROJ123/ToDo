app.controller('userCtrl', function($scope,$state,userservice,$location,$rootScope,$window){
 
	
	var commonUrl="http://localhost:8080/todo/";
	$scope.register=function(){
		var userdetails={
        name: $scope.name,
        email: $scope.email,
        mobileNumber: $scope.mobileNumber,
        password: $scope.password
       
		};
   var url=commonUrl+"register";
   
   userservice.postmethod(userdetails,url).then(function successCallback(response) {
		$window.alert("Registration Done,Check Mail.");
		return response.data;

},
function errorCallback(response) {
	$window.alert("EmailId allready exist");
return response.data;

});
	  


  }
	$scope.login=function(){
		var logindetails={
		  email:$scope.email,
		  password:$scope.password
		};
		
		var url=commonUrl+"login";
	   userservice.postmethod(logindetails,url).then(function successCallback(response) {
			if(response.data.status==200){
				localStorage.setItem('token',response.data.msg );
				$state.go('home.dashboard');
			}else{
				
				$state.go('login');
			}		
		},
		function errorCallback(response) {
			$window.alert("Emailid or password Not Found?");
			
		});
	}
	
	
	$scope.forgetpassword = function() {

		var email = {

			email : $scope.email
		}
        var url=commonUrl+"forgetpassword";
		userservice.postmethod(email,url).then(function successCallback(response) {
			$window.alert("Send Mail,Check Mail.");
			return response.data;

		},
		function errorCallback(response) {
			$window.alert("Email not found.");
			return response.data;
		
		});

	}
	
	$scope.reset = function() {
		var resetdetails = {
				newpassword : $scope.newpassword,
			reenterpassword : $scope.reenterpassword
		};
		var url=commonUrl+"resetpassword";
		userservice.postmethod(resetdetails,url).then(function successCallback(response) {
			$window.alert("Reset password is Done.");
            $state.go('login');
		},
		function errorCallback(response) {
			return response;
		});
		 
		
	}
	

});

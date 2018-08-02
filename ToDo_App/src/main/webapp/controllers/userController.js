app.controller('userCtrl', function($scope,$state,userservice,$location,$window){
 
	var commonUrl="http://localhost:8080/todo/";
	$scope.register=function(){
		var userdetails={
        name: $scope.name,
        email: $scope.email,
        mobileNumber: $scope.mobileNumber,
        password: $scope.password
       
		};
   var url=commonUrl+"register";
   
    console.log("userdetails",userdetails)
   userservice.postmethod(userdetails,url).then(function successCallback(response) {
		$window.alert("Registration Done,Check Mail.");
		console.log("success", response.data);
		return response.data;

},
function errorCallback(response) {
	$window.alert("EmailId allready exist");
console.log("Error occur", response.data);
return response.data;

});
	  


  }
	$scope.login=function(){
		var logindetails={
		  email:$scope.email,
		  password:$scope.password
		};
		
		var url=commonUrl+"login";
	    console.log("logiindetails",logindetails)
	   userservice.postmethod(logindetails,url).then(function successCallback(response) {
			console.log(" login success ", response.data);
			if(response.data.status==200){
				localStorage.setItem('token',response.data.msg );
				console.log("responsetokengvgvgvgv",response.data.msg );
				$state.go('home.dashboard');
			}else{
				console.log("else")
				$state.go('login');
			}		
		},
		function errorCallback(response) {
			console.log("Error occur", response);
			$window.alert("Emailid or password Not Found?");
			
		});
	}
	
	
	$scope.forgetpassword = function() {

		var email = {

			email : $scope.email
		}
        var url=commonUrl+"forgetpassword";
		console.log("Emailid", email);

		userservice.postmethod(email,url).then(function successCallback(response) {
			$window.alert("Send Mail,Check Mail.");
			console.log("success", response.data);
			return response.data;

		},
		function errorCallback(response) {
			console.log("Error occur", response.data);
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
		var object=$location.search();
		console.log(object.token,"token")
		console.log("resetdetails:",resetdetails)
		
		userservice.postmethod(resetdetails,url,object.token).then(function successCallback(response) {
			$window.alert("Reset password is Done.");
            $state.go('login');
			console.log("success", response.data);
			

		},
		function errorCallback(response) {
			console.log("Error occur", response.data);
		
			
		});
		 
		
	}
	

});

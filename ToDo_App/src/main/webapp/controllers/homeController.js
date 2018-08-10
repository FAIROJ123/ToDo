app.controller('homeController', function($scope,$mdSidenav,$http,$state, $window ,$rootScope,$mdDialog,userservice,labelservice) {
  $scope.toggleLeft = buildToggler('left');
  var commonUrl = "http://localhost:8080/todo/";
  $scope.name = "Google Keep";
  function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
        console.log($mdSidenav(componentId).isOpen());
        console.log(document.getElementById("myDiv"));
        if($mdSidenav(componentId).isOpen()){
        	document.getElementById("myDiv").style.marginLeft = "150px";
        }else{
        	document.getElementById("myDiv").style.marginLeft = "0px";

        }
      };
      
}
  $scope.Logout=function(){
	 
	  $window.localStorage.clear();
	  $state.go('login');
	  history.pushState(null, null, 'login');
	  $window.addEventListener('popstate', function(event) {

		  history.pushState(null, null, 'login');

		  });
	 
	  
	}
  $scope.gotolabel=function(label)
  {
	  console.log("in goto label");
     $state.go('home.labelsdashboard',{label:label.labelname});
  };
  
  $scope.getallLabels =function() {

	    var url = commonUrl + "getallLabels";
		
		userservice.getmethod(url).then(
				function successCallback(response) {
					
					$scope.getlabels=response.data;
                  console.log("Success:",response)
					return response.data;

				}, function errorCallback(response) {
					console.log("Error occur", response);
					return response;

				});
	}
  
  $scope.trash = function() {
	  
	    $state.go("home.trash");
	   
	    
	  }
  $scope.archive = function() {
	  
	    $state.go("home.archive");
	   
	    
	  }
  $scope.remainder = function() {
	  
	  console.log("in remainders");
	    $state.go("home.remainders");
	   
	    
	  }
  $scope.redirecthome = function(){
	  $state.go("home.dashboard");
  }
  
  var notes = document.getElementsByClassName('dashboard');
  var i;
  console.log("note in homecontroller:",notes);
 $scope.listView = function()
 {	    for (i = 0; i < notes.length; i++) {
	    	console.log("note from dashboard:",notes);
	      notes[i].style.width = "75%";
	    }
	  }
	  $scope.gridView = function() {
		  console.log("grid");
    for (i = 0; i < notes.length; i++) {
      notes[i].style.width = "30%";
	    }
	  }
	  
  $rootScope.$on('$locationChangeStart',function(ev,state,label){
	  console.log(state);
	  if(state == 'http://localhost:8080/todo/#!/home/dashboard'){
		  $scope.name = "Google Keep";
	      $scope.CustomColor = {
	        'background-color': '#fb0',
	        'color': 'black'
	      }
	  }
	  else if(state == 'http://localhost:8080/todo/#!/home/trash'){
		  $scope.name = "Trash";
	        $scope.CustomColor = {
	          'background-color': 'rgb(99, 99, 99)',
	          'color': 'white'
	        }
	  }else if(state == 'http://localhost:8080/todo/#!/home/archive'){
		  $scope.name = "Archive";
	        $scope.CustomColor = {
	          'background-color': 'rgb(99, 99, 99)',
	          'color': 'white'
	  }
	  }else if(state == 'http://localhost:8080/todo/#!/home/labelsdashboard/:label'){
		 $scope.name = "label";
	        $scope.CustomColor = {
	          'background-color': 'rgb(99, 99, 99)',
	          'color': 'white'
	  }
	  
  }else if(state == 'http://localhost:8080/todo/#!/home/remainders'){
	  $scope.name = "Remainders";
      $scope.CustomColor = {
        'background-color': 'rgb(99, 99, 99)',
        'color': 'white'
}

}
	  });
  
 
  
  $scope.showAlert=function(event){
 	 $mdDialog.show({
          //locals:{label : label},
          controller: dialogController,
          templateUrl: 'templates/Label.html',
          parent: angular.element(document.body),
          targetEvent: event,
          clickOutsideToClose:true
          

   });
 }
  $scope.hoverIn = function(ev) {
	    this.hoverEdit = true;
	  };

	  $scope.hoverOut = function(ev) {
	    this.hoverEdit = false;
	  };
 
function dialogController($scope,$mdDialog,userservice) {
	console.log("in dailogController");
	
 	  $scope.cancel = function() {
 	      $mdDialog.cancel();
 	      }
 	  $scope.createlabel = function() {
 			console.log("inside label.....");
 			var label = {
 					labelname : $scope.labelname
 					
 			};
 	         console.log("label:",label);
 			var url = commonUrl + "createlabel";
 			console.log("labeldetails", label)
 			if(label.labelname!=label.labelname){
 				console.log("labelname", $scope.labelname)

 			userservice.postmethod(label, url).then(
 					function successCallback(response) {

 						console.log("success", response.data);
 						$scope.getallLabels();
 						return response.data;

 					}, function errorCallback(response) {
 						console.log("Error occur", response);
 						return response;
 						
 					});
 			}
 		}
 	 $scope.getallLabels =function() {

 	    var url = commonUrl + "getallLabels";
 		
 		userservice.getmethod(url).then(
 				function successCallback(response) {
 					
 					$scope.getlabels=response.data;
                    console.log("Success:",response)
 					return response.data;

 				}, function errorCallback(response) {
 					console.log("Error occur", response);
 					return response;

 				});
 	}
 	
 	$scope.deletelabel =function(label){
		
		 console.log("label:"+label);
		 var labelid=label.id;
		 console.log("labelid:"+labelid)
		 
		 
		 var url = commonUrl + "deletelabel/"+label.id;
		
		
		labelservice.labelpostmethod(url).then(
				function successCallback(response) {
					
					console.log("success", response.data);
					return response.data;

				}, function errorCallback(response) {
					console.log("Error occur", response);
					return response;

				});
	}
 	
 	$scope.updatelabel = function(label){
		console.log("from update(): ",label);
		console.log("in update");		
		var url = commonUrl + "updatelabel/"+label.id;
		userservice.putmethod(label,url).then(
				function successCallback(response) {
					
					console.log("success data", response.data);
					return response.data;

				}, function errorCallback(response) {
					console.log("Error occur", response);
					return response;

				});
		
	}
 }


$scope.showfileEvent=function(event){
	console.log("inside event...");
	 $mdDialog.show({
         //locals:{label : label},
         controller: dialogController,
         templateUrl: 'templates/profileCrop.html',
         parent: angular.element(document.body),
         targetEvent: event,
         clickOutsideToClose:true
         

  });
}


  
});

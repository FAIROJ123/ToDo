app.controller('homeController', function($scope,$mdSidenav,$http,$state, $location,$window ,$rootScope,$mdDialog,userservice,labelservice) {
  $scope.toggleLeft = buildToggler('left');
  var commonUrl = "http://localhost:8080/todo/";
  $scope.name = "Google Keep";
  function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
        console.log($mdSidenav(componentId).isOpen());
        console.log(document.getElementById("myDiv"));
        if($mdSidenav(componentId).isOpen()){
        	document.getElementById("myDiv").style.marginLeft = "100px";
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
	 var commonUrl = "http://localhost:8080/todo/";
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
            console.log("URL:",url);
 			userservice.postmethod(label, url).then(
 					function successCallback(response) {
                     console.log("Inside service.....");
 						console.log("success", response.data);
 						$scope.getallLabels();
 						return response.data;

 					}, function errorCallback(response) {
 						console.log("Error occur", response);
 						return response;
 						
 					});
 			
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


$scope.showfileEvent=function(event,user){
	console.log("inside event...");
	 $mdDialog.show({
         locals:{user : user},
         controller: imageController,
         templateUrl: 'templates/profileCrop.html',
         parent: angular.element(document.body),
         targetEvent: event,
         clickOutsideToClose:true
         

  });
}
function imageController($scope,$timeout,userservice) {
	console.log("inside ImageController");
	 $scope.myImage='';
	    $scope.myCroppedImage='';
       $scope.file="";
	    var handleFileSelect=function(evt) {
	      var file=evt.currentTarget.files[0];
	      console.log("File:",file);
	      var reader = new FileReader();
	      reader.onload = function (evt) {
	        $scope.$apply(function($scope){
	          $scope.myImage=evt.target.result;
	        });
	      };
	      reader.readAsDataURL(file);
	    };
	    $timeout(function(){
	    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
	    },1000,false);
}

const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(',')
    const mime = arr[0].match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n) {
      u8arr[n - 1] = bstr.charCodeAt(n - 1)
      n -= 1 // to make eslint happy
    }
    return new File([u8arr], filename, {
      type: mime
    });
  }
$scope.uploadProfilePic = function functionName(myCroppedImage) {
    console.log("In upload profile pic...............");
    var url = baseurl + 'uploadFile';
    console.log(myCroppedImage);
    const file = dataURLtoFile(myCroppedImage, $scope.file);
    console.log(file);
    var form1 = new FormData();
    form1.append("file", file);
    userservice.uploadFileToUrl( url,form1).then(function successCallback(response) {
      console.log(response.data);
     /* var image = response.data;
      updateUserPofile(image);*/
    }, function errorCallback(response) {
      console.log("error" + response.data);
    });
  }
function updateUserPofile(image) {
    var user = getUser();
    console.log(user);
    var url = baseurl + 'updateUser';
    user.profileImage = image;
    console.log(user);
    PutService.updateMethod(user, url).then(function successCallback(response) {
      console.log(response);
      getUser();
    }, function errorCallback(response) {
      console.log("error" + response.data);
    })
  }
  
});

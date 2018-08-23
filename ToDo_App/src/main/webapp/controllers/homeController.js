app.controller('homeController', function($scope,$mdSidenav,$http,$state,$location,$window ,$rootScope,$mdDialog,userservice,labelservice) {
  $scope.toggleLeft = buildToggler('left');
  var commonUrl = "http://localhost:8080/todo/";
  $scope.name = "Google Keep";
  function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
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
	
     $state.go('home.labelsdashboard',{label:label.labelname});
    
  };
 
  
  var userData = "";
  $scope.userData ="";
  function getLoginUser() {
    var url = commonUrl + 'getLoginUser';
    userservice.getmethod(url).then(function successCallback(response) {
      $scope.userData = response.data;
      userData= $scope.userData;
    }, function errorCallback(response) {
      return response;
    })

    return userData;
  }

  getLoginUser();

  $scope.getallLabels =function() {

	    var url = commonUrl + "getallLabels";
		
		userservice.getmethod(url).then(
				function successCallback(response) {
					$scope.getlabels=response.data;
					return response.data;

				}, function errorCallback(response) {
					return response;

				});
	}
  $scope.getallLabels();
  
  $scope.trash = function() {
	  
	    $state.go("home.trash");
	   
	    
	  }
  $scope.archive = function() {
	  
	    $state.go("home.archive");
	   
	    
	  }
  $scope.remainder = function() {
	
	    $state.go("home.remainders");
	   
	    
	  }
  $scope.redirecthome = function(){
	  $state.go("home.dashboard");
  }
  
  var notes = document.getElementsByClassName('dashboard');
  var i;
 
 $scope.listView = function()
 {	    for (i = 0; i < notes.length; i++) {
	      notes[i].style.width = "75%";
	    }
	  }
	  $scope.gridView = function() {
    for (i = 0; i < notes.length; i++) {
      notes[i].style.width = "30%";
	    }
	  }
	  
  $rootScope.$on('$locationChangeStart',function(ev,state,label){
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
	 var commonUrl = "http://localhost:8080/todo/";
 	  $scope.cancel = function() {
 	      $mdDialog.cancel();
 	      }
 	 
 	  $scope.createlabel = function() {
 			var label = {
 					labelname : $scope.labelname
 					
 			};
 			var url = commonUrl + "createlabel";
          
            if(label.labelname != undefined || label.labelname != null)
            
             {
            	var flag = false;
                for (var i = 0; i < $scope.getlabels.length; i++) {
                  var labels = $scope.getlabels[i];
                  if ( labels.labelname === label.labelname) {
                    flag = true;
                  } else {}
                }
                if(flag == false){
 
 			userservice.postmethod(label, url).then(
 					function successCallback(response) {
                    
 						$scope.getallLabels();
 						return response.data;

 					}, function errorCallback(response) {
 						return response;
 						
 					});
 	        
 		}
 	  }
 	  }
            $scope.getlabels=[];
 	  
 	 $scope.getallLabels =function() {

 	    var url = commonUrl + "getallLabels";
 		
 		userservice.getmethod(url).then(
 				function successCallback(response) {
 					
 					$scope.getlabels=response.data;
 					return response.data;

 				}, function errorCallback(response) {
 					return response;

 				});
 	}
 	 $scope.getallLabels();
 	
 	$scope.deletelabel =function(label){
		 var labelid=label.id;
		
		 var url = commonUrl + "deletelabel/"+label.id;
		
		
		labelservice.labelpostmethod(url).then(
				function successCallback(response) {
					$scope.getallLabels();
					return response.data;

				}, function errorCallback(response) {
					return response;

				});
	}
 	
 	$scope.updatelabel = function(label){	
		var url = commonUrl + "updatelabel/"+label.id;
		userservice.putmethod(label,url).then(
				function successCallback(response) {
				
					$scope.getallLabels();
					return response.data;

				}, function errorCallback(response) {
					return response;

				});
		
	}
 }




$scope.showfileEvent=function(event,user){
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
	 $scope.myImage = '';
	    $scope.myCroppedImage = '';
	    $scope.filename = "";
	    var handleFileSelect = function(evt) {
	      var file = evt.target.files[0];
	      $scope.filename = evt.target.files[0].name;
	      var reader = new FileReader();
	      reader.onload = function(evt) {
	        $scope.$apply(function($scope) {
	          $scope.myImage = evt.target.result;
	        });
	      };
	      reader.readAsDataURL(file);
	    };
	    $timeout(function() {
	      angular.element(document.querySelector('#fileInput')).on('change', handleFileSelect);
	    }, 1000, false);


	    const dataURLtoFile = (dataurl, filename) => {
	        const arr = dataurl.split(',')
	        const mime = arr[0].match(/:(.*?);/)[1]
	        const bstr = atob(arr[1])
	        let n = bstr.length
	        const u8arr = new Uint8Array(n)
	        while (n) {
	          u8arr[n - 1] = bstr.charCodeAt(n - 1)
	          n -= 1
	        }
	        return new File([u8arr], filename, {
	          type: mime
	        });
	      }
	    
$scope.uploadProfilePic = function functionName(myCroppedImage) {
    var url = commonUrl + 'uploadFile';
    const file = dataURLtoFile(myCroppedImage, $scope.filename);
    console.log(file);
    var form1 = new FormData();
    form1.append("file", file);
    userservice.uploadFileToUrl( url,form1).then(function successCallback(response) {
      var image = response.data.msg;
      $scope.updateUserpic(image);
    }, function errorCallback(response) {
     return response;
    });
  }

$scope.updateUserpic = function(image){
	
	var user= getLoginUser();
	
	var url = commonUrl + "updateUser";
	user.userProfile = image;
	userservice.putmethod(user,url).then(
			function successCallback(response) {
				
				return response.data;

			}, function errorCallback(response) {
				return response;

			});
	
}


}

});

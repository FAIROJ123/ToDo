app.controller('dashboardController', function($scope, $state, userservice,$mdDialog,labelservice,$rootScope,$location) {
	$scope.name='grid';
	$scope.hoverIn = function(ev) {
	    this.hoverEdit = true;
	  };

	  $scope.hoverOut = function(ev) {
	    this.hoverEdit = false;
	  };
	
	  var path=$location.path();
	  console.log("path:",path);
 	  $scope.parameter=path.split('/')[3];
 	  console.log("url:" +   $scope.parameter);
	  
 	 window.onpopstate = function () {
         history.go(1);
     };
	  
	var commonUrl = "http://localhost:8080/todo/";
	$scope.createNote = function() {
		console.log("ashds");
		var note = {
				title : $scope.title,
				description : $scope.description
		};
         console.log("note:",note);
		var url = commonUrl + "createNote";
		console.log("notedetails", note)
		if(note.title!=null && note.description!=null){
			console.log("notls", note)

		userservice.postmethod(note, url).then(
				function successCallback(response) {

					console.log("success", response.data);
					$scope.getallnotes();
					return response.data;

				}, function errorCallback(response) {
					console.log("Error occur", response);
					return response;
					
				});
	}
	}
	
	
	$scope.getallnotes =function() {

	    var url = commonUrl + "getallnotes";
		
		userservice.getmethod(url).then(
				function successCallback(response) {
					
					$scope.getnotes=response.data;
					$scope.getnotes = $scope.getCollaborators.concat($scope.getnotes);
					console.log('Notes: ', $scope.getnotes)
					//console.log("success", response.data);
					return response.data;

				}, function errorCallback(response) {
					console.log("Error occur", response);
					return response;

				});
	}
	
	$scope.deletenote =function(note){
		
		 console.log("Note:"+note);
		 var noteid=note.id;
		 console.log("Noteid:"+noteid)
		 
		 
		 var url = commonUrl + "deleteNote/"+note.id;
		
		
		userservice.notepostmethod(url).then(
				function successCallback(response) {
					
					console.log("success", response.data);
					return response.data;
					$scope.getallnotes();

				}, function errorCallback(response) {
					console.log("Error occur", response);
					return response;

				});
	}
	
	var colors = [
		[
			{
				'name':'white',
				'value':'white'
				
			},
		{
			'name':'Maroon',
			'value':'rgb(255, 138, 128)'
		},
		{
			'name':'Yellow',
			'value':'#FFFF00'
		},
		{
			'name':'Orrange',
			'value':'rgb(255, 209, 128)'
		},
		
	],
	[
		{
			'name':'Green',
			'value':'rgb(204, 255, 144)'
		},
		{
			'name':'liteblue',
			'value':'rgb(167, 255, 235)'
		},
		{
			'name':'blue',
			'value':'rgb(128, 216, 255)'
		},
		{
			'name':'Darkblue',
			'value':'rgb(130, 177, 255)'
		},
		
	],
	[
		{
			'name':'Purple',
			'value':'rgb(179, 136, 255)'
		},
		
		
		{
			'name':'pink',
			'value':'rgb(248, 187, 208)'
		},
		{
			'name':'Brown',
			'value':'rgb(215, 204, 200)'
		},
		
		{
			'name':'Gray',
			'value':'rgb(207, 216, 220)'
		}
	]
	 ];
	  $scope.colors = colors;
	  
	  
	  $scope.changeColor = function(note, value) {
		  console.log("Note" + note);
		  console.log("value:",value);
	    note.color = value;
	    console.log("color:",note.color);
   	    $scope.value = value;
		    this.updatenote(note);
		  }
	
	$scope.isArchive=function(note){
		if(note.archive==false){
			note.archive=true;
			console.log(note.archive)
			
		}
		else{
			note.archive=false;
		}
		this.updatenote(note);
		
	
	}
	
	$scope.ispin=function(note){
		console.log(note.pin)

		if(note.pin==false){
			
			note.pin=true;
			note.archive=false;
			console.log(note.pin)
			
		}
		else{
			
			note.pin=false;
		}
		this.updatenote(note);
		
	
	}
	
	var notes = document.getElementsByClassName('dashboard');
	
	$scope.show=function(notes){
		console.log("notes in dash.",notes);
		for(i=1;i<=notes.length;i++){
			if(ispin==false)
				{
				$scope.shownote=false;
				console.log("shownote:",shownote);
				}
			else{
				$scope.shownote=true;
				console.log("show:",shownote);
			}
		}
		
	}
	
	$scope.isTrash=function(note){
//		console.log("Before: ",note);
		console.log(note.trash)
		if(note.trash==false){
			note.trash=true;
			console.log(note)
		
		}
		else{
			note.trash=false;
		}
		this.updatenote(note);
		
	}

	
	$scope.updatenote = function(note){
		console.log("from update(): ",note);
		console.log("in update");		
		var url = commonUrl + "updateNote";
		console.log(url);
		userservice.putmethod(note,url).then(
				function successCallback(response) {
					
					console.log("success", response.data);
					return response.data;
					$scope.getallnotes();

				}, function errorCallback(response) {
					console.log("Error occur", response);
					return response;

				});
		
	}
	 
	 $scope.removelabelonNote=function(label,note){
			console.log("Label  in dashboard:",label);
			console.log("note  in dashboard:",note);
			console.log("noteid  in dashboard:",note.id);
		  var index=note.labelslist.findIndex(x => x.labelname===label.labelname);
	 if (index > -1) {
		 
		 note.labelslist.splice(index, 1);
	 }
	 else {
		 note.labelslist.push(label);
	 }
			 var url = commonUrl + "labeldeleteOnNote/"+note.id+"/"+label.id;
			 console.log(url);
			labelservice.labelpostmethod(url).then(
					function successCallback(response) {
						
						console.log("success", response);
						return response;

					}, function errorCallback(response) {
						console.log("Error occur", response);
						return response;

					});
		}
	
	
	
    $scope.showAlert=function(event,note){
    	 console.log("Event:",event);
    	 $mdDialog.show({
             locals:{note1 : note,sc:$scope},
             controller: dialogController1,
             templateUrl: 'templates/updatenote.html',
             parent: angular.element(document.body),
             targetEvent: event,
             clickOutsideToClose:true,
             bindToController:true
             

      });
    }
    
    
    function dialogController1($scope,note1,$mdDialog,sc) {
    	
    	  $scope.note=note1;
    	  $scope.colors = colors;
    	  $scope.cancel = function() {
    	      $mdDialog.cancel();
    	      $scope.updatenote1 = function(note){
    	  		console.log("from update(): ",note);
    	  		console.log("in update");		
    	  		var url = commonUrl + "updateNote";
    	  		userservice.putmethod(note,url).then(
    	  				function successCallback(response) {
    	  					
    	  					console.log("success", response.data);
    	  					
    	  					return response.data;

    	  				}, function errorCallback(response) {
    	  					console.log("Error occur", response);
    	  					return response;

    	  				});
    	  		
    	  	}
    	    };
    	    $scope.removeImage=function(note){
    			  console.log("Note:",note);
    			  if(note.imageUrl){
    				  console.log(note.imageUrl);
    				  note.imageUrl="";

    				  
    			  }
    			  $scope.updatenote1 = function(note){
    	    	  		console.log("from update(): ",note);
    	    	  		console.log("in update");		
    	    	  		var url = commonUrl + "updateNote";
    	    	  		userservice.putmethod(note,url).then(
    	    	  				function successCallback(response) {
    	    	  					
    	    	  					console.log("success", sc);
    	    	  					sc.getallnotes();
    	    	  					
    	    	  					return response.data;

    	    	  				}, function errorCallback(response) {
    	    	  					console.log("Error occur", response);
    	    	  					return response;

    	    	  				});
    	    	  		
    	    	  	}
    			  $scope.updatenote1(note); 
    		  }
    	    }
    
    $scope.changeColor = function(note, value) {
		  console.log("Note" + note);
		  console.log("value:",value);
	    note.color = value;
	    console.log("color:",note.color);
   	    $scope.value = value;
		    this.updatenote(note);
		  }  
    		
    $scope.toggle = function(){
       	console.log("hai");
       	$scope.showremainder=true;
       	console.log($scope.showremainder);
       }
    
    var noteobject=null;
    $scope.showAlertlabel=function(event,note){
    	noteobject=note;
    	
   	 $mdDialog.show({
            locals:{note : note},
            controller: dialogController2,
            templateUrl: 'templates/labelpopup.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose:true
            
            

     });
   }
   
    var userData = "";
    $scope.userData ="";
    function getLoginUser() {
      console.log("Inside get all Users...");
      var url = commonUrl + 'getLoginUser';
      userservice.getmethod(url).then(function successCallback(response) {
        console.log("success" + response.data);
        $scope.userData = response.data;
        userData= $scope.userData;
      }, function errorCallback(response) {
        console.log("error" + response.data);
      })

      return userData;
    }

    getLoginUser(); 
    
   function dialogController2($scope,$mdDialog) {
   	 
   	  $scope.cancel = function() {
   	      $mdDialog.cancel();
   	      
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
  		$scope.addlabelonNote=function(label){
  			console.log("Label  in dashboard:",label);
			console.log("note  in dashboard:",noteobject);
 		  var index=noteobject.labelslist.findIndex(x => x.labelname===label.labelname);
		 if (index > -1) {
       	  noteobject.labelslist.splice(index, 1);
         }
         else {
       	  noteobject.labelslist.push(label);
         }
		
			 console.log("inside if....");
			 var commonUrl = "http://localhost:8080/todo/";
  			 var url = commonUrl + "noteandlabel/"+noteobject.id+"/"+label.id;
  			 console.log("inside label.....");
  			labelservice.labelputmethod(url).then(
  					function successCallback(response) {
  						
  						console.log("success", response);
  						return response;

  					}, function errorCallback(response) {
  						console.log("Error occur", response);
  						return response;

  					});
  		
  		
  		 
   	 $scope.selected = [];

    $scope.toggle = function (item, list) {
       var idx = list.indexOf(item);
       if (idx > -1) {
         list.splice(idx, 1);
       }
       else {
         list.push(item);
       }
     };

     $scope.exists = function (item, list) {
       return list.indexOf(item) > -1;
     };
     
     
  
   
   }
   }
  
   $scope.reminders =["Today, 8:00 PM","Tomorrow, 8:00 AM","Next Week, Mon,8:00 AM "];
   
   	$scope.LaterToday=function(note){
   		console.log("In Later Today");
   		console.log(note);
   		var noteDate=new Date();
   		
   		if(noteDate .getHours()>20 && noteDate.getHours()<8)
   		{
   			noteDate.setHours(8);
   			noteDate.setMinutes(00);
   		}else if(noteDate .getHours()<20 && noteDate.getHours()>8){
   			noteDate.setHours(8);
   			noteDate.setMinutes(00);
   			}
   		note.remainder=noteDate;
   	   var list = $scope.reminders[0]; 
   			
   			console.log("index:",list);
   		
   		console.log('Note in today later',note.remainder);
   		this.updatenote(note);
   	 
	    }
   	$scope.list=[];

   	
   	$scope.formateDate=function(date){
   		console.log("Date:",date);
   	}

   	 
	$scope.Tomorrow=function(note){
		console.log("In Tomorrow");
		
		var date = new Date();
		date.setDate( date.getDate()+1 );
		date.setHours(8);
		date.setMinutes(00);
	   	note.remainder=date;
	   	note.remainder=date;
	   	
	   	console.log("note",note);
	   	this.updatenote(note);
   	}

	$scope.NextWeek=function(note){
		console.log("In nextweek");
		var date = new Date();
	    var lday = date.getDay();
		var m = 7-lday + 1; 
		
		date.setDate(date.getDate()+ m);
		
        date.setHours(8);
	   	date.setMinutes(00);
	   	note.remainder=date;
	   	
	   	console.log("note",date);
	   	this.updatenote(note);
   	}
	
	    $scope.pickdate=function(note)
	    {
          console.log(note.pickerdate);
	      var noteDate = new Date(note.pickerdate);
	      
 
	        if(noteDate.getHours() > 12){
	            console.log("entering into if....");
	            noteDate.setHours(8);
	   			noteDate.setMinutes(00);
	        }else if(noteDate.getHours() < 12) {
	            console.log("entering into else...");
	            noteDate.setHours('20');
	            noteDate.setMinutes('00');
	        }
	        note.remainder=noteDate;
	   		console.log('Note in pickerdate',note.remainder);
	   		this.updatenote(note);
	    }
  $scope.remove=function(note){
	  console.log("entering in to remove");
	  if(note.remainder){
		  console.log(note.remainder);
		  note.remainder="";
		  this.updatenote(note);
	  }
	  
  }
  $scope.gotolabelpage=function(label)
  {
     console.log("Label in send to label:",label);
     var labelid=label.id;
      $state.go('home.label',{labelid:labelid});

      $scope.getlabelonnotes(label);

  };
  $scope.getlabelonnotes = function(label)
  {
      console.log("Label id in getlabelnotes:",label.id);
      var url = commonUrl + "labelnote/"+label.id;
      labelservice.labelgetmethod(url).then(
				function successCallback(response) {
					
					console.log("success", response);
					return response;

				}, function errorCallback(response) {
					console.log("Error occur", response);
					return response;

				});
  }
  
  var noteobject=null;
  $scope.alertEvent=function(event,note){
 	 console.log("in alert event");
 	noteobject=note;
    console.log("Note:",noteobject);
 	 $mdDialog.show({
          locals:{note : note},
          controller: dialogController3,
          templateUrl: 'templates/collaborator.html',
          parent: angular.element(document.body),
          targetEvent: event,
          clickOutsideToClose:true
          

   });
 }
  
  $scope.getCollaborators={};
  $scope.getAllCollaborators =function() {

	  var commonUrl = "http://localhost:8080/todo/";
	    var url = commonUrl + "getAllCollaboratedNotes";
		console.log("URL:",url);
		userservice.getmethod(url).then(
				function successCallback(response) {
					
					$scope.getCollaborators=response.data;
					console.log('Collaborators: ', $scope.getCollaborators)
					//console.log("success", response.data);
					return response.data;

				}, function errorCallback(response) {
					console.log("Error occur", response);
					return response;

				});
	}
  $scope.getAllCollaborators();
  
  function dialogController3($scope,$mdDialog,note) {
	 
	  $scope.note = note;
	  
	  $scope.cancel = function() {
	      $mdDialog.cancel();
	     
	    };
	    var commonUrl = "http://localhost:8080/todo/";
		
		$scope.getUsers={};
		
$scope.getallUsers=function(){
	 var commonUrl = "http://localhost:8080/todo/";
	var url = commonUrl + "getallUsers";
	console.log("URL:",url);
	userservice.getmethod(url).then(
			function successCallback(response) {
				
				$scope.getUsers=response.data;
				console.log('getUsers: ', $scope.getUsers);
				//console.log("success", response.data);
				return response.data;

			}, function errorCallback(response) {
				console.log("Error occur", response);
				return response;

			});
	
}


  
  $scope.addCollaboratorOnNote=function(email){
	  
	  var userId =email[1];
		 console.log("userId:",userId);
		console.log("noteid  in dashboard:",noteobject);
	  
		 var url = commonUrl + "addCollaboratorOnNote/"+userId+"/"+noteobject.id;
		 console.log(url);
		labelservice.labelpostmethod(url).then(
				function successCallback(response) {
					
					console.log("success", response);
					//$scope.getAllCollaborators();
					return response;

				}, function errorCallback(response) {
					console.log("Error occur", response);
					return response;

				});
  
	}
  
  $scope.removeCollaboratoronNote=function(user){
		console.log("User:",user.id);
		console.log("note  in dashboard:",note);
		console.log("noteid  in dashboard:",note.id);
	 	 var url = commonUrl + "removeCollaboratorOnNote/"+user.id+"/"+note.id;
		 console.log(url);
		labelservice.labelpostmethod(url).then(
				function successCallback(response) {
					
					console.log("success", response);
					//$scope.getAllCollaborators();
					return response;

				}, function errorCallback(response) {
					console.log("Error occur", response);
					return response;

				});
	}
 

  
  
  
  }
  
  
		
		 
	  $scope.addImage=function(event,note)
	     {
	         console.log("note information",note);
	        if(event!=undefined)
	        {
	            event.stopPropagation();
	        }

	        document.addEventListener('change',function (event)
	        {
	         console.log("event",event.target.files[0]);
	            var form = new FormData();
	            form.append("file",event.target.files[0]);

	            console.log("form",form);
	            var url=commonUrl+"uploadFile";
	            console.log("url",url);
	            userservice.uploadFileToUrl(url,form).then(function successCallback(response) {
	                console.log("Success",response);
	                note.imageUrl=response.data.msg;
	                console.log(response.data.msg);
	                $scope.updatenote(note);
	               
	         }, function errorCallback(response) {
	                console.log(" Update failed",response);
	            });
	            
	        });
	    }
	  
	  
	   
});




app.filter('dateformat', function ($filter) {
	
	   return function (remiderDate) {
		   
		   console.log("inside filter", remiderDate);
		   if( !remiderDate )
		   {
			   	return;
		   }
		   
		   remiderDate = new Date( remiderDate );
		   
		   var dt = "";
		   var todatedate = new Date();
		   console.log(todatedate.getMonth(), todatedate.getDate() );
		   var ltempToday = new Date( todatedate.getFullYear(), todatedate.getMonth(), todatedate.getDate() );
		   
		   var ltempTom = new Date( todatedate.getFullYear(), todatedate.getMonth(), todatedate.getDate()+1 );
		   var ltempYes = new Date( todatedate.getFullYear(), todatedate.getMonth(), todatedate.getDate()-1 );
		   
		   var ltempRD = new Date( remiderDate.getFullYear(), remiderDate.getMonth(), remiderDate.getDate() );
		   
		   console.log(ltempRD);
		   console.log(ltempTom);
		   
		   if( (ltempToday - ltempRD) == 0  )
		   {
			   dt += "Today";
		   }
		   else if( (ltempTom - ltempRD) == 0  ) {
			   dt += "Tomorrow";
		   }
		   else if( (ltempYes - ltempRD) == 0  ) {
			   dt += "Yesterday";
		   }
		   else
		   {
			   dt = $filter('date')(remiderDate, 'MMM dd, yyyy');
			   dt = dt.replace(", "+todatedate.getFullYear(),'');
		   }
		   
		   // append time
		   var time = $filter('date')(remiderDate, 'hh:mm a');
		   dt += ", "+ time;
		  
		   return dt;
	   };
	   
	   
	   
	});


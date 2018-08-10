app.controller('dashboardController', function($scope, $state, userservice,$mdDialog,labelservice,$rootScope) {
	$scope.name='grid';
	$scope.hoverIn = function(ev) {
	    this.hoverEdit = true;
	  };

	  $scope.hoverOut = function(ev) {
	    this.hoverEdit = false;
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
			 var url = commonUrl + "deletelabel/"+note.id+"/"+label.id;
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
             locals:{note : note},
             controller: dialogController1,
             templateUrl: 'templates/updatenote.html',
             parent: angular.element(document.body),
             targetEvent: event,
             clickOutsideToClose:true
             

      });
    }
    
    
    function dialogController1($scope,note,$mdDialog) {
    	  $scope.note=note;
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
			console.log("noteid  in dashboard:",noteobject.id);
 		  var index=noteobject.labelslist.findIndex(x => x.labelname===label.labelname);
		 if (index > -1) {
       	  noteobject.labelslist.splice(index, 1);
         }
         else {
       	  noteobject.labelslist.push(label);
         }
		 if(label.labelname!=label.labelname){
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
  		
  		}
  		 
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
  
		
   	$scope.LaterToday=function(note){
   		console.log("In Later Today");
   		console.log(note);
   		var noteDate=new Date();
   		if($scope.date .getHours()>20 && $scope.date.getHours()<8)
   		{
   			noteDate.setHours(8);
   			noteDate.setMinutes(00);
   		}else if($scope.date .getHours()<20 && $scope.date.getHours()>8){
   			noteDate.setHours(8);
   			noteDate.setMinutes(00);
   			}
   		
   		note.remainder=noteDate;
   		console.log('Note in today later',note.remainder);
   		this.updatenote(note);
   	 
	    }

   	$scope.date = new Date();
   	 
	$scope.Tomorrow=function(note){
		console.log("In Tomorrow");
		
		$scope.date.setDate($scope.date.getDate()+1);
		$scope.date.setHours(8);
	   	$scope.date.setMinutes(00);
	   	note.remainder=$scope.date;
	   	console.log("note",note);
	   	this.updatenote(note);
   	}

	$scope.NextWeek=function(note){
		console.log("In nextweek");
		$scope.date = new Date();
		$scope.date.setDate($scope.date.getDate()+7);
		$scope.date.setHours(8);
	   	$scope.date.setMinutes(00);
	   	note.remainder=$scope.date;
	   	this.updatenote(note);
   	}
	
	    $scope.pickdate=function(note)
	    {
          console.log(note.pickerdate);
	      var noteDate = new Date(note.pickerdate);

	        if($scope.date.getHours() > 12){
	            console.log("entering into if....");
	            noteDate.setHours(8);
	   			noteDate.setMinutes(00);
	        }else if($scope.date.getHours() < 12) {
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
  function dialogController3($scope,$mdDialog) {
	 
	  $scope.cancel = function() {
	      $mdDialog.cancel();
	     
	    };
	    var commonUrl = "http://localhost:8080/todo/";
		$scope.createCollaborator = function() {
			console.log("ashds");
			var collaborator = {
					email : $scope.email,
					
			};
	         console.log("collaborator:",collaborator);
			var url = commonUrl + "addCollaborator";
			if(collaborator.email!=null){
				console.log("inside if...", collaborator.email)

			userservice.postmethod(collaborator, url).then(
					function successCallback(response) {

						console.log("success", response.data);
						$scope.getallCollaborators();
						return response.data;

					}, function errorCallback(response) {
						console.log("Error occur", response);
						return response;
						
					});
		}
		} 
		

		$scope.getallCollaborators =function() {

		    var url = commonUrl + "getallCollaborators";
			
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
		
		$scope.deleteCollaborator =function(collaborator){
			
			 console.log("collaborator:"+collaborator);
			 var collaboratorid=collaborator.id;
			 console.log("collaboratorid:"+collaboratorid)
			 
			 
			 var url = commonUrl + "deleteCollaborator/"+collaborator.id;
			
			
			userservice.notepostmethod(url).then(
					function successCallback(response) {
						
						console.log("success", response.data);
						return response.data;

					}, function errorCallback(response) {
						console.log("Error occur", response);
						return response;

					});
		}

  
  $scope.addCollaboratorOnNote=function(collaborator){
	  console.log("collaborator:"+collaborator);
		 var collaboratorid=collaborator.id;
		 console.log("collaboratorid:"+collaboratorid)
		console.log("noteid  in dashboard:",noteobject);
	  var index=noteobject.listofCollaborator.findIndex(x => x.email===collaborator.email);
	 if (index > -1) {
 	  noteobject.listofCollaborator.splice(index, 1);
   }
   else {
 	  noteobject.listofCollaborator.push(collaborator);
   }
		 var url = commonUrl + "noteandcollaborator/"+noteobject.id+"/"+collaborator.id;
		 console.log(url);
		labelservice.labelputmethod(url).then(
				function successCallback(response) {
					
					console.log("success", response);
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
	                $scope.updatenote = function(note){
	            		console.log("from update(): ",note);
	            		console.log("in update");		
	            		var url = commonUrl + "updateNote";
	            		console.log(url);
	            		userservice.putmethod(note,url).then(
	            				function successCallback(response) {
	            					
	            					console.log("success", response.data);
	            					return response.data;

	            				}, function errorCallback(response) {
	            					console.log("Error occur", response);
	            					return response;

	            				});
	            		
	            	}
	               
	         }, function errorCallback(response) {
	                console.log(" Update failed",response);
	            });
	            
	        });

	    }
	    
	    $scope.getallImages =function() {

		    var url = commonUrl + "/image";
			
			userservice.getmethod(url).then(
					function successCallback(response) {
						
						$scope.getimages=response.data;
						console.log('Notes: ', $scope.getnotes)
						//console.log("success", response.data);
						return response.data;

					}, function errorCallback(response) {
						console.log("Error occur", response);
						return response;

					});
		}
	 
});

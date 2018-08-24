app.controller('dashboardController', function($scope, $state,$mdPanel, userservice,$mdDialog,labelservice,$rootScope,$location) {
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
 	 
	  
 	window.onpopstate = function () {
         history.go(1);
     };
	  
	var commonUrl = "http://localhost:8080/todo/";
	$scope.createNote = function() {
		
		var note = {
				title : $scope.title,
				description : $scope.description
		};
        
		var url = commonUrl + "createNote";
		
		if(note.title != undefined && note.description != undefined||note.title != null&& note.description != undefined)
            
             {
            
		userservice.postmethod(note, url).then(
				function successCallback(response) {

					$scope.getallnotes();
					return response.data;

				}, function errorCallback(response) {
				
					return response;
					
				});
	}
	}
	
	
	
	$scope.checkIfUrl = function(note){

		   var pattern = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/gi;
		   var url = note.description.match(pattern);
          var arraylist=[];
         
           if(note.size==undefined){
              	note.size=0;
              	note.url=[];
              	 note.arraylist=[];
               }
        	  if ((url != "" && url != undefined) && note.size<url.length) {
           
            for(var i=0;i<url.length;i++){
        		note.url[i]=url[i];
        		var baseurl=commonUrl+"getUrl";
        		
        		userservice.checkingUrl(baseurl,url[i]).then(
        				function successCallback(response) {

        					 var responseData = response.data;
        					 note.scrapping=response.data;
        					 console.log(note.scrapping);
        			          arraylist[note.size] = {
        			            title: responseData.title,
        			            url: note.url[note.size],
        			            image: responseData.image,
        			            domain: responseData.domain
        			            
        			          }
        			          note.arraylist[note.size] = arraylist[note.size];
        			          note.size = note.size + 1;
        			          $scope.updatenote(note);
        				        
        				        }, function errorCallback(response) {
        				        	return response;

        				        });
        		
        	}
        }

      };
      
      $scope.getnotes=[];
	
	$scope.getallnotes =function() {

	    var url = commonUrl + "getallnotes";
		
		userservice.getmethod(url).then(
				function successCallback(response) {
					
					$scope.getnotes=response.data;
					$scope.getnotes = $scope.getCollaborators.concat($scope.getnotes);
					return response.data;

				}, function errorCallback(response) {
							return response;

				});
	}
	
	$scope.deletenote =function(note){
		
		 var noteid=note.id;
	
		 var url = commonUrl + "deleteNote/"+note.id;
		
		userservice.notepostmethod(url).then(
				function successCallback(response) {
				
					return response.data;
					$scope.getallnotes();

				}, function errorCallback(response) {
				
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
		
	    note.color = value;
	    console.log("color:",note.color);
   	    $scope.value = value;
		    this.updatenote(note);
		  }
	
	$scope.isArchive=function(note){
		if(note.archive==false){
			note.archive=true;
		
		}
		else{
			note.archive=false;
		}
		this.updatenote(note);
		
	
	}
	
	$scope.ispin=function(note){ 
		if(note.pin==false){
			
			note.pin=true;
			note.archive=false;
			
		}
		else{
			
			note.pin=false;
		}
		this.updatenote(note);
		
	
	}
	
	var notes = document.getElementsByClassName('dashboard');
	
	$scope.show=function(notes){
		
		for(i=1;i<=notes.length;i++){
			if(ispin==false)
				{
				$scope.shownote=false;
				}
			else{
				$scope.shownote=true;
			}
		}
		
	}
	
	$scope.isTrash=function(note){
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
		var url = commonUrl + "updateNote";
		userservice.putmethod(note,url).then(
				function successCallback(response) {
					return response.data;
					$scope.getallnotes();

				}, function errorCallback(response) {
					return response;

				});
		
	}
	 
	 $scope.removelabelonNote=function(label,note){
			
		  var index=note.labelslist.findIndex(x => x.labelname===label.labelname);
	 if (index > -1) {
		 
		 note.labelslist.splice(index, 1);
	 }
	 else {
		 note.labelslist.push(label);
	 }
			 var url = commonUrl + "labeldeleteOnNote/"+note.id+"/"+label.id;
			
			labelservice.labelpostmethod(url).then(
					function successCallback(response) {
					
						return response;

					}, function errorCallback(response) {
						return response;

					});
		}
	
	
	
    $scope.showAlert=function(event,note){
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
    	  		var url = commonUrl + "updateNote";
    	  		userservice.putmethod(note,url).then(
    	  				function successCallback(response) {
    	  					return response.data;

    	  				}, function errorCallback(response) {
    	  					return response;

    	  				});
    	  		
    	  	}
    	    };
    	    
    	    
    	    
    	    $scope.removeUrl = function(note){
        console.log("Inside remove url.........",note);
        if(note.scrapping){
        	
        	note.scrapping="";
        	note.arraylist="";
        	note.url="";
        }
        

        }

    	     
    	    
    	    $scope.removeImage=function(note){
    			  if(note.imageUrl){
    				  note.imageUrl="";

    				  
    			  }
    			  $scope.updatenote1 = function(note){
    	    	  				
    	    	  		var url = commonUrl + "updateNote";
    	    	  		userservice.putmethod(note,url).then(
    	    	  				function successCallback(response) {
    	    	  					
    	    	  					sc.getallnotes();
    	    	  					
    	    	  					return response.data;

    	    	  				}, function errorCallback(response) {
    	    	  					
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
    $scope.showAlertlabel = function($event, note) {
    	noteobject=note;
    	console.log("Note:",note);
        var template = this.menuTemplate;

        var position = $mdPanel.newPanelPosition()
            .relativeTo($event.target)
            .addPanelPosition(
              $mdPanel.xPosition.ALIGN_START,
              $mdPanel.yPosition.BELOW
            );

        var config = {
          attachTo: angular.element(document.body),
          controller: dialogController2,
          templateUrl: 'templates/Logout.html',
          position: position,
          panelClass: 'menu-panel-container',
          locals:{note : note,sc:$scope,user: $scope.userData},
          openFrom: $event,
          focusOnOpen: false,
          zIndex: 100,
          propagateContainerEvents: true,
          targetEvent: $event,
          clickOutsideToClose:true
        };

        $mdPanel.open(config);
      };
    

    
    
    
   function dialogController2($scope,$mdDialog,note,sc,user) {
	  
	   	$scope.user = user;
	   $scope.cancel = function() {
		      mdPanelRef && mdPanelRef.close();
		    }
	   
	   $scope.userData ={};
	   $scope.getLoginUser=function(){
	    
	     var url = commonUrl + 'getLoginUser';
	     userservice.getmethod(url).then(function successCallback(response) {
	       $scope.userData = response.data;
	     }, function errorCallback(response) {
	       return response;
	     })
	   }

	   $scope.getLoginUser();

	   
	   
	   $scope.removeCollaboratoronNote=function(user){
			
		 	 var url = commonUrl + "removeCollaboratorOnNote/"+user.id+"/"+note.id;
			labelservice.labelpostmethod(url).then(
					function successCallback(response) {
					
						$scope.getAllCollaborators();
						return response;

					}, function errorCallback(response) {
						
						return response;

					});
		}
	   
	   
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
   	$scope.isTrash=function(){
		if(note.trash==false){
			note.trash=true;
		
		}
		else{
			note.trash=false;
		}
		$scope.updatenote1 = function(note){	
	  		var url = commonUrl + "updateNote";
	  		userservice.putmethod(note,url).then(
	  				function successCallback(response) {
	  					
	  					sc.getallnotes();
	  					
	  					return response.data;

	  				}, function errorCallback(response) {
	  					return response;

	  				});
	  		
	  	}
	  $scope.updatenote1(note); 
		
	}
   	
  		
  	     
    $scope.selected = note.labelslist;
    $scope.exists = function(item, list) {
	         for (var i = 0; i < list.length; i++) {
	           var selectedobject = list[i];
	           if (selectedobject.labelname == item.labelname) {
	             return true;
	           }
	         }
	         return false;
	       };

      $scope.toggle = function(item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) {
          list.splice(idx, 1);
          $scope.removelabelonNote( label,note);
        } else {
          list.push(item);
        }
        $scope.addlabelonNote(note, item);
      };

      
      $scope.addlabelonNote = function(note, label) {

        console.log("in add method" + note.noteid);
        console.log("In addlabel" +label.id);
        var commonUrl = "http://localhost:8080/todo/";
			 var url = commonUrl + "noteandlabel/"+note.id+"/"+label.id;
			 labelservice.labelputmethod( url).then(function successCallback(response) {}, function errorCallback(response) {
          console.log("error" + response.data);
        })
      }
   	
   	
   	
   }
   
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
  
   $scope.reminders =["Today, 8:00 PM","Tomorrow, 8:00 AM","Next Week, Mon,8:00 AM "];
   
   	$scope.LaterToday=function(note){
   	console.log("inside today.");
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
   		
   		this.updatenote(note);
   	 
	    }
   	$scope.list=[];

   	
   	$scope.formateDate=function(date){
   		console.log("Date:",date);
   	}

   	 
	$scope.Tomorrow=function(note){
		
		var date = new Date();
		date.setDate( date.getDate()+1 );
		date.setHours(8);
		date.setMinutes(00);
	   	note.remainder=date;
	   	note.remainder=date;
	   	
	   	
	   	this.updatenote(note);
   	}

	$scope.NextWeek=function(note){
		
		var date = new Date();
	    var lday = date.getDay();
		var m = 7-lday + 1; 
		
		date.setDate(date.getDate()+ m);
		
        date.setHours(8);
	   	date.setMinutes(00);
	   	note.remainder=date;
	   	
	   
	   	this.updatenote(note);
   	}
	
	    $scope.pickdate=function(note)
	    {
          console.log(note.pickerdate);
	      var noteDate = new Date(note.pickerdate);
	      
 
	        if(noteDate.getHours() > 12){
	           
	            noteDate.setHours(8);
	   			noteDate.setMinutes(00);
	        }else if(noteDate.getHours() < 12) {
	            
	            noteDate.setHours('20');
	            noteDate.setMinutes('00');
	        }
	        note.remainder=noteDate;
	   		
	   		this.updatenote(note);
	    }
  $scope.remove=function(note){
	 
	  if(note.remainder){
		  console.log(note.remainder);
		  note.remainder="";
		  this.updatenote(note);
	  }
	  
  }
  $scope.gotolabelpage=function(label)
  {
     
     var labelid=label.id;
      $state.go('home.label',{labelid:labelid});

      $scope.getlabelonnotes(label);

  };
  $scope.getlabelonnotes = function(label)
  {
     
      var url = commonUrl + "labelnote/"+label.id;
      labelservice.labelgetmethod(url).then(
				function successCallback(response) {
					
					return response;

				}, function errorCallback(response) {
					
					return response;

				});
  }
  
  var noteobject=null;
  $scope.alertEvent=function(event,note){
 	 noteobject=note;
   
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
	
		userservice.getmethod(url).then(
				function successCallback(response) {
					
					$scope.getCollaborators=response.data;
					return response.data;

				}, function errorCallback(response) {
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
	userservice.getmethod(url).then(
			function successCallback(response) {
				
				$scope.getUsers=response.data;
				
				return response.data;

			}, function errorCallback(response) {
			
				return response;

			});
	
}
$scope.userData ={};
$scope.getLoginUser=function(){
 
  var url = commonUrl + 'getLoginUser';
  
  userservice.getmethod(url).then(function successCallback(response) {
    $scope.userData = response.data;
   
  }, function errorCallback(response) {
   return response;
  })
}

$scope.getLoginUser();

$scope.getCollaborators=[];
$scope.getAllCollaborators =function() {

	  var commonUrl = "http://localhost:8080/todo/";
	    var url = commonUrl + "getAllCollaboratedNotes";
		
		userservice.getmethod(url).then(
				function successCallback(response) {
					
					$scope.getCollaborators=response.data;
					return response.data;

				}, function errorCallback(response) {
					return response;

				});
	}
$scope.getAllCollaborators();
  
  $scope.addCollaboratorOnNote=function(email){
	  
	  var userId =email[1];
		
		 var url = commonUrl + "addCollaboratorOnNote/"+userId+"/"+noteobject.id;
		labelservice.labelpostmethod(url).then(
				function successCallback(response) {
				
					$scope.getAllCollaborators();
					return response;

				}, function errorCallback(response) {
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
					$scope.getAllCollaborators();
					return response;

				}, function errorCallback(response) {
					console.log("Error occur", response);
					return response;

				});
	}
 

  
  
  
  }
  
  
		
		 
	  $scope.addImage=function(event,note)
	     {
	        if(event!=undefined)
	        {
	            event.stopPropagation();
	        }

	        document.addEventListener('change',function (event)
	        {
	         
	            var form = new FormData();
	            form.append("file",event.target.files[0]);

	            var url=commonUrl+"uploadFile";
	           
	            userservice.uploadFileToUrl(url,form).then(function successCallback(response) {
	                 note.imageUrl=response.data.msg;
	                $scope.updatenote(note);
	               
	         }, function errorCallback(response) {
	               return response;
	            });
	            
	        });
	    }
	  
	  
	   
});




app.filter('dateformat', function ($filter) {
	
	   return function (remiderDate) {
		  
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


app.controller('dashboardController', function($scope, $state, userservice,$mdDialog,labelservice) {
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
    		
 
    $scope.afterdate = function(){
    	$scope.showdate=true;
    	console.log($scope.showdate);
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
  		
  		$scope.addandremovelabelonNote=function(label){
  			console.log("Label  in dashboard:",label);
			console.log("note  in dashboard:",noteobject);
			console.log("noteid  in dashboard:",noteobject.id);
  		  /*var index=note.labelslist.findIndex(x => x.labelname===label.labelname);
  		console.log("Label  in dashboard:",label);
			console.log("note  in dashboard:",noteobject);
			console.log("noteid  in dashboard:",noteobject.id);
			
          if (index > -1) {
              note.labelslist.splice(index, 1);
          }
          else {
              note.labelslist.push(label);
          }*/
  			 var url = commonUrl + "noteandlabel/"+noteobject.id+"/"+label.id;
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
	
	$scope.pickDate=function(note)
    {
		
		
		console.log($scope.myDate);
       note.remainder=$scope.myDate;
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
  /*$scope.today=new Date();
  console.log("today",$scope.today);

   $scope.ReminderDate=function(note)
   {

     var myDate = new Date(note.remainder);

       if($scope.today.getHours() > 12){
           console.log("in date picker");
           myDate.setHours(note.remindertime.split(':')[0]);
           myDate.setMinutes(note.remindertime.split(':')[1].split(' ')[0]);
       }else if($scope.today.getHours() < 12) {
          
           myDate.setHours('20');
           myDate.setMinutes('00');
       }



           myDate.setHours(note.remindertime.split(':')[0]);
     myDate.setMinutes(note.remindertime.split(':')[1].split(' ')[0]);



           console.log("myDate with time",myDate+note.remindertime.split(':')[1].split(' ')[1]);

     note.reminderDate=myDate;

     updatenote(note)

   };*/

});

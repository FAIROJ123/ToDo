app.service('userservice', function($http, $state) {

	var service = [];
	
	service.postmethod=function(data,url){
		console.log("data : ",data)
		
		return $http({
		method:'POST',
		url   :url,
		data: data,
		headers:{
			'ID':localStorage.getItem('token')
		}
		
		});	
	}
	service.getmethod=function(url){
		return $http({
			method:'GET',
			url:url,
			headers:{
				'ID':localStorage.getItem('token')
			}
		});
	}
	service.labelpostmethod=function(url){
		return $http({
			method:'POST',
			url:url,
			headers:{
				'ID':localStorage.getItem('token')
			}
		});
	}
	
	service.putmethod=function(data,url){
		console.log("data : ",data)
		return $http({
			method:'PUT',
			url:url,
			data:data,
			headers:{
				'ID':localStorage.getItem('token')
			}
		});
	}
	
	service.notepostmethod=function(url){
		return $http({
		method:'POST',
		url   :url,
		
		headers:{
			'ID':localStorage.getItem('token')
		}
		
		});	
	}
	    
	    service.uploadFileToUrl=function(url,data){
			return $http({
			method:'POST',
			url   :url,
			headers: {'Content-Type': undefined},
			data:data
			
			});	
		}
	
	return service;
	

});

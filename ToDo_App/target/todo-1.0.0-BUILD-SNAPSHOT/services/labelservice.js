app.service('labelservice', function($http, $state) {

	var service = [];
	
	
	service.labelputmethod=function(url){
		return $http({
			method:'PUT',
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
	service.labelgetmethod=function(url){
		return $http({
			method:'GET',
			url:url,
			headers:{
				'ID':localStorage.getItem('token')
			}
		});
	}
	
	return service;
	

});

app.service('labelservice', function($http, $state) {

	var service = [];
	
	
	service.labelpostmethod=function(url){
		return $http({
			method:'PUT',
			url:url,
			headers:{
				'ID':localStorage.getItem('token')
			}
		});
	}
	
	
	
	return service;
	

});

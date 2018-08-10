var app = angular.module('routerApp', ['ngMaterial', 'ui.router', 'content-editable','ngSanitize']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('register', {
      url: '/register',
      templateUrl: 'templates/Registration.html',
      controller: 'userCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/Login.html',
      controller: 'userCtrl'

    })
    .state('home',{
    	url  :'/home',
    	templateUrl : 'templates/home.html',
    	controller : 'homeController'
    })
 .state('home.dashboard',{
           url: '/dashboard',
           templateUrl: 'templates/dashboard.html',
           controller :'dashboardController'
})
.state('home.labelsdashboard',{
           url: '/labelsdashboard/:label',
           templateUrl: 'templates/labelsdashboard.html',
           controller :'dashboardController'
})
.state('home.trash',{
	url:'/trash',
	 templateUrl: 'templates/Trashnote.html',
	 controller :'dashboardController'
})
.state('home.archive',{
	url:'/archive',
	 templateUrl: 'templates/Archive.html',
	 controller :'dashboardController'
})
.state('home.remainders',{
	url:'/remainders',
	 templateUrl: 'templates/Remainders.html',
	 controller :'dashboardController'
})

    .state('forgetpassword', {
      url: '/forgetpassword',
      templateUrl: 'templates/Forgetpassword.html',
      controller: 'userCtrl'
    })
    .state('reset', {
      url: '/reset',
      templateUrl: 'templates/Reset.html',
      controller: 'userCtrl'
    });
  
	  
 

  $urlRouterProvider.otherwise("/login");
});



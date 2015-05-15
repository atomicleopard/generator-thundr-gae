angular
.module("app", [
	"ui.bootstrap",
	"ui.router",
])
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
	    .state('home', {
	    	url: "/",
	    	templateUrl: "/static/templates/home.html"
	    })
})
	

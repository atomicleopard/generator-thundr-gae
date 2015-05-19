angular.module("app", [
    "ngAnimate",
    "angularMoment",
	"ui.bootstrap",
	"ui.router",
	"LocalStorageModule",
	'angulartics', 
	'angulartics.google.analytics'
])
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
	    .state('home', {
	    	url: "/",
	    	templateUrl: "/static/templates/home.html"
	    });
});
	

angular.module("app", [
    "ngAnimate",
    "angularMoment",
	"ui.bootstrap",
	"ui.router",
	"LocalStorageModule",
	'angulartics', 
	'angulartics.google.analytics'
])
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

    disableInternetExplorerAjaxGetCaching();

    $urlRouterProvider.otherwise("/");
    $stateProvider
	    .state('home', {
	    	url: "/",
	    	templateUrl: "/static/templates/home.html"
	    });

    function disableInternetExplorerAjaxGetCaching() {
        // Initialize http get header defaults if required
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }

        // Disable IE ajax request caching
        $httpProvider.defaults.headers.get['If-Modified-Since'] = 0;
    }

});
	


angular
.module( "atest", [ "ngRoute", "ui.bootstrap"] )
.config(
	function( $routeProvider )
	{
		$routeProvider
			.when(
				"/start",
				{
					templateUrl : "views/start.html",
					controller : "startController",
				}
			)
			.when(
				"/test",
				{
					templateUrl : "views/test.html",
				}
			)
			.otherwise(
				{
					redirectTo : "/start"
				}
			);
	}
)
.value(
	"config",
	{
        appid: "atest"
	}
)

.run(
	function( $rootScope )
	{
		$rootScope.$on(
			'$routeChangeSuccess',
			function( e, current, pre )
			{
				console.log( "->" + current.$$route.originalPath );
			}
		);
	}
)

.run(
	[
		'$rootScope', '$location', '$routeParams',
		function( $rootScope, $location, $routeParams )
		{
			$rootScope.$on(
				'$routeChangeSuccess',
				function( e, current, pre )
				{
					console.log('Current route name: ' + $location.path());
					// Get all URL parameter
					console.log($routeParams);
				}
			);
		}
	]
);

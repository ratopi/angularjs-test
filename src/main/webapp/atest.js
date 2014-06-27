
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
;

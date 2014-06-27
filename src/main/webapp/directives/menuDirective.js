
( function()
{

var refreshMenu;

angular
.module( "atest" )
.directive(
	"menuDirective",
	[
		"menuService", "$route",
		function ( menuService, $route )
		{
			var o =
			{
				restrict: "EA",

				replace: true,

				templateUrl: 'directives/menuDirective.html',

				scope:
					{
					},

				controller:
					function( $scope )
					{
						var path = $route.current.$$route.originalPath;

						var items = [];

						_.each(
							menuService.getItems(),
							function( item )
							{
								var newItem = {
									id: item.id,
									label: item.label,
									selected: path === item.id
								};

								items.push( newItem );

								console.log( newItem );
							}
						);

						$scope.items = items;

						refreshMenu = function( selectedPath )
						{
							_.each(
								items,
								function( item ) {
									item.selected = item.id === selectedPath;
								}
							);
						};
					},
			};

			return o;
		}
	]
)
.run(
	function( $rootScope )
	{
		$rootScope.$on(
			'$routeChangeSuccess',
			function( e, current, pre )
			{
				refreshMenu( current.$$route.originalPath );
			}
		);
	}
)
;

} )();

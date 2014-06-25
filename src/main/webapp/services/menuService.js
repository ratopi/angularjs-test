
angular
.module( "atest" )
.service(
	"menuService",
	[
		"$route",
		function ( $route )
		{
			var o = {};

			o.getItems =
				function()
				{
					var path = $route.current.$$route.originalPath;

					console.log( path );

					var o = [
						{ "id": "/start", "label": "Start" },
						{ "id": "/test", "label": "Test" },
						{ "id": "/test1", "label": "Dies" },
						{ "id": "/test2", "label": "UND" },
						{ "id": "/test3", "label": "Das?" },
					];

					return o;
				};

			return o;
		}
	]
);

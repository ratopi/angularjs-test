
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

					var o = [
						{ "id": "/start", "label": "Start" },
						{ "id": "/test", "label": "Test" },
						{ "id": "/todo", "label": "Todo" },
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


angular
.module( "atest" )
.controller(
	"todoController",
	[
		"$scope", "todoService",
		function ( $scope, todoService )
		{
			$scope.current = {};

			var update =
				function()
				{
					$scope.error = null;

					todoService.getTodos(
						function( todos )
						{
							$scope.todos = [];
							_.each(
								todos,
								function( o )
								{
									$scope.todos.push( o.doc );
								}
							);
							$scope.$apply();
						},
						function ( error )
						{
							console.log( "ERROR" );
							console.log( error );
							$scope.error = error;
						}
					);
				};

			// ---

			$scope.save =
				function()
				{
					var callback = function ( err, result )
					{
						$scope.current = {};
						update();
					};

					if ( $scope.current._id )
					{
						todoService.updateTodo( $scope.current._id, $scope.current.text, callback );
					}
					else
					{
						todoService.addTodo( $scope.current.text, callback );
					}
				};

			$scope.new =
				function()
				{
					$scope.current = {};
					update();
				};

			$scope.select =
				function( todo )
				{
					$scope.current = todo;
					update();
				};

			update();
		}
	]
);

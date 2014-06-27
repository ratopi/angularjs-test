
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
					if ( $scope.current._id )
					{
                        todoService.updateTodo( $scope.current._id, $scope.current.text );
					}
                    else
                    {
						todoService.addTodo( $scope.current.text );
                    }

					$scope.current = {};
					update();
				};

			$scope.new =
				function()
				{
					$scope.current = {};
				};

			$scope.select =
				function( todo )
				{
					$scope.current = todo;
				};

			update();
		}
	]
);

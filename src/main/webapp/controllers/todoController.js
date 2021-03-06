
angular
.module( "atest" )
.controller(
	"todoController",
	[
		"$scope", "todoService",
		function ( $scope, todoService )
		{
			$scope.current = {};

			// ---

			var standardCallback = function ( err, result )
			{
				$scope.current = {};
				update();
			};

			// ---

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
						todoService
							.updateTodo( $scope.current )
							.then( standardCallback );
					}
					else
					{
						todoService
							.addTodo( $scope.current.text )
							.then( standardCallback );
					}
				};

			$scope.new =
				function()
				{
					$scope.current = {};
					update();
				};

			// ---

			$scope.select =
				function( todo )
				{
					$scope.current = todo;
					update();
				};

			$scope.delete =
				function( todo )
				{
					todoService
						.deleteTodo( todo )
						.then( standardCallback );
				};

			$scope.toggleCompleted =
				function( todo )
				{
					todo.completed = ! todo.completed;
					todoService
						.updateTodo( todo )
						.then( standardCallback );
				};

			// ---

			update();
		}
	]
);

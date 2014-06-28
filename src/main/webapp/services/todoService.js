
angular
.module( "atest" )
.service(
	"todoService",
	[
		"pouchService",
		function ( pouchService )
		{
			var db = pouchService;

			// ---

			var interface = {};

			// ---

			interface.addTodo = function( text )
			{
				var todo = {
					added: new Date().toISOString(),
					text: text,
					completed: false
				};

				return db.post( todo );
			};

			// ---

			interface.updateTodo = function( todo )
			{
				return db.put(
					{
						_id: todo._id,
						_rev: todo._rev,
						text: todo.text,
						completed: todo.completed,
					}
				);
			};

			// ---

			interface.deleteTodo = function( todo )
			{
				return db.remove( todo );
			};

			// ---

			interface.getTodos = function( success, error )
			{
				db.allDocs(
					{ include_docs: true, descending: true },
					function( err, doc )
					{
						if ( err )
						{
							if ( error ) error( err );
						}
						else
						{
							success( doc.rows );
						}
					}
				);
			};

			// ---

			return interface;
		}
	]
);

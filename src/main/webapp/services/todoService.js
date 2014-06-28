
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

			interface.addTodo = function( text, callback )
			{
				var todo = {
					_id: new Date().toISOString(),
					text: text,
					completed: false
				};

				db.put( todo, callback );
			};

			// ---

			interface.updateTodo = function( id, text, callback )
			{
				db.get(
					id,
					function ( err, oldDoc )
					{
						db.put(
							{
								_id: id,
								_rev: oldDoc._rev,
								text: text
							},
							callback
						);
					}
				);
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

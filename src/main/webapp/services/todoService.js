
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
					_id: new Date().toISOString(),
					text: text,
					completed: false
				};

				db.put(
					todo,
					function callback( err, result )
					{
						if ( ! err )
						{
							// console.log( 'Successfully posted a todo!' );
						}
					}
				);
			};

			// ---

			interface.updateTodo = function( id, text )
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
							function(err, response)
							{
							}
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

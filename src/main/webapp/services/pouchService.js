
angular
.module( "atest" )
.service(
	"pouchService",
	[
		function ()
		{
			console.log( "pouchService starting ..." );

			var db = new PouchDB( 'atest' );
			var remoteCouch = false;

			return db;
		}
	]
);

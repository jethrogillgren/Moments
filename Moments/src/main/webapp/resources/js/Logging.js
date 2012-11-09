var logLevel = "1";
//1 TRACE
//2 DEBUG
//3 INFO
//4 ERROR


function TRACE( Str, Obj ) {
	
	if ( logLevel < 2 ) {
		console.log( "TRACE   " + Str );
		if( Obj )
			console.dir( Obj );
	}
}

function DEBUG( Str, Obj ) {
	
	if ( logLevel < 3 ) {
		console.info( "DEBUG   " + Str );
		if( Obj )
			console.info( Obj );
	}
}

function INFO( Str, Obj ) {
	
	if ( logLevel < 4 ) {
		console.warn( "INFO    " + Str );
		if( Obj )
			console.warn( Obj );
	}
}

function ERROR( Str, Obj ) {
	
	console.error( "\nERROR   " + Str );
	if( Obj )
		console.error( Obj );
	
	console.log("\n");
}

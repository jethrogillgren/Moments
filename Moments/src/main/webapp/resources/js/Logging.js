var logLevel = "1";
//1 TRACE
//2 DEBUG
//3 INFO
//4 ERROR


function TRACE( Str, Obj ) {
	
	if ( logLevel < 2 ) {
		console.log( "TRACE   " + Str );
		if( Obj )
			console.log( Obj );
	}
}

function DEBUG( Str, Obj ) {
	
	if ( logLevel < 3 ) {
		console.log( "DEBUG   " + Str );
		if( Obj )
			console.log( Obj );
	}
}

function INFO( Str, Obj ) {
	
	if ( logLevel < 4 ) {
		console.log( "INFO    " + Str );
		if( Obj )
			console.log( Obj );
	}
}

function ERROR( Str, Obj ) {
	
	console.log( "\nERROR   " + Str );
	if( Obj )
		console.log( Obj );
	
	console.log("\n");
}

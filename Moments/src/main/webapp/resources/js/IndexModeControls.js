//Index Mode Controls
var IndexModeControls = function ( camera ) {
	TRACE("IndexModeControls Created");
	
	var controllsEnabled = false;
	
	var posObject = new THREE.Object3D();
	posObject.add( camera );
	
	
	//Public access to the Camera Objects
	this.getObject = function () {
		return posObject;
	};
	
	this.enableControls = function() {
		
		controllsEnabled = true;
		
		posObject.position = controlsLastPosition;
		posObject.rotation = controlsLastRotation;
		
		INFO( "Enabled IndexModeControls: ", posObject );
	};
	
	this.disableControls = function() {
		
		controllsEnabled = false;
		
		//controlsLastPosition = posObject.position;
		//controlsLastRotation = posObject.rotation;
		
		DEBUG( "Disabled IndexModeControls" );
	};
	
	this.update = function ( delta ) {
		
		if ( controllsEnabled != true ) return;

	};

};
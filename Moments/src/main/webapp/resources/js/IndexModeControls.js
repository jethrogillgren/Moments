//Index Mode Controls
var IndexModeControls = function ( camera ) {
	TRACE("IndexModeControls Created");
	
	var controllsEnabled = false;
	
	//Public access to the Camera Objects
	this.getObject = function () {
		return yawObject;
	};
	
	this.enableControls = function() {
		
		controllsEnabled = true;
		
		INFO( "Enabled IndexModeControls: ", yawObject );
	};
	
	this.disableControls = function() {
		
		controllsEnabled = false;
		
		DEBUG( "Disabled IndexModeControls" );
	};
	
	this.update = function ( delta ) {
		
		if ( controllsEnabled != true ) return;

	};

};
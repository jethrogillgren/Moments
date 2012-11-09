//FUnctions to create and delete Dat Gui Instances.  These are the control boxes used for repositioning a photo

var datGui;

function removeDatGui() {
	
	if( datGui!= null )
		datGui.destroy();
		datGui = null;
}

//Called when a user clicks a Photo, and deletes/updates the datGui Control Tab
//DatGUI handles any property changes and passes them to updatePhoto.
//TODO Refactor out the bug stopping datGUI controlling the THREE.Vector3 instances
function openDatGuiForPhoto( photo ) {
	TRACE( 'Opening Dat GUI for Photo: ', photo );
	
	datGui = new dat.GUI();
	
	var title = datGui.add( photo, 'Title' );
	title.onFinishChange(function(value) {
		updatePhoto( photo );
	});
	
	var caption = datGui.add( photo, 'Caption' );
	caption.onFinishChange(function(value) {
		updatePhoto( photo );
	});
	
	var positionMin = -1000;
	var positionMax = 1000;
	var positionStep = 0.1;
	
	photo.XPosition = parseAndRoundFloat( photo.position.x );
	var positionX = datGui.add( photo, 'XPosition' ).min(positionMin).max(positionMax).step(positionStep);
	positionX.onChange(function(value) {
		value =  parseAndRoundFloat( value );
		photo.position.setX(value); //Workaround
		photo.XPosition = value;
	});
	positionX.onFinishChange(function(value) {
		value =  parseAndRoundFloat( value );
		photo.position.setX( value );
		photo.XPosition = value;
		updatePhoto( photo );
	});
	
	photo.YPosition = parseAndRoundFloat( photo.position.y );
	var positionY = datGui.add( photo, 'YPosition' ).min(positionMin).max(positionMax).step(positionStep);
	positionY.onChange(function(value) {
		value =  parseAndRoundFloat( value );
		photo.position.setY( value ); //Workaround
		photo.YPosition = value;
	});
	positionY.onFinishChange(function(value) {
		value =  parseAndRoundFloat( value );
		photo.position.setY( value );
		updatePhoto( photo );
	});
	
	photo.ZPosition = parseAndRoundFloat( photo.position.z );
	var positionZ = datGui.add( photo, 'ZPosition' ).min(positionMin).max(positionMax).step(positionStep);
	positionZ.onChange(function(value) {
		value =  parseAndRoundFloat( value );
		photo.position.setZ( value ); //Workaround
		photo.ZPosition = value;
	});
	positionZ.onFinishChange(function(value) {
		value =  parseAndRoundFloat( value );
		photo.position.setZ( value );
		updatePhoto( photo );
	});
	
	var rotationMin = -3.14;
	var rotationMax = 3.14;
	var rotationStep = 0.01;
	
	photo.XRotation = parseAndRoundFloat( photo.rotation.x );
	var rotationX = datGui.add( photo, 'XRotation' ).min(rotationMin).max(rotationMax).step(rotationStep);
	rotationX.onChange(function(value) {
		value =  parseAndRoundFloat( value );
		photo.rotation.setX( value ); //Workaround
		photo.XRotation = value;
	});
	rotationX.onFinishChange(function(value) {
		value =  parseAndRoundFloat( value );
		photo.rotation.setX( value );
		updatePhoto( photo );
	});
	
	photo.YRotation = parseAndRoundFloat( photo.rotation.y );
	var rotationY = datGui.add( photo, 'YRotation' ).min(rotationMin).max(rotationMax).step(rotationStep);
	rotationY.onChange(function(value) {
		value =  parseAndRoundFloat( value );
		photo.rotation.setY( value ); //Workaround
		photo.YRotation = value;
	});
	rotationY.onFinishChange(function(value) {
		value =  parseAndRoundFloat( value );
		photo.rotation.setY( value );
		updatePhoto( photo );
	});
	
	photo.ZRotation = parseAndRoundFloat( photo.rotation.z );
	var rotationZ = datGui.add( photo, 'ZRotation' ).min(rotationMin).max(rotationMax).step(rotationStep);
	rotationZ.onChange(function(value) {
		value =  parseAndRoundFloat( value );
		photo.rotation.setZ( value ); //Workaround
		photo.ZRotation = value;
	});
	rotationZ.onFinishChange(function(value) {
		value =  parseAndRoundFloat( value );
		photo.rotation.setZ( value );
		updatePhoto( photo );
	});
	
	photo.Scale = parseAndRoundFloat( photo.scale.x );
	var scale = datGui.add( photo, 'Scale' ).min(0.5).max(3).step(0.01);
	scale.onChange(function(value) {
		value =  parseAndRoundFloat( value );
		photo.scale.setX( value ); //Workaround
		photo.scale.setY( value ); //Workaround
		photo.scale.setZ( value ); //Workaround
		photo.Scale = value;
	});
	scale.onFinishChange(function(value) {
		value =  parseAndRoundFloat( value );
		photo.scale.setX( value ); //Workaround
		photo.scale.setY( value ); //Workaround
		photo.scale.setZ( value ); //Workaround
		updatePhoto( photo );
	});
	
	// Iterate over all controllers and set update initial values
  	for (var i in datGui.__controllers) {
   		datGui.__controllers[i].updateDisplay();
  }
}

function parseAndRoundFloat( num ) {
	var result = Math.round(num*Math.pow(10,2))/Math.pow(10,2);
	return result;
}
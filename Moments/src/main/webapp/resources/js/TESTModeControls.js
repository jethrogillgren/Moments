
var TestModeControls = function ( camera, newTargetPhoto ) {
	console.log("TestModeControls");
	
	var controllsEnabled = false;
	
	var posObject = new THREE.Object3D();
	//camera.position = new THREE.Vector3( 0, 0, 0 );
	//camera.rotation = new THREE.Vector3( 0, 0, 0 );
	posObject.add( camera );
	logObj("Set TestModeControls posObject to:", posObject);
	
	var targetPhoto = newTargetPhoto;
	logObj("Set TestModeControls Target Photo to:", targetPhoto);
	
	var positionTween;
	var rotationTween;
	
	var mouseX = 0, mouseY = 0;
	
	//Public access to the Camera Objects
	this.getObject = function () {
		return posObject;
	};
	
	
	this.enableControls = function() {
		console.log( "Enabling TestModeControls" );
		
		posObject.position = controlsLastPosition;
		posObject.rotation = controlsLastRotation;
		
		controllsEnabled = true;
		
		logObj( "Test Camera Object: ", posObject );
		
		console.log( "Moving to X Position: ", targetPhoto.position.x );
		console.log( "Moving to Y Position: ", targetPhoto.position.y );
		console.log( "Moving to Z Position: ", targetPhoto.position.z );
		
		positionTween = new TweenLite(posObject.position, 2, {
			x:targetPhoto.position.x,
			y:targetPhoto.position.y,
			z:targetPhoto.position.z,
			
			ease:Power2.easeOut,
			onComplete:TweenComplete
		});
		rotationTween = new TweenLite(posObject.rotation, 2, {
			x:targetPhoto.rotation.x,
			y:targetPhoto.rotation.y,
			z:targetPhoto.rotation.z,
			
			ease:Power2.easeOut,
			onComplete:TweenComplete
		});
		
		document.addEventListener( 'mousemove', photoModeMouseMove, false );
		document.addEventListener( 'click', PhotoModeClickHandler, false );
		
	};
	this.disableControls = function() {
		console.log( "Disabling TestModeControls" );
		
		controlsLastPosition = posObject.position.addSelf( posObject.children[0].position );
		controlsLastRotation = posObject.rotation.addSelf( posObject.children[0].rotation );
		
		controllsEnabled = false;
		
		document.removeEventListener( 'mousemove', photoModeMouseMove, false );
		document.removeEventListener( 'click', PhotoModeClickHandler, false );
	};
	
	function photoModeMouseMove( event ) {
		mouseX = event.clientX - windowHalfX;
		mouseY = event.clientY - windowHalfY;
		
		mouseX = mouseX/7;
		mouseY = mouseY/7;
	}
	function PhotoModeClickHandler( event ) {
		
		event.preventDefault();
		if ( controllsEnabled != true ) return;
		
		console.log( "PhotoModeControls.onMouseClick" );
		
		var DatGuiHeight = $(".dg.main.a").height() + 25;
		var DatGuiWidth = $(".dg.main.a").width() + 20;
		
		if( event.clientX > window.innerWidth - DatGuiWidth  &&  event.clientY < DatGuiHeight ) {
			console.log( "DAT GUI Clicked" );
		} else {
			console.log( "Other Clicked" );
			//enterFreeMode();
		}
		
		console.log( "mouseX: " + event.clientX + "  mouseY: " + event.clientY);
		
		
	};
	
	
	function TweenComplete() {
		logObj( "Tween Complete: ", posObject );
	
	}
	

	this.update = function ( delta ) {
		
		if ( controllsEnabled != true ) return;
		
		var cameraRef = posObject.children[0];
		
		cameraRef.position.x += ( mouseX - cameraRef.position.x ) * .05;
		cameraRef.position.y += ( - mouseY - cameraRef.position.y ) * .05;
		
		cameraRef.position.z = 300;
		
		cameraRef.lookAt( targetPhoto.position );
	};

};
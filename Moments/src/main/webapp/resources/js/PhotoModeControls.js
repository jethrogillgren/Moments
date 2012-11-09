
var PhotoModeControls = function ( camera, newTargetPhoto ) {
	TRACE("PhotoModeControls Created");
	
	var controllsEnabled = false;
	
	var posObject = new THREE.Object3D();
	//camera.position = new THREE.Vector3( 0, 0, 0 );
	//camera.rotation = new THREE.Vector3( 0, 0, 0 );
	posObject.add( camera );
	TRACE("Set PhotoModeControls posObject to:", posObject);
	
	var targetPhoto = newTargetPhoto;
	TRACE("Set PhotoModeControls Target Photo to:", targetPhoto);
	
	var positionTween;
	var rotationTween;
	
	var mouseX = 0, mouseY = 0;
	
	//Public access to the Camera Objects
	this.getObject = function () {
		return posObject;
	};
	
	
	this.enableControls = function() {
		
		
		posObject.position = controlsLastPosition;
		posObject.rotation = controlsLastRotation;
		
		controllsEnabled = true;
		
		TRACE( "Photo Camera Object: ", posObject );
		/*
		console.log( "Moving to X Position: ", targetPhoto.position.x );
		console.log( "Moving to Y Position: ", targetPhoto.position.y );
		console.log( "Moving to Z Position: ", targetPhoto.position.z );
		
		positionTween = new TweenLite(posObject.position, 2, {
			x:targetPhoto.position.x,
			y:targetPhoto.position.y,
			z:targetPhoto.position.z,
			
			ease:Power4.easeOut,
			onComplete:TweenComplete
		});
		rotationTween = new TweenLite(posObject.rotation, 2, {
			x:targetPhoto.rotation.x,
			y:targetPhoto.rotation.y,
			z:targetPhoto.rotation.z,
			
			ease:Power4.easeOut,
			onComplete:TweenComplete
		});
		
		document.addEventListener( 'mousemove', photoModeMouseMove, false );
		document.addEventListener( 'click', PhotoModeClickHandler, false );
		*/
		openDatGuiForPhoto( targetPhoto )
		
		INFO( "Enabled PhotoModeControls: ", posObject );
	};
	this.disableControls = function() {
		
		controlsLastPosition = posObject.position.addSelf( posObject.children[0].position );
		controlsLastRotation = posObject.rotation.addSelf( posObject.children[0].rotation );
		
		controllsEnabled = false;
		
		positionTween.kill();
		rotationTween.kill();
		
		document.removeEventListener( 'mousemove', photoModeMouseMove, false );
		document.removeEventListener( 'click', PhotoModeClickHandler, false );
		
		removeDatGui();
		DEBUG( "Disabled PhotoModeControls" );
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
		
		DEBUG( "PhotoModeControls.onMouseClick:", event );
		
		var DatGuiHeight = $(".dg.main.a").height();
		var DatGuiWidth = $(".dg.main.a").width() + 20;
		
		if( event.clientX > window.innerWidth - DatGuiWidth  &&  event.clientY < DatGuiHeight ) {
			TRACE( "DAT GUI Clicked" );
		} else {
			enterFreeMode();
		}
		
		TRACE( "mouseX: " + event.clientX + "  mouseY: " + event.clientY);
		
		
	};
	
	
	function TweenComplete() {
		DEBUG( "Tween Completed on posObject: ", posObject );
	
	}
	

	this.update = function ( delta ) {
		/*
		if ( controllsEnabled != true ) return;
		
		var cameraRef = posObject.children[0];
		
		cameraRef.position.x += ( mouseX - cameraRef.position.x ) * .05;
		cameraRef.position.y += ( - mouseY - cameraRef.position.y ) * .05;
		
		cameraRef.position.z = 600;
		
		cameraRef.lookAt( targetPhoto.position );*/
	};

};
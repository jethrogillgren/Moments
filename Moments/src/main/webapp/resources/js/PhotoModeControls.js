//These controls zoom the Control Objects to the target photo, and move the camera object itself depending on mouse move.
//Returns camera object back to 000, 000 when disabled.

var PhotoModeControls = function ( camera, newTargetPhoto ) {
	TRACE("PhotoModeControls Created");
	
	var controllsEnabled = false;
	
	var targetPhoto = newTargetPhoto;
	TRACE("Set PhotoModeControls Target Photo to:", targetPhoto);
	
	var positionTween;
	var yawTween;
	var pitchTween;
	var tweenState = "Inactive";
	
	var cameraDisabledTween; //USed when we disable these controls.  Puts the control objects in a nice position
	var positionCamTween;
	var rotationCamTween;
	
	
	var mouseX = 0, mouseY = 0;
	
	//Public access to the Camera Objects
	this.getObject = function () {
		return yawObject;
	};
	
	
	this.enableControls = function() {
		
		controllsEnabled = true;
		
		TRACE( "Photo Camera Object: ", yawObject );
		
		//TRACE( "Moving to X Position: ", targetPhoto.position.x );
		//TRACE( "Moving to Y Position: ", targetPhoto.position.y );
		//TRACE( "Moving to Z Position: ", targetPhoto.position.z );
		
		
		
		
		/*
		targetPhoto.updateMatrixWorld();
		targetPhoto.updateMatrix();
		yawObject.updateMatrixWorld();
		yawObject.updateMatrix();
		pitchObject.updateMatrixWorld();
		pitchObject.updateMatrix();*/
		
		INFO( "Target Photo rotation: ", targetPhoto.rotation );
		INFO( "yawObject rotation: ", yawObject.rotation );
		INFO( "pitchObject rotation: ", pitchObject.rotation );
		
		//yawObject.rotation = targetPhoto.rotation.clone();
		//yawObject.position = targetPhoto.position.clone();
		
		
		
		tweenState = "Active";
		positionTween = new TweenLite(yawObject.position, 2, {
			x:targetPhoto.position.x,
			y:targetPhoto.position.y,
			z:targetPhoto.position.z,
			
			ease:Power4.easeOut,
			onComplete:TweenComplete
		});
		yawTween = new TweenLite(yawObject.rotation, 1, {
			y:targetPhoto.rotation.y,
			
			ease:Power4.easeOut,
			onComplete:TweenComplete
		});
		pitchTween = new TweenLite(pitchObject.rotation, 1, {
			x:targetPhoto.rotation.x,
			
			ease:Power4.easeOut,
			onComplete:TweenComplete
		});
		
		document.addEventListener( 'mousemove', photoModeMouseMove, false );
		document.addEventListener( 'click', PhotoModeClickHandler, false );
		
		
		openDatGuiForPhoto( targetPhoto )
		
		INFO( "Enabled PhotoModeControls: ", yawObject );
	};
	this.disableControls = function() {
		
		controllsEnabled = false;
		
		//If we were still tweening in, cancel!
		positionTween.kill();
		yawTween.kill();
		pitchTween.kill();
		tweenState = "Inactive";
		
		
		//Move the Control object by a vector of the cameras local position
		cameraDisabledTween = new TweenLite(yawObject.position, 0.5, {
			x:camera.position.x,
			y:camera.position.y,
			z:camera.position.z,
			
			ease:Power4.easeOut,
			onComplete:TweenComplete
		});
		
		//Tween the camera back to 000, 000
		positionCamTween = new TweenLite(camera.position, 0.5, {
			x:0, y:0, z:0,
			
			ease:Power4.easeOut,
			onComplete:TweenComplete
		});
		rotationCamTween = new TweenLite(camera.rotation, 0.5, {
			x:0, y:0, z:0,
			
			ease:Power4.easeOut,
			onComplete:TweenComplete
		});
		
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
		TRACE( "Tween Completed " );
		tweenState = "Completed";
	}
	

	this.update = function ( delta ) {
		
		if ( controllsEnabled != true ) return;
		
		camera.position.x += ( mouseX - camera.position.x ) * .05;
		camera.position.y += ( - mouseY - camera.position.y ) * .05;
		
		camera.rotation.x -= ( mouseX - camera.position.x ) * .0005;
		camera.rotation.y += ( - mouseY - camera.position.y ) * .0005;
		
		camera.position.z = 600;
		
		camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );
	};

};
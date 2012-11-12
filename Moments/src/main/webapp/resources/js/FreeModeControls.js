//Free movement Controls. Move along X/Z Axis. Look around Y and Z Axis.

var FreeModeControls = function ( camera ) {
	TRACE("FreeModeControls Created");
	
	var controllsEnabled = false;
	
	var moveForward = false;
	var moveBackward = false;
	var moveLeft = false;
	var moveRight = false;
	
	var speed = 0.5;
	
	var velocity = new THREE.Vector3();
	
	var PI_2 = Math.PI / 2;
	
	
	this.onMouseMove = function ( event ) {
		
		if ( controllsEnabled != true ) return;
		
		var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
		
		yawObject.rotation.y -= movementX * 0.002;
		pitchObject.rotation.x -= movementY * 0.002;
		
		pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );

	};

	this.onKeyDown = function ( event ) {
		
		if ( controllsEnabled != true ) return;
		
		switch ( event.keyCode ) {

			case 38: // up
			case 87: // w
				moveForward = true;
				break;

			case 37: // left
			case 65: // a
				moveLeft = true; break;

			case 40: // down
			case 83: // s
				moveBackward = true;
				break;

			case 39: // right
			case 68: // d
				moveRight = true;
				break;

			case 32: // space
				//
				break;

		}

	};
	this.onKeyUp = function( event ) {
		
		if ( controllsEnabled != true ) return;
		
		switch( event.keyCode ) {

			case 38: // up
			case 87: // w
				moveForward = false;
				break;

			case 37: // left
			case 65: // a
				moveLeft = false;
				break;

			case 40: // down
			case 83: // a
				moveBackward = false;
				break;

			case 39: // right
			case 68: // d
				moveRight = false;
				break;

		}

	};
	
	this.onMouseClick = function(event) {
		
		event.preventDefault();
		if ( controllsEnabled != true ) return;
		
		TRACE( "FreeModeControls Mouse Clicked" );
			
	    var mouse3D = new THREE.Vector3(
	   		0.5 * 2 - 1,
	    	-0.5 * 2 + 1,
	    	0.5
	    );
	    
	    var projector = new THREE.Projector();
	    projector.unprojectVector(mouse3D, camera);
	    var ray = new THREE.Ray( yawObject.position, mouse3D.subSelf(yawObject.position).normalize() );
		var intersects = ray.intersectObjects( getAllPhotoObjects() );
		if ( intersects.length > 0 ) {
			DEBUG( "Raycast Intersected with: ", intersects[0].object );
			enterPhotoMode( intersects[0].object );
			//enterTestMode( intersects[0].object );
		}
		
	};
	
	this.getObject = function () {
		return yawObject;
	};
	
	
	this.enableControls = function() {
		
		document.addEventListener( 'mousemove', controls.onMouseMove, false );
		document.addEventListener( 'keydown', controls.onKeyDown, false );
		document.addEventListener( 'keyup', controls.onKeyUp, false );
		document.addEventListener( 'click', controls.onMouseClick, false );
		
		controllsEnabled = true;
		
		INFO( "Enabled Free Mode Controls: ", yawObject );
	};
	this.disableControls = function() {
		
		document.removeEventListener( 'mousemove', controls.onMouseMove, false );
		document.removeEventListener( 'keydown', controls.onKeyDown, false );
		document.removeEventListener( 'keyup', controls.onKeyUp, false );
		document.removeEventListener( 'click', controls.onMouseClick, false );
		
		controllsEnabled = false;
	    
	    INFO( "Disabled FreeModeControls" );
	};

	this.update = function ( delta ) {
		
		if ( controllsEnabled != true ) return;
		
		delta *= 0.05;
		
		velocity.x += ( - velocity.x ) * 0.08 * delta;
		velocity.y += ( - velocity.y ) * 0.08 * delta;
		velocity.z += ( - velocity.z ) * 0.08 * delta;
		
		if ( moveForward ) velocity.z -= speed * delta;
		if ( moveBackward ) velocity.z += speed * delta;
		if ( moveLeft ) velocity.x -= speed * delta;
		if ( moveRight ) velocity.x += speed * delta;
		
		yawObject.translateX( velocity.x );
		yawObject.translateY( velocity.y ); 
		yawObject.translateZ( velocity.z );
		
	};

};
//FUnctions related to Locking the Mouse.

var lockedElement;
var lookVector = new THREE.Vector3();

document.addEventListener('pointerlockchange', pointerLockChangeHandler, false);
document.addEventListener('mozpointerlockchange', pointerLockChangeHandler, false);
document.addEventListener('webkitpointerlockchange', pointerLockChangeHandler, false);

//Called when the app wants to request Pointer Lock
function initPointerLock() {
	DEBUG( "Asking for Pointer Lock" );
	
	lockedElement = document.getElementById("pointer-lock-element");
	lockedElement.requestPointerLock = lockedElement.requestPointerLock ||
								 lockedElement.mozRequestPointerLock ||
								 lockedElement.webkitRequestPointerLock;
	
	// Ask the browser to lock the pointer
	lockedElement.requestPointerLock();
	
}

//Called when the user has accepted pointer lock dialogue
function pointerLockEnabled() {
	INFO( "Pointer Locked" );
	
	$(window).trigger("PointerLocked", "Pointer Successfully Locked");
	
}

//Called when the pointer lock has been lost, or called manually
function killPointerLock() {
	INFO( "Pointer Killed" );
	
	document.exitPointerLock = document.exitPointerLock ||
							   document.mozExitPointerLock ||
							   document.webkitExitPointerLock;
	document.exitPointerLock();
	
	$(window).trigger("PointerUnlocked", "Pointer Successfully Unlocked");
	
}

//Handles event changes and calls the above functions
function pointerLockChangeHandler( e ) {
	TRACE( "PointerLock Change: ", e );
	
	var requestedElement = e.srcElement;
	if (document.pointerLockElement === lockedElement ||
		document.mozPointerLockElement === lockedElement ||
		document.webkitPointerLockElement === lockedElement) {
		
		TRACE("Pointer Locking...");
		pointerLockEnabled();
		
	} else {
		//User exited the Pointer Lock
		TRACE("Pointer Unlocking...");
		killPointerLock();
	}
}
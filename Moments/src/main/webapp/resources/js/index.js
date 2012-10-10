//Vars
var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var FLOOR = -250;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var container, stats;

var havePointerLock = 'pointerLockElement' in document ||
    'mozPointerLockElement' in document ||
    'webkitPointerLockElement' in document;


//TODO Handle Unsupported Browsers
//if (!THREE.Detector.webgl)
//	THREE.Detector.addGetWebGLMessage();

$(document).ready(function() {
	
	$('#help-modal-content').modal();
	
	initWebGL();
	
	initPhotos();
	
	initDragDrop();
		
});





function onWindowResize() {
	console.log( "onWindowResize" );

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	if ( webglRenderer ) webglRenderer.setSize( window.innerWidth, window.innerHeight );

}


function onDocumentMouseClick(event) {
	logObj( "onDocumentMouseClick", event );
	
	event.preventDefault();
	
    var mouse3D = new THREE.Vector3(
   		(event.clientX / window.innerWidth) * 2 - 1,
    	-(event.clientY / window.innerHeight) * 2 + 1,
    	0.5
    );
    
    var projector = new THREE.Projector();
    projector.unprojectVector(mouse3D, camera);
    
    var ray = new THREE.Ray( camera.position, mouse3D.subSelf(camera.position).normalize() );
	var intersects = ray.intersectObjects( getAllPhotoObjects() );
	if ( intersects.length > 0 ) {
		selectPhotoByMesh( intersects[0].object );
	}
}


function logObj( Str, Obj) {
	console.log( Str + ' :' );
	console.log( Obj );
}


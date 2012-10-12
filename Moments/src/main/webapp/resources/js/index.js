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



function logObj( Str, Obj) {
	console.log( Str + ' :' );
	console.log( Obj );
}


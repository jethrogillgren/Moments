//Vars
var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var FLOOR = -250;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var container, stats;

var currentMode = "";

var havePointerLock = 'pointerLockElement' in document ||
    'mozPointerLockElement' in document ||
    'webkitPointerLockElement' in document;


$(document).ready(function() {
	
	TRACE( "Document.ready()" );
	
	initWebGL();
	
	initPhotos();
	
	initDragDrop();
	
	enterIndexMode();
});

//Initial Mode.  Landing Page with instructions, title etc..  Button links to Free Mode.
//Cycles around a set number of camera positions
//Mouse is Unlocked. Change settings/account stuff here
function enterIndexMode() {
	INFO( "Entering Index Mode" );
	
	exitCurrentMode();
	currentMode = "Index";
	
	//Add the Controls to the WebGL Scene.
	controls = new IndexModeControls( camera );
	scene.add( controls.getObject() );
	controls.enableControls();
	
	$('#help-modal-content').modal(); //Display temporary info box.
}

//Next available mode, can either lock the mouse or use click-dragging.  Allows camera movement around the scene.
//Provides links into Photo Mode and back into Index Mode.
function enterFreeMode() {
	INFO( "Entering Free Mode" );
	
	exitCurrentMode();
	currentMode = "Free";
	
	//Add the Controls to the WebGL Scene.
	controls = new FreeModeControls( camera );
	scene.add( controls.getObject() );
	
	$(window).bind("PointerLocked", function(event, theData) {
		console.log( "PointerLocked Event caught in FreeMode" );
		controls.enableControls();
	});
	
	$(window).bind("PointerUnlocked", function(event, theData) {
		console.log( "PointerUnlocked Event caught in FreeMode" );
		enterIndexMode();
	});
	
	initPointerLock();
}

//Opens when clicking a photo in free mode or from a URL link.
//Mouse is unlocked, camera centered on one photo.  Adds Caption, Author, etc.. boxes around photo
//Provides links back into Index or Free Modes.

function enterPhotoMode( thePhoto ) {
	INFO( "Entering Photo Mode with Photo: ", thePhoto );
	
	exitCurrentMode();
	currentMode = "Photo";
	
	controls = new PhotoModeControls( camera, thePhoto );
	scene.add( controls.getObject() );
	controls.enableControls();
}

//Exit the current Mode. Called before entering a new mode.
function exitCurrentMode() {
	TRACE( "Exiting Current Mode" );
	
	if( currentMode=="Index" ) {
		$.modal.close();
		
		disableCurrentControls();
		
	} else if ( currentMode=="Free" ) {
		
		disableCurrentControls();
		
		$(window).unbind('PointerLocked');
		$(window).unbind('PointerUnlocked');
		killPointerLock();
		
	} else if ( currentMode=="Photo" ) {

		disableCurrentControls();
		
		PhotoModeSelectedPhoto = null;
		//document.removeEventListener( 'click', PhotoModeClickHandler, false );
		
		
	}
}


function onWindowResize() {
	
	DEBUG( "Window Resized" );
	
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	
	if ( webglRenderer ) webglRenderer.setSize( window.innerWidth, window.innerHeight );
	
}



function logObj( Str, Obj) {
	DEBUG(Str, Obj);
}
//Core WebGL Three.js Stuff.  Setting up the scene and renderer.

var camera, scene;
var controls;
var controlsLastPosition = new THREE.Vector3( -500, -10, 800 );
var controlsLastRotation = new THREE.Vector3( 0, -0.4, 0 );
var webglRenderer;
var mesh, zmesh, geometry, ray;
var objects = [];
var time = Date.now();

//Creates the WebGL Environment
function initWebGL() {
	TRACE( "Initilizing WebGL" );
	
	//Create Camera
	camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 100000 );
	
	
    //Create scene
    scene = new THREE.Scene();
    
	// LIGHTS
	var ambient = new THREE.AmbientLight( 0x221100 );
	scene.add( ambient );
	
	var light = new THREE.SpotLight();
    light.position.set( 170, 330, -160 );
    scene.add(light);
    
    var directionalLight = new THREE.DirectionalLight( 0xffeedd );
	directionalLight.position.set( 0, -70, 100 ).normalize();
	scene.add( directionalLight );
	
	
	// RENDERER
	webglRenderer = new THREE.WebGLRenderer( { antialias: true } );
	webglRenderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
	webglRenderer.domElement.style.position = "relative";
	
	$( "#WebGL" ).append( webglRenderer.domElement );
	has_gl = 1;
	
	// STATS
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	stats.domElement.style.zIndex = 100;
	$( "#WebGL" ).append( stats.domElement );
	
	//Initial Animate
	animate();
}

//Returns whichever Camera we are currently using (Free or Photo)
function getCameraObject() {
	return controls.getObject();
}

//Remove the current Controls Object
function disableCurrentControls() {
	DEBUG("Disabling Current Controls");
	
	controls.disableControls();
	scene.remove( controls.getObject() );
	controls = null;
	scene.add(camera); //Put the camera back into the scene
}


function animate() {
	
	requestAnimationFrame( animate );
	
	if( controls != null ) { //If we have a controlling object (*ModeControls.js)
		controls.update( Date.now() - time ); //Tell it to perform it's updates
	}
	webglRenderer.render( scene, camera );
	
	time = Date.now();
	
	stats.update();

}

//Will be used for any global rendering effects
/*
function render() {
	
	webglRenderer.render( scene, camera );

}*/
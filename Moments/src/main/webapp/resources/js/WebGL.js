//Core WebGL Three.js Stuff.  Setting up the scene and renderer.

var camera, scene;

var controls;
var pitchObject
var yawObject;

var webglRenderer;
var mesh, zmesh, geometry, ray;
var objects = [];
var time = Date.now();

//Creates the WebGL Environment
function initWebGL() {
	TRACE( "Initilizing WebGL" );
	
	//Create Camera Control Object
	camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 100000 );
	
	pitchObject = new THREE.Object3D();
	pitchObject.add( camera );
	
	yawObject = new THREE.Object3D();
	yawObject.add( pitchObject );
	
	
    //Create scene
    scene = new THREE.Scene();
    
    // Grid
	var size = 5000, step = 100;
	
	var geometry = new THREE.Geometry();
	
	for ( var i = - size; i <= size; i += step ) {

		geometry.vertices.push( new THREE.Vector3( - size, 0, i ) );
		geometry.vertices.push( new THREE.Vector3(   size, 0, i ) );

		geometry.vertices.push( new THREE.Vector3( i, 0, - size ) );
		geometry.vertices.push( new THREE.Vector3( i, 0,   size ) );

	}

	var material = new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.5 } );
	
	var line = new THREE.Line( geometry, material );
	line.type = THREE.LinePieces;
	line.position.set(0, -60, 0);
	scene.add( line );
    
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
	return yawObject;
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
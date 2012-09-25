//Vars
var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var FLOOR = -250;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var container, stats;

var camera, scene;
var webglRenderer;
var mesh, zmesh, geometry;

//TODO
//if (!THREE.Detector.webgl)
//	THREE.Detector.addGetWebGLMessage();

$(document).ready(function() {
	init();
	animate();
	showDatGUI();
});

var FizzyText = function() {
	this.title = 'dat.gui';
	this.speed = 0.8;
	this.displayOutline = false;
	//this.explode = function() { ... };
 	// Define render logic ...
 };

function showDatGUI() {
  var text = new FizzyText();
  var gui = new dat.GUI();
  gui.add(text, 'title');
  gui.add(text, 'speed', -5, 5);
  gui.add(text, 'displayOutline');
  //gui.add(text, 'explode');
}

function init() {
	
	//Mouse Event Listener
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	
	
	//Create Camera
	camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 100000 );
    camera.position.z = 500;


    //Create scene
    scene = new THREE.Scene();
	var ground = createGround();
	scene.add( ground );
	
	
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
	try {
		
		webglRenderer = new THREE.WebGLRenderer();
		webglRenderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
		webglRenderer.domElement.style.position = "relative";
		
		container.appendChild( webglRenderer.domElement );
		has_gl = 1;
	}
		catch (e) {
	}
	
	
	// STATS
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	stats.domElement.style.zIndex = 100;
	$( "#WebGL" ).append( stats.domElement );
	
}

function createGround() {
	
	var x = document.createElement( "canvas" );
	var xc = x.getContext("2d");
	x.width = x.height = 128;
	xc.fillStyle = "#fff";
	xc.fillRect(0, 0, 128, 128);
	xc.fillStyle = "#000";
	xc.fillRect(0, 0, 64, 64);
	xc.fillStyle = "#999";
	xc.fillRect(32, 32, 32, 32);
	xc.fillStyle = "#000";
	xc.fillRect(64, 64, 64, 64);
	xc.fillStyle = "#555";
	xc.fillRect(96, 96, 32, 32);
	
	var xm = new THREE.MeshBasicMaterial( { map: new THREE.Texture( x, new THREE.UVMapping(), THREE.RepeatWrapping, THREE.RepeatWrapping ) } );
	xm.map.needsUpdate = true;
	xm.map.repeat.set( 10, 10 );
	
	geometry = new THREE.PlaneGeometry( 100, 100, 15, 10 );
	
	mesh = new THREE.Mesh( geometry, xm );
	mesh.position.set( 0, FLOOR, 0 );
	mesh.rotation.x = - Math.PI / 2;
	mesh.scale.set( 10, 10, 10 );
	
	return mesh;
}

//Returns a list of all available photos on the server
function loadImageList() {
	
}

function onWindowResize() {


	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	if ( webglRenderer ) webglRenderer.setSize( window.innerWidth, window.innerHeight );

}

function onDocumentMouseMove(event) {

	mouseX = ( event.clientX - windowHalfX );
	mouseY = ( event.clientY - windowHalfY );

}

function animate() {

	requestAnimationFrame( animate );

	render();
	stats.update();

}

function render() {

	camera.position.x += ( mouseX - camera.position.x ) * .05;
	camera.position.y += ( - mouseY - camera.position.y ) * .05;

	camera.lookAt( scene.position );
	
	webglRenderer.render( scene, camera );

}


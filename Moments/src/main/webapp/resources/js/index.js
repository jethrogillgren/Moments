//Vars
var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var FLOOR = -250;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var container,stats;

var camera, scene;
var webglRenderer;
var mesh, zmesh, geometry;

if (!THREE.Detector.webgl)
	THREE.Detector.addGetWebGLMessage();

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
  gui.add(text, 'explode');
}

function init() {
	
	//Mouse Event Listener
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	
	//Create Camera
	camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 100000 );
    camera.position.z = 500;

    //Create scene
    scene = new THREE.Scene();
	
	var light = new THREE.SpotLight();
    light.position.set( 170, 330, -160 );
    scene.add(light);
	
    geometry = new THREE.CubeGeometry( 200, 200, 200 );
    material = new THREE.MeshLambertMaterial( { color: 0xff0000, wireframe: true } );
    mesh = new THREE.Mesh( geometry, material );
    
    planeGeometry = new THREE.PlaneGeometry( 200, 200, 1, 1);
    planeMesh = new THREE.Mesh( planeGeometry, material );
    
    scene.add( mesh );
    scene.add( planeMesh );

    renderer = new THREE.CanvasRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( renderer.domElement );

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

	if ( has_gl ) webglRenderer.render( scene, camera );

}


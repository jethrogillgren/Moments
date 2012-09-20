var camera, scene, renderer;
var geometry, material, mesh;

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

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;

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

function animate() {

    // note: three.js includes requestAnimationFrame shim
    requestAnimationFrame( animate );

    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.02;

    renderer.render( scene, camera );

}
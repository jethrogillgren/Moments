//Vars
var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;
var FLOOR = -250;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var container, stats;
var datGui;

var camera, scene;
var webglRenderer;
var mesh, zmesh, geometry;
var objects = [];

//TODO 
//if (!THREE.Detector.webgl)
//	THREE.Detector.addGetWebGLMessage();

$(document).ready(function() {
	
	init();
	animate();
	//$('#help-modal-content').modal();
});


//Called when a user clicks a Photo, and deletes/updates the datGui Control Tab
//DatGUI handles any property changes and passes them to updatePhoto.
//TODO Refactor out the bug stopping datGUI control the THREE.Vector3 instances
function addPhotoToDatGUI( photo ) {
	logObj( 'addPhotoToDatGUI', photo );
	
	if( datGui )
		datGui.destroy();
	datGui = new dat.GUI();
	
	var title = datGui.add( photo, 'Title' );
	title.onFinishChange(function(value) {
		updatePhoto( photo );
	});
	
	var caption = datGui.add( photo, 'Caption' );
	caption.onFinishChange(function(value) {
		updatePhoto( photo );
	});
	
	photo.XPosition = parseFloat( photo.position.x[0] );
	var positionX = datGui.add( photo, 'XPosition' ).min(-1000).max(1000).step(1);
	positionX.onChange(function(value) {
		value =  parseFloat( value );
		photo.position.x[0] = value; //Workaround
		photo.XPosition = value;
	});
	positionX.onFinishChange(function(value) {
		value =  parseFloat( value );
		photo.position.x[0] = value;
		photo.XPosition = value;
		updatePhoto( photo );
	});
	
	photo.YPosition = parseFloat( photo.position.y[0] );
	var positionY = datGui.add( photo, 'YPosition' ).min(-1000).max(1000).step(1);
	positionY.onChange(function(value) {
		value =  parseFloat( value );
		photo.position.y[0] = value; //Workaround
		photo.YPosition = value;
	});
	positionY.onFinishChange(function(value) {
		value =  parseFloat( value );
		photo.position.y[0] = value;
		updatePhoto( photo );
	});
	
	photo.ZPosition = parseFloat( photo.position.z[0] );
	var positionZ = datGui.add( photo, 'ZPosition' ).min(-1000).max(1000).step(1);
	positionZ.onChange(function(value) {
		value =  parseFloat( value );
		photo.position.z[0] = value; //Workaround
		photo.ZPosition = value;
	});
	positionZ.onFinishChange(function(value) {
		value =  parseFloat( value );
		photo.position.z[0] = value;
		updatePhoto( photo );
	});
	
	photo.XRotation = parseFloat( photo.rotation.x[0] );
	var rotationX = datGui.add( photo, 'XRotation' ).min(-3.14).max(3.14).step(0.01);
	rotationX.onChange(function(value) {
		value =  parseFloat( value );
		photo.rotation.x[0] = value; //Workaround
		photo.XRotation = value;
	});
	rotationX.onFinishChange(function(value) {
		value =  parseFloat( value );
		photo.rotation.x[0] = value;
		updatePhoto( photo );
	});
	
	photo.YRotation = parseFloat( photo.rotation.y[0] );
	var rotationY = datGui.add( photo, 'YRotation' ).min(-3.14).max(3.14).step(0.01);
	rotationY.onChange(function(value) {
		value =  parseFloat( value );
		photo.rotation.y[0] = value; //Workaround
		photo.YRotation = value;
	});
	rotationY.onFinishChange(function(value) {
		value =  parseFloat( value );
		photo.rotation.y[0] = value;
		updatePhoto( photo );
	});
	
	photo.ZRotation = parseFloat( photo.rotation.z[0] );
	var rotationZ = datGui.add( photo, 'ZRotation' ).min(-3.14).max(3.14).step(0.01);
	rotationZ.onChange(function(value) {
		value =  parseFloat( value );
		photo.rotation.z[0] = value; //Workaround
		photo.ZRotation = value;
	});
	rotationZ.onFinishChange(function(value) {
		value =  parseFloat( value );
		photo.rotation.z[0] = value;
		updatePhoto( photo );
	});
	
	photo.Scale = parseFloat( photo.scale.x[0] );
	var scale = datGui.add( photo, 'Scale' ).min(0.1).max(2).step(0.1);
	scale.onChange(function(value) {
		value =  parseFloat( value );
		photo.scale.x[0] = value; //Workaround
		photo.scale.y[0] = value; //Workaround
		photo.scale.z[0] = value; //Workaround
		photo.Scale = value;
	});
	scale.onFinishChange(function(value) {
		value =  parseFloat( value );
		photo.scale.x[0] = value;
		photo.scale.y[0] = value;
		photo.scale.z[0] = value;
		updatePhoto( photo );
	});
	
	// Iterate over all controllers and set update initial values
  	for (var i in datGui.__controllers) {
   		datGui.__controllers[i].updateDisplay();
  }
}


function updatePhoto( photo) {
	logObj( 'updatePhoto', photo );
	
	photoRepresentation = getRepresentationFromPhotoMesh( photo );
	//var dataStr = "id=1&imageName=Test&imageCaption=Test&position=0, 0, 0&rotation=0, 0, 0&scale=5, 5, 5";
	
	$.ajax({
		url: "rest/Image/",
		type: "POST",
		data: photoRepresentation,
		success:function(data) {
			console.log('POST rest/Image \t ' + photoRepresentation);
  			
  		} 
	});
}

function uploadNewPhoto( imageFile ) {
	logObj( 'uploadNewPhoto', imageFile );
	
	var options = { 
        target:        '#FileUploadForm'   // target element(s) to be updated with server response 
        	
        }
    };
    
	
	/*
	var dataStr = "imageName=" + imageFile.name;
	
	$.ajax({
		url: "rest/Image/",
		type: "PUT",
		contentType: "multipart/form-data",
		data: {
			//imageName: imageFile.name,
        	file: imageFile
     	},
     	processData: false,
		success:function(data) {
			console.log('PUT rest/Image \t ' + imageFile);
  			
  		} 
	});*/
}


function getRepresentationFromPhotoMesh( photo ) {
	logObj( "getRepresentationFromPhotoMesh", photo );
	var results = {}; 
	
	results.id = photo.photoId;
	results.imageName = photo.Title;
	results.imageCaption = photo.Caption;
	results.position = photo.position.x[0] + ', ' +photo.position.y[0] + ', ' +photo.position.z[0] + ', ';
	results.rotation = photo.rotation.x[0] + ', ' +photo.rotation.y[0] + ', ' +photo.rotation.z[0] + ', ';
	results.scale = photo.scale.x[0] + ', ' +photo.scale.y[0] + ', ' +photo.scale.z[0] + ', ';
	
	//console.log("TEST:  " + photo.position);
	
	return results;
}

function onDrag(e) {
 	e.stopPropagation();
  	e.preventDefault();
}

function onDrop(e) {
	console.log('Dropped!');
	e.stopPropagation();
	e.preventDefault();
	
	// Only process image files. 
	var imageType = /image.*/;
	
	var readFileSize = 0;
	
	var files = e.dataTransfer.files;
	
	for(var i=0, len=files.length; i < len; i++ ) {
		
		var file = files[i];
		readFileSize += file.fileSize;
		
		var reader = new FileReader();
		reader.onerror = function(e) {
			alert('Error code: ' + e.target.error);
		};
		// Create a closure to capture the file information. 
		reader.onload = (function( imageFile ) {
			logObj( "File Loaded", imageFile );
			uploadNewPhoto( imageFile );
		})(file);
		
		if (file.type.match(imageType)) {
			reader.readAsDataURL(file);
		} else {
			console.log('Not An Image!');
		}
	}

	
}

function init() {
	console.log( 'init' );
	
	//Listeners
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'click', onDocumentMouseClick, false );
	
	var dropBox = document.getElementById( 'DragDropImg' );
	dropBox.addEventListener('dragenter', onDrag, false);
	dropBox.addEventListener('dragover', onDrag, false);
	dropBox.addEventListener('dragleave', onDrag, false);
	dropBox.addEventListener('drop', onDrop, false);
	
	
	//Create Camera
	camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 100000 );
    camera.position.z = 500;
	
	
    //Create scene
    scene = new THREE.Scene();
	var ground = createGround();
	scene.add( ground );
	createAllPhotos();
	
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
	
}

function createGround() {
	console.log( 'createGround' )
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

//Starts the asyncrous chain of getting photo IDs, getting XML representation, loading the image, and creating the mesh in the scene
function createAllPhotos() {
	console.log( 'createAllPhotos()' );
	//Get the Photo IDs
	$.ajax({
		url: "rest/Image/list",
		success:function(data) {
			console.log('GET rest/Image/list \t ' + data);
  			var regex = /([\d]+)/g;
  			var matched = null;
  			while ( matched = regex.exec(data) ) {
				createPhotoById( matched[0] );//Now get the XML Representation
			}
  		} 
	});
}

//Creates a photo from its ID.
function createPhotoById( id ) {
	logObj( 'createPhotoById', id );
	
	//Get the Photo ID
	$.ajax({
		url: "rest/Image/" + id + ".xml",
		success:function(data) {
			createPhotoByXml(data);
  		}
	});
}


//Turns the Photos XML Representation into a Three.Mesh, and adds it to the scene
function createPhotoByXml( xmlRep ) {
	logObj( 'createPhotoByXml', xmlRep );
	
	//Get the Metadata from the XML Representation
	var id = $(xmlRep).find('id').text();
	var imageName = $(xmlRep).find('imageName').text();
	var imageCaption = $(xmlRep).find('imageCaption').text();
	var positionArr = getXYZArrFromString( $(xmlRep).find('position').text() );
	var rotationArr = getXYZArrFromString( $(xmlRep).find('rotation').text() );
	var scaleArr = getXYZArrFromString( $(xmlRep).find('scale').text() );
	
	//Create the inner Canvas object for the Mesh
	var canvas = document.createElement( "canvas" );
	var canvasContext = canvas.getContext("2d");
	
	//Load the Image -- TODO Create a placeholder with loading bar
	var img = new Image();
	img.onload = function(){
		canvas.width = img.width;
	    canvas.height = img.height;
	    canvasContext.drawImage(img, 0, 0, img.width, img.height);
	    
	    var photoMaterial = new THREE.MeshBasicMaterial({
					map: new THREE.Texture( canvas )
		});
		photoMaterial.map.needsUpdate = true;
		
		var photoGeometry = new THREE.PlaneGeometry( img.width, img.height );
			
		var photoMesh = new THREE.Mesh( photoGeometry, photoMaterial );
		photoMesh.position.set( positionArr[0], positionArr[1], positionArr[2]  );
		photoMesh.rotation.set( rotationArr[0], rotationArr[1], rotationArr[2] );
		photoMesh.scale.set( scaleArr[0], scaleArr[1], scaleArr[2] );
		photoMesh.photoId = id;
		photoMesh.Title = imageName;
		photoMesh.Caption = imageCaption;
		
		
		objects.push( photoMesh );
		scene.add( photoMesh );
		
	}
	img.src = 'rest/ImageData/' + id ;
	
}

function getAllPhotoObjects() {
	return objects;
}
function getPhotoObject( id ) {
	//TODO
}

function getXYZArrFromString( str ) {
	logObj( "getXYZArrFromString", str );
	
	var pos = [];
	var regex = /[^,]+/g;
	var matched = null;
	
	while ( matched = regex.exec(str) ) {
		pos.push( matched );
	}
	return pos;
}
function getStringFromXYZArr( arr ) {
	logObj( "getStringFromXYZArr", arr );
	return "5, 5, 5";
}

function onWindowResize() {
	console.log( "onWindowResize" );

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

function selectPhotoById( id )  {
	logObj( "selectPhotoById", id );
}
function selectPhotoByMesh( selectedMesh )  {
	logObj("selectPhotoByMesh", selectedMesh);
	
	addPhotoToDatGUI( selectedMesh );
}



function animate() {

	requestAnimationFrame( animate );

	render();
	stats.update();

}

function logObj( Str, Obj) {
	console.log( Str + ' :' );
	console.log( Obj );
}

function render() {

	camera.position.x += ( mouseX - camera.position.x ) * .05;
	camera.position.y += ( - mouseY - camera.position.y ) * .05;

	camera.lookAt( scene.position );
	
	webglRenderer.render( scene, camera );

}


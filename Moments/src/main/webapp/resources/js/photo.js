//Load all the Photos
function initPhotos() {
	TRACE("Initializing Photos");
	createAllPhotos();
}

//Update this Photo on the Server
function updatePhoto( photo) {
	DEBUG( 'Updating Photo', photo );
	
	photoRepresentation = getRepresentationFromPhotoMesh( photo );
	//var dataStr = "id=1&imageName=Test&imageCaption=Test&position=0, 0, 0&rotation=0, 0, 0&scale=5, 5, 5";
	
	$.ajax({
		url: "rest/Image/" + photo.photoId,
		type: "POST",
		data: photoRepresentation,
		success:function(data) {
			TRACE('POST rest/Image \t ' + photoRepresentation, data);
  			
  		} 
	});
}

function getRepresentationFromPhotoMesh( photo ) {
	TRACE( "getRepresentationFromPhotoMesh", photo );
	var results = {}; 
	
	results.id = photo.photoId;
	results.imageName = photo.Title;
	results.imageCaption = photo.Caption;
	results.position = photo.position.x + ', ' +photo.position.y + ', ' +photo.position.z + ', ';
	results.rotation = photo.rotation.x + ', ' +photo.rotation.y + ', ' +photo.rotation.z + ', ';
	results.scale = photo.scale.x + ', ' +photo.scale.y + ', ' +photo.scale.z + ', ';
	
	return results;
}


//Starts the asyncrous chain of getting photo IDs, getting XML representation, loading the image, and creating the mesh in the scene
function createAllPhotos() {
	DEBUG( 'createAllPhotos()' );
	//Get the Photo IDs
	$.ajax({
		url: "rest/Image/list",
		success:function(data) {
			TRACE('GET rest/Image/list \t ' + data);
			var regex = /([\d]+)/g;
			var matched = null;
			while ( matched = regex.exec(data) ) {
				createPhotoById( matched[0] );//Now get the XML Representation
			}
		} 
	});
}

//Gets a photo from the server from its ID, and displays it.
function createPhotoById( id ) {
	TRACE( 'createPhotoById ' + id );
	
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
	TRACE( 'createPhotoByXml', xmlRep );
	
	//Get the Metadata from the XML Representation
	var id = $(xmlRep).find('id').text();
	var imageName = $(xmlRep).find('imageName').text();
	var imageCaption = $(xmlRep).find('imageCaption').text();
	//var positionArr = getXYZArrFromString( $(xmlRep).find('position').text() );
	//var rotationArr = getXYZArrFromString( $(xmlRep).find('rotation').text() );
	var positionVector = getVector3DFromString( $(xmlRep).find('position').text() );
	var rotationVector = getVector3DFromString( $(xmlRep).find('rotation').text() );
	var scaleVector = getVector3DFromString( $(xmlRep).find('scale').text() );
	
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
		//photoMesh.position.set( positionArr[0], positionArr[1], positionArr[2]  );
		//photoMesh.rotation.set( rotationArr[0], rotationArr[1], rotationArr[2] );
		photoMesh.position = positionVector;
		photoMesh.rotation = rotationVector;
		photoMesh.scale = scaleVector;
		photoMesh.photoId = id;
		photoMesh.Title = imageName;
		photoMesh.Caption = imageCaption;
		
		
		objects.push( photoMesh );
		scene.add( photoMesh );
		
	}
	img.src = 'rest/ImageData/' + id ;
	
}

function getAllPhotoObjects() {
	TRACE("getAllPhotoObjects");
	return objects;
}

//Take a string like " <int>,<int>,<int> "  and return an equal Vector3.
function getVector3DFromString( str ) {
	
	
	var pos = [];
	var regex = /[^,]+/g;
	var matched = null;
	
	while ( matched = regex.exec(str) ) {
		pos.push( parseFloat(matched) );
	}
 	
 	var vec = new THREE.Vector3( pos[0], pos[1], pos[2] );
 	
	return vec;
}
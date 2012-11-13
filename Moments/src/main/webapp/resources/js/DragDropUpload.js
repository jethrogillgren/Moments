function initDragDrop() {
	TRACE( "Initializing Drag & Drop" );
	var dropBox = document.getElementById( 'DragDropImg' );
	window.addEventListener('dragenter', onDrag, false);
	window.addEventListener('dragover', onDrag, false);
	window.addEventListener('dragleave', onDrag, false);
	window.addEventListener('drop', onDrop, false);
}
function onDrag(e) {
	TRACE("Dragging...");
 	e.stopPropagation();
  	e.preventDefault();
}

function onDrop(e) {
	DEBUG('File Dropped: ', e);
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
			DEBUG( "File Loaded:", imageFile );
			uploadNewPhoto( imageFile );
		})(file);
		
		if (file.type.match(imageType)) {
			reader.readAsDataURL(file);
		} else {
			ERROR('Dropped File not an Image');
		}
	}
}

function uploadNewPhoto( imageFile ) {
	INFO( 'Uploading Dropped Photo', imageFile );
    
    var formdata = false;
    if (window.FormData) {
        formdata = new FormData();
        formdata.append( "images", imageFile);
        formdata.append( "imageName", imageFile.name );
        $.ajax({  
	  		url: 'rest/Image',
	        type: "POST",
	        data: formdata,
	        processData: false,
	        contentType: false,
	        complete: function ( data ) {
	        	//TODO Check success
	            var response = JSON.parse( data.responseText );
	            INFO( 'Dropped Photo(s) Uploaded.  Response: ', response );
	       		createPhotoById( response.id );
	    	}  
	    });
	    
    } else {
    	alert( "Browser doesn't have FormData class!!" ); //TODO Bail out, or check this early and provide fallback option
    }
}

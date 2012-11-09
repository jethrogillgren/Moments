<!--
 * Thanks To: Eric Bidelman <e.bidelman@chromium.org> 
 * Reference: http://studio.html5rocks.com/#Photos 
-->
<!DOCTYPE html>
<html lang="en" style="width: 100%; height: 100%">
<head>
<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=Edge;chrome=1" />
<style type="text/css">
	#simplemodal-container a.modalCloseImg {
		background:url(resources/images/x.png) no-repeat; /* adjust url as required */
		width:25px;
		height:29px;
		display:inline;
		z-index:3200;
		position:absolute;
		top:-15px;
		right:-18px;
		cursor:pointer;
	}
	#simplemodal-overlay {background-color:#000;}
	#simplemodal-container {background-color:#333; border:8px solid #444; padding:12px;}
</style>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js"></script> 
<script src="http://malsup.github.com/jquery.form.js"></script> 
<script src="resources/js/jquery.simplemodal.1.4.3.min.js"  type="text/javascript"></script>
<link type='text/css' href='resources/css/SimpleModal.css' rel='stylesheet' media='screen' />
</head>


<body class="center" style="width: 100%; height: 100%">
	<div id="basic-modal-content">
		<h3>Basic Modal Dialog</h3>
		<p>For this demo, SimpleModal is using this "hidden" data for its content. You can also populate the modal dialog with an AJAX response, standard HTML or DOM element(s).</p>
		<p>Examples:</p>
		<p><code>$('#basicModalContent').modal(); // jQuery object - this demo</code></p>
		<p><code>$.modal(document.getElementById('basicModalContent')); // DOM</code></p>
		<p><code>$.modal('&lt;p&gt;&lt;b&gt;HTML&lt;/b&gt; elements&lt;/p&gt;'); // HTML</code></p>
		<p><code>$('&lt;div&gt;&lt;/div&gt;').load('page.html').modal(); // AJAX</code></p>
	
		<p><a href='http://www.ericmmartin.com/projects/simplemodal/'>More details...</a></p>
	</div>
	<div style="width: 100%; height: 100%; position: absolute; z-index: 50"
		id="divMain">
		<img id="imgBG" src="resources/images/1422-bump.jpg" style="width: 100%; height: 100%; display:none;" />
	</div>
	
	<script type="text/javascript">

		var dropbox = document.getElementById('imgBG');

		// Setup drag and drop handlers. 
		dropbox.addEventListener('dragenter', onDragEnter, false);
		dropbox.addEventListener('dragover', onDragOver, false);
		dropbox.addEventListener('dragleave', onDragLeave, false);
		dropbox.addEventListener('drop', onDrop, false);
		
		function onDragEnter(e) {
	      e.stopPropagation();
	      e.preventDefault();
	      //$('#basic-modal-content').modal();
	    }

	    function onDragOver(e) {
	      e.stopPropagation();
	      e.preventDefault();
	      //dropbox.addClassName('rounded');
	    }
	    
	    function onDragLeave(e) {
	      e.stopPropagation();
	      e.preventDefault();
	      //dropbox.removeClassName('rounded');
	    }

		function onDrop(e) {
			e.stopPropagation();
			e.preventDefault();

			var readFileSize = 0;
			var files = e.dataTransfer.files;

			file = files[0];
			readFileSize += file.fileSize;

			// Only process image files. 
			var imageType = /image.*/;

			if (!file.type.match(imageType)) {
				return;
			}

			var reader = new FileReader();

			reader.onerror = function(e) {
				alert('Error code: ' + e.target.error);
			};

			// Create a closure to capture the file information. 
			reader.onload = (function(aFile) {
				return function(evt) {
					dropbox.src = evt.target.result;
				}
			})(file);

			// Read in the image file as a data url. 
			reader.readAsDataURL(file);
		}
	</script>
</body>
</html>
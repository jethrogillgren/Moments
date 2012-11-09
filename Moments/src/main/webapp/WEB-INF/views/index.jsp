<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<html>
<head>

<script src="resources/js/three.min.js" type="text/javascript"></script>
<script src="resources/js/Detector.js" type="text/javascript"></script>
<script src="resources/js/Stats.js" type="text/javascript"></script>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js"></script> 
<script src="http://malsup.github.com/jquery.form.js"></script> 

<script src="resources/js/jquery.simplemodal.1.4.3.min.js"  type="text/javascript"></script>

<script type="text/javascript" src="resources/js/dat.gui.js"></script>

<script src="resources/js/TweenLite.min.js"></script>
<script src="resources/js/EasePack.min.js"></script>

<script src="resources/js/Logging.js" type="text/javascript"></script>
<script src="resources/js/index.js" type="text/javascript"></script>
<script src="resources/js/photo.js" type="text/javascript"></script>
<script src="resources/js/pointerLock.js" type="text/javascript"></script>
<script src="resources/js/IndexModeControls.js" type="text/javascript"></script>
<script src="resources/js/FreeModeControls.js" type="text/javascript"></script>
<script src="resources/js/PhotoModeControls.js" type="text/javascript"></script>
<script src="resources/js/datGUI.js" type="text/javascript"></script>
<script src="resources/js/DragDropUpload.js" type="text/javascript"></script>
<script src="resources/js/WebGL.js" type="text/javascript"></script>
<link rel="stylesheet" href="resources/css/index.css" />


</head>
<body>
<div id="Moments">
	
	<!-- Invisible overlay with high ZIndex. Used to allow Drag & Drop of files into the window -->
	<div id="DragDropDiv" >
		<img id="DragDropImg" src="resources/images/Transparent.png" />
	</div>
	
	<!-- Container for WebGL. 100%*100%, low zindex. -->
	<div id="WebGL"></div>
	
	<!-- Initially hidden Div, containing instructions etc... Shown on page load -->
	<div id="help-modal-content">
		<h3>Moments</h3>
		<p>TODO Add the Help Pop-Up Page's Text!</p>
		<p>Examples:</p>
		<p><code>Use Mouse to Move and Select Photos</code></p>
		<p><code>Drag and Drop New Photos In</code></p>
		
		<p><a href='http://www.ericmmartin.com/projects/simplemodal/'>More details...</a></p>
		<button onclick="enterFreeMode();">Enter Free Mode!</button>
	</div>
	
	<div id="pointer-lock-element"></div>

	
</div>
</body>

</html>
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>three.js webgl - io - OBJ converter</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
		<style>
			body {
				background:#fff;
				padding:0;
				margin:0;
				overflow:hidden;
				font-family:georgia;
				text-align:center;
			}
			h1 { }
			a { color:skyblue }
			canvas { pointer-events:none; z-index:10; }

			#d { text-align:center; margin:1em 0 -9.2em 0; z-index:0; position:relative; display:block }
			.button { background:#000; color:#fff; padding:0.2em 0.5em; cursor:pointer }
			.inactive { background:#999; color:#eee }
		</style>
	</head>

	<body>
		<div id="d">
			<h1>OBJ to Three.js converter test</h1>

			<br/>
			
		</div>

		<script src="resources/js/three.min.js"></script>

		<script src="resources/js/Detector.js"></script>
		<script src="resources/js/Stats.js"></script>

		<script>

			var SCREEN_WIDTH = window.innerWidth;
			var SCREEN_HEIGHT = window.innerHeight;
			var FLOOR = -250;

			var container,stats;

			var camera, scene;
			var webglRenderer;

			var mesh, zmesh, geometry;

			var mouseX = 0, mouseY = 0;

			var windowHalfX = window.innerWidth / 2;
			var windowHalfY = window.innerHeight / 2;

			var has_gl = 0;
			
			document.addEventListener( 'mousemove', onDocumentMouseMove, false );

			init();
			animate();

			render_canvas = !has_gl;

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 100000 );
				camera.position.z = 500;

				scene = new THREE.Scene();
				
				// GROUND
				
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
				scene.add( mesh );
				
				//Test Photo
				
				var imageLoader = new THREE.ImageLoader();
				console.log("Created imageLoader: " + imageLoader);
				var photoImage = imageLoader.load( "resources/images/TestPhoto.jpg" );
				imageLoader.addEventListener('load', function () {
						console.log("Image Loaded: " + photoImage);
						
						var photoMaterial = new THREE.MeshBasicMaterial({
								map: new THREE.Texture( photoImage )
								//color: "0x66CCFF"
						});
						photoMaterial.map.needsUpdate = true;
						console.log("MeshBasicMaterial Created: " + photoMaterial);
						
						var photoGeometry = new THREE.PlaneGeometry( 110, 150, 50, 10 );
						
						var photoMesh = new THREE.Mesh( photoGeometry, photoMaterial );
						
						scene.add( photoMesh );
				});
				
				
				// LIGHTS

				var ambient = new THREE.AmbientLight( 0x221100 );
				scene.add( ambient );

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
				container.appendChild( stats.domElement );
				
				
				//LOADERS
				
				var loader = new THREE.JSONLoader(),
					callbackMale   = function( geometry ) { createScene( geometry,  90, FLOOR, 50, 105 ) },
					callbackFemale = function( geometry ) { createScene( geometry, -80, FLOOR, 50, 0 ) },
					callbackPhotoObjectTest = function ( geometry )  { createScene( geometry, 0, FLOOR, 50, 50 ) };
				
				//loader.load( "resources/js/Male02_slim.json", callbackMale );
				//loader.load( "resources/js/Female02_slim.json", callbackFemale );
				
				//loader.load( "resources/js/photoObjectTest.json", callbackPhotoObjectTest );
				
				//loader.load( "obj/male02/Male02_bin.js", callbackMale );
				//loader.load( "obj/female02/Female02_bin.js", callbackFemale );
				
				//
				
				window.addEventListener( 'resize', onWindowResize, false );
				
			}
			
			var callbackFinished = function ( result ) {
					console.log("photoObjectTest.json Loaded");
					loaded = result;

					var mat_veyron = result.geometries[ "veyron" ].materials;

					mat_veyron[ 0 ] = result.materials[ "interior" ];
					mat_veyron[ 1 ] = result.materials[ "chrome" ];
					mat_veyron[ 2 ] = result.materials[ "darkerchrome" ];
					mat_veyron[ 3 ] = result.materials[ "glass" ];
					mat_veyron[ 4 ] = result.materials[ "chrome" ];
					mat_veyron[ 5 ] = result.materials[ "chrome" ];
					mat_veyron[ 6 ] = result.materials[ "backlights" ];
					mat_veyron[ 7 ] = result.materials[ "backsignals" ];
					
					handle_update( result, 1 );

					THREE.SceneUtils.traverseHierarchy( result.scene, function ( child ) {

						if ( child.properties.rotating === true ) {

							rotatingObjects.push( child );

						}

					} );

				}

			function onWindowResize() {

				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				if ( webglRenderer ) webglRenderer.setSize( window.innerWidth, window.innerHeight );

			}

			function createScene( geometry, x, y, z, b ) {

				zmesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial() );
				zmesh.position.set( x, y, z );
				zmesh.scale.set( 3, 3, 3 );
				scene.add( zmesh );

				createMaterialsPalette( geometry.materials, 100, b );

			}

			function createMaterialsPalette( materials, size, bottom ) {

				for ( var i = 0; i < materials.length; i ++ ) {

					// material

					mesh = new THREE.Mesh( new THREE.PlaneGeometry( size, size ), materials[i] );
					mesh.position.x = i * (size + 5) - ( ( materials.length - 1 )* ( size + 5 )/2);
					mesh.position.y = FLOOR + size/2 + bottom;
					mesh.position.z = -100;
					scene.add( mesh );

					// number

					var x = document.createElement( "canvas" );
					var xc = x.getContext( "2d" );
					x.width = x.height = 128;
					xc.shadowColor = "#000";
					xc.shadowBlur = 7;
					xc.fillStyle = "orange";
					xc.font = "50pt arial bold";
					xc.fillText( i, 10, 64 );
					
					var xm = new THREE.MeshBasicMaterial( { map: new THREE.Texture( x ), transparent: true } );
					xm.map.needsUpdate = true;

					mesh = new THREE.Mesh( new THREE.PlaneGeometry( size, size ), xm );
					mesh.position.x = i * ( size + 5 ) - ( ( materials.length - 1 )* ( size + 5 )/2);
					mesh.position.y = FLOOR + size/2 + bottom;
					mesh.position.z = -99;
					scene.add( mesh );

				}

			}

			function onDocumentMouseMove(event) {

				mouseX = ( event.clientX - windowHalfX );
				mouseY = ( event.clientY - windowHalfY );

			}

			//

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
			
		</script>

	</body>
</html>

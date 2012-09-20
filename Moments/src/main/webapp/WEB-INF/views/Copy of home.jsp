<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<html>
<head>
<script src="resources/js/ammo.js" type="text/javascript"></script>
<script src="resources/js/CubicVR.js" type="text/javascript"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js"></script> 
<script src="http://malsup.github.com/jquery.form.js"></script> 

<script> 
//prepare the form when the DOM is ready 
$(document).ready(function() { 
	console.log('jQuery - Document Ready');
	
    var options = { 
        //target:        '#sideBar',   // target element(s) to be updated with server response 
        beforeSubmit:  showRequest,  // pre-submit callback 
        success:       showResponse,  // post-submit callback 
 		
        // other available options: 
        url:       'rest/Image',         // override for form's 'action' attribute 
        type:      'post'        // 'get' or 'post', override for form's 'method' attribute 
        //dataType:  null        // 'xml', 'script', or 'json' (expected server response type) 
        //clearForm: true        // clear all form fields after successful submit 
        //resetForm: true        // reset the form after successful submit 
 
        // $.ajax options can be used here too, for example: 
        //timeout:   3000 
    }; 
 
    // bind form using 'ajaxForm' 
    $('#photoForm').ajaxForm(options);
}); 
 
// pre-submit callback 
function showRequest(formData, jqForm, options) { 
    // formData is an array; here we use $.param to convert it to a string to display it 
    // but the form plugin does this for you automatically when it submits the data 
    var queryString = $.param(formData); 
 
    // jqForm is a jQuery object encapsulating the form element.  To access the 
    // DOM element for the form do this: 
    // var formElement = jqForm[0]; 
 
    alert('About to submit: \n\n' + queryString); 
 
    // here we could return false to prevent the form from being submitted; 
    // returning anything other than false will allow the form submit to continue 
    return true; 
} 
 
// post-submit callback 
function showResponse(responseText, statusText, xhr, $form)  { 
    // for normal html responses, the first argument to the success callback 
    // is the XMLHttpRequest object's responseText property 
 
    // if the ajaxForm method was passed an Options Object with the dataType 
    // property set to 'xml' then the first argument to the success callback 
    // is the XMLHttpRequest object's responseXML property 
 
    // if the ajaxForm method was passed an Options Object with the dataType 
    // property set to 'json' then the first argument to the success callback 
    // is the json data object returned by the server 
 
    alert('status: ' + statusText + '\n\nresponseText: \n' + responseText ); 
}

</script>

<style>
	#sideBar {
		position:absolute;
		z-index:1;
		
 		top:30;
 		left:30;
 		width:400px;
 		height:600px;
 		
 		background-color:white;
	}
	.error {
		color: #ff0000;
	}
 
	.errorblock {
		color: #000;
		background-color: #ffEEEE;
		border: 3px solid #ff0000;
		padding: 8px;
		margin: 16px;
	}
</style>

<script type='text/javascript'>
	
	function loadPhotoModel( id ) {
		//Load photo, specified by ID. Return the SceneObject
		
	}
	
	//Retrieve the Photo Mesh Object
	function generateObjects(scene, physics) {
		
		var result = [];
		
		var w = 20;
		var h = 10;
		var CpX = 0;
		var CpY = 10;
		var CpZ = 0;
		
		var sceneObj = new CubicVR.SceneObject({
			mesh: new CubicVR.Mesh({
				material: new CubicVR.Material( "resources/xml/testMaterial1.xml" ),
                points: [
                	[-w/2, h/2, -5],[-w/2, -h/2, -5], // TL, BL
                	[w/2, -h/2, -5],[w/2, h/2, -5]//BR, TR
                ],
                faces: [
                	[0, 1, 2, 3]
                ],
                uv: [
                	[[0, 1],[0, 0],[1, 0],[1, 1]]
                ],
                compile: true
			}),
			position: [CpX, CpY, CpZ]
		});
		
		var planeCollision = new CubicVR.CollisionMap({
			type : "box",
			size: [ w, h, 0.1 ]
		});
		var rigidObj = new CubicVR.RigidBody(sceneObj, {
			type : "dynamic",
			mass : 1,
			collision : planeCollision
		});
		
		try {
			scene.bind(sceneObj);
			physics.bind(rigidObj);
		} catch( err ) {
			console.log('ERROR on Binding: \t' + err );
		}
		
		result.push({
			//mesh : planeMesh,
			collision : planeCollision
		});
		
		return result;
	}
	
	
	//Create the Floor, given the scene and physics managers.
	function createFloor(scene, physics) {
		var floorMaterial = new CubicVR.Material();
		var floorMesh = new CubicVR.Mesh({
			primitive : {
				type : "box",
				size : 1.0,
				material : {
					specular : [ 0, 0, 0 ],
					shininess : 0.9,
					env_amount : 1.0,
					textures : {
						color : "resources/images/6583-diffuse.jpg"
					}
				},
				uv : {
					projectionMode : "cubic",
					scale : [ 0.05, 0.05, 0.05 ]
				}
			},
			compile : true
		});
		var floorObject = new CubicVR.SceneObject({
			mesh : floorMesh,
			scale : [ 100, 0.2, 100 ],
			position : [ 0, 0, 0 ],
		});
		floorObject.shadowCast = false;
		
		// create floor rigid body
		var rigidFloor = new CubicVR.RigidBody(floorObject, {
			type : "static",
			collision : {
				type : "box",
				size : floorObject.scale
			}
		});
		// bind floor to physics
		physics.bind(rigidFloor);
		// Add SceneObject containing the mesh to the scene
		scene.bind(floorObject);
	}
	
	function setupPlayer(scene,physics) {
    			var playerObj = new CubicVR.SceneObject({
                    mesh:null,
                    position: [0,5,10],
                    rotation:[0,0,0],
                    name:"player"
                });
                
                var playerCollision = new CubicVR.CollisionMap({
                    type: "capsule",
                    radius:1,
                    height:2
                });
                
                var rigidObj = new CubicVR.RigidBody(playerObj, {
                    type: "dynamic",
                    mass: 40,
                    collision: playerCollision
                });
                
                scene.bind(playerObj);
                physics.bind(rigidObj);
                
                rigidObj.setAngularFactor(0);

                return rigidObj;
            }
	
	
	//Main Function
	function webGLStart() {
	
		// Checks
		var gl = CubicVR.init();
		var canvas = CubicVR.getCanvas();
		if (!gl) {
			alert("Sorry, no WebGL support.");
			return;
		};
		

		// Generate the Scene. Add MVC, Physics, Camera & Light
		var scene = new CubicVR.Scene({
			camera : {
				width : canvas.width,
				height : canvas.height,
				fov : 75,
				position : [ 0, 0, 0 ],
				targeted: false
			},
			light : {
				type : "area",
				intensity : 0.9,
				mapRes : 2048,
				areaCeiling : 40,
				areaFloor : -40,
				areaAxis : [ -2, -2 ], // specified in degrees east/west north/south
				distance : 60
			}
		});
		CubicVR.setSoftShadows(true);
		CubicVR.addResizeable(scene);// Add our scene to the window resize list
		mvc = new CubicVR.MouseViewController(canvas, scene.camera);// initialize a mouse view controller
		var physics = new CubicVR.ScenePhysics();// init physics manager
		physics.setGravity([0,0,0]);//Remove Gravity
		
		
		//Camera Player Object
		var camParent = new CubicVR.SceneObject({position:[0,1,0]});
        scene.camera.setParent(camParent);
        
        var player = setupPlayer(scene,physics);   
        player.getSceneObject().bindChild(camParent);
		
       	var playerEvent = player.getSceneObject().addEvent({
            id: "tick",
            action: function(event) {
            	var lus = event.getLastUpdateSeconds();
                var sceneObj = player.getSceneObject();
                
                var linV = player.getLinearVelocity();
                var mMoveSpeed = 1200*lus;
                var slowDown = 500*lus;
                var moved = false;
                
                linV[0] = linV[2] = 0;
                
                if (mvc.isKeyPressed(kbd.KEY_W)) {
                	console.log('Key Handler: W');
			        linV[0] += +Math.sin(-camParent.rotation[1]*Math.PI/180);
			        linV[2] += -Math.cos(-camParent.rotation[1]*Math.PI/180);
                    moved = true;
                }
                if (mvc.isKeyPressed(kbd.KEY_S)) {
                	console.log('Key Handler: S');
			        linV[0] += -Math.sin(-camParent.rotation[1]*Math.PI/180);
			        linV[2] += +Math.cos(-camParent.rotation[1]*Math.PI/180);
                    moved = true;
                }
                if (mvc.isKeyPressed(kbd.KEY_D)) {
                	console.log('Key Handler: D');
			        linV[0] += +Math.sin((-camParent.rotation[1]+90)*Math.PI/180);
			        linV[2] += -Math.cos((-camParent.rotation[1]+90)*Math.PI/180);
                    moved = true;
                }
                if (mvc.isKeyPressed(kbd.KEY_A)) {
                	console.log('Key Handler: A');
			        linV[0] += -Math.sin((-camParent.rotation[1]+90)*Math.PI/180);
			        linV[2] += +Math.cos((-camParent.rotation[1]+90)*Math.PI/180);
                    moved = true;
                }
				
                if (!moved) {
                	linV = player.getLinearVelocity();
                    linV[0] -= 0.98*linV[0]*lus*10;
                    linV[2] -= 0.98*linV[2]*lus*10;
                } else {
                	var d = Math.sqrt(linV[0]*linV[0]+linV[2]*linV[2]);
                    
                    if (d) {
                    	linV[0]/=d;
                        linV[2]/=d;
                        linV[0]*=mMoveSpeed;
                        linV[2]*=mMoveSpeed;
                    }
				}
                
                player.setLinearVelocity(linV);
				
        	},
        });
        
		
		//Create the Floor Object
		createFloor(scene, physics);
		
		//Generate photos
		var objlist = generateObjects(scene, physics);
		
		//Events
		var pickDist = 0;
		var kbd = CubicVR.enums.keyboard;
		var invert = false;
        var mouseSpeed = 0.4;
        
		mvc.setEvents({
			mouseMove: function (ctx, mpos, mdelta, keyState) {
                if (ctx.mdown) {
                	// Quick and Dirty FPS controller
                	var dRad = -camParent.rotation[1]*(Math.PI/180.0);
               		var mDist = Math.sqrt(mdelta[0]*mdelta[0]+mdelta[1]*mdelta[1]);
      					
               		camParent.rotation[1] -= mdelta[0] * mouseSpeed;
                	if (scene.camera.rotation[0]>90) scene.camera.rotation[0] = 90;
                	if (scene.camera.rotation[0]<-90) scene.camera.rotation[0] = -90;
                	scene.camera.rotation[0] -= mdelta[1] * mouseSpeed * (invert?-1:1);
                }
            },
			mouseWheel : function(ctx, mpos, wdelta, keyState) {
				ctx.zoomView(wdelta);
			},
			mouseDown : function(ctx, mpos, keyState) {
				console.log('mouse Down Handler');
				
				var rayTo = scene.camera.unProject(mpos[0],mpos[1]);
				var result = physics.getRayHit(player.getSceneObject().position, rayTo);
				
				if (result) {
					console.log('resultRigidBody: ' + result.rigidBody );
					console.log('resultAMMOBody: ' + result.ammoBody );
				}
			},
			mouseUp : function(ctx, mpos, keyState) {
				console.log('mouse Up Handler');
			},
			keyDown: null,
			keyUp : null
		});
		

		// Start our main drawing loop, it provides a timer and the gl context as parameters
		CubicVR.MainLoop(function(timer, gl) {
			var seconds = timer.getSeconds();
			physics.stepSimulation(timer.getLastUpdateSeconds());
			scene.render();
			physics.triggerEvents();
            scene.runEvents(seconds);
		});
	}
</script>

</head>

<body onLoad="webGLStart();">
<div id="sideBar">
	<form:form id="photoForm" method="POST" commandName="photo" action="rest/Image" enctype="multipart/form-data">
		<form:errors path="*" cssClass="errorblock" element="div" />
		<table>
			
			<tr>
				<td>Image File :</td>
				<td><form:input type="file" path="file" /></td>
				<td><form:errors path="file" cssClass="error" /></td>
			</tr>
			<tr>
				<td>Image Scale :</td>
				<td><form:input path="imageScale" /></td>
				<td><form:errors path="imageScale" cssClass="error" /></td>
			</tr>
			<tr>
				<td>Image X Position :</td>
				<td><form:input path="imageCentreX" /></td>
				<td><form:errors path="imageCentreX" cssClass="error" /></td>
			</tr>
			<tr>
				<td>Image Y Position :</td>
				<td><form:input path="imageCentreY" /></td>
				<td><form:errors path="imageCentreY" cssClass="error" /></td>
			</tr>
			<tr>
				<td>Image Z Position :</td>
				<td><form:input path="imageCentreZ" /></td>
				<td><form:errors path="imageCentreZ" cssClass="error" /></td>
			</tr>
			
			<tr>
				<td colspan="3"><input type="submit" /></td>
			</tr>
		</table>
	</form:form>
</div>
</body>

</html>
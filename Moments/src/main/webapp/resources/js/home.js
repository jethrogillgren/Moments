//Old COde, Not USed

	var scene;
	var physics;
	var sceneObjects = [];
	
	$(document).ready(function() { 
		console.log('jQuery - Document Ready');
	
    	var options = { 
        	//target:        '#sideBar',   // target element(s) to be updated with server response 
        	beforeSubmit:  showRequest,  // pre-submit callback 
        	success:       showResponse,  // post-submit callback 
 		
        	// other available options: 
        	url:       'rest/Image',         // override for form's 'action' attribute 
        	//type:      'post'        // 'get' or 'post', override for form's 'method' attribute 
        	//dataType:  null        // 'xml', 'script', or 'json' (expected server response type) 
        	//clearForm: true        // clear all form fields after successful submit 
        	//resetForm: true        // reset the form after successful submit 
 		
        	// $.ajax options can be used here too, for example: 
       		//timeout:   3000 
   	 	}; 
 
   	 	// bind form using 'ajaxForm' 
    	$('#updatePhotoForm').ajaxForm(options);
	}); 
 
	// pre-submit callback 
	function showRequest(formData, jqForm, options) { 
   		var queryString = $.param(formData); 
   		alert('About to submit: \n\n' + queryString); 
    	return true; 
	} 
 
	// post-submit callback 
	function showResponse(responseText, statusText, xhr, $form)  { 
 	   alert('status: ' + statusText + '\n\nresponseText: \n' + responseText ); 
	}
	
	//messi Pop-Up functions
	function showCreatePanel() {
		Messi.load('/createSideBar' );
	}
	function showUpdatePanel(photoId) {
		Messi.load('/updateSideBar/' + photoId );
	}
	
	//Gets list of all photos IDs - pass them to be loaded
	function loadPhotoIdList() {
		$.ajax({
 			url: "rest/Image/list",
			success:function(data) {
				console.log('rest/Image/list server response: ' + data);
      			var regex = /([\d]+)/g;
      			var matched = null;
      			while ( matched = regex.exec(data) ) {
					loadSceneObject( 'rest/Image/' + matched[0] + '.xml', matched[0] );
				}
      		} 
		});
	}
	
	//Takes a request URL and loads it as a sceneObject
	function loadSceneObject( url, Id ) {
		console.log( 'loadSceneObject(' + url + ')' );
		var sceneObj = new CubicVR.SceneObject( 'resources/xml/sceneObject2.xml' );
		//sceneObj.obj.bb = [ [-10, -5, -5],[10, 5, -5] ];
		//sceneObj.obj.addFace([0, 1, 2, 3]);
		//sceneObj.obj.calcNormals();
		//sceneObj.obj.compile();
		console.log( 'loaded xml sceneObj: ' );
		console.log( sceneObj );
		
		var planeCollision = new CubicVR.CollisionMap({
			type : "box",
			size: [5, 5, 0.01]
		});
		var rigidObj = new CubicVR.RigidBody(sceneObj, {
			type : "dynamic",
			mass : 1,
			collision : planeCollision
		});
		console.log( 'created rigidObj' );
		
		try {
			console.log('binding sceneObject ' + Id + ' to scene & physics managers');
			scene.bind(sceneObj);
			physics.bind(rigidObj);
		} catch( err ) {
			console.log('ERROR on Binding: \t' + err );
		}
		
		sceneObjects.push({
			sceneObj : sceneObj,
			planeCollision : planeCollision,
			Id: Id
			
		});
		console.log('Finished creating sceneObject ' + Id + '\n');
	}
	
	//DEPRECIATED
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
                	[-10, 5, -5],[-10, -5, -5], // TL, BL
                	[10, -5, -5],[10, 5, -5]//BR, TR
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
		console.log( 'HardCoded sceneObject:' );
		console.log( sceneObj );
		
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
	
	//
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
	
	//Main webGL Function
	function webGLStart() {
	
		// Checks
		var gl = CubicVR.init();
		var canvas = CubicVR.getCanvas();
		if (!gl) {
			alert("Sorry, no WebGL support.");
			return;
		};
		

		// Generate the Scene. Add MVC, Physics, Camera & Light
		scene = new CubicVR.Scene({
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
		physics = new CubicVR.ScenePhysics();// init physics manager
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
		//createFloor(scene, physics);
		
		//Generate photos
		//generateObjects(scene, physics);
		loadPhotoIdList();
		
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
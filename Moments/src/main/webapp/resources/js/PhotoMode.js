var PhotoModeSelectedPhoto;
var positionTween;
var rotationTween;

function TweenToPhoto() {

	PhotoModeSelectedPhoto.updateMatrixWorld();
	
	var worldPhotoPosition = PhotoModeSelectedPhoto.matrixWorld.multiplyVector3(new THREE.Vector3);
	positionTween = new TweenLite(getCameraObject().position, 0.75, {
			x:worldPhotoPosition.x,
			y:worldPhotoPosition.y,
			z:(worldPhotoPosition.z+100),
			
			ease:Power2.easeOut,
			onComplete:TweenComplete
	});
	
	//getCameraObject().lookAt( 0, 0, 0 );
	
	/*
	var worldPhotoRotation = PhotoModeSelectedPhoto.matrixRotationWorld;
	rotationTween = new TweenLite(getCameraObject().matrixRotationWorld, 0.5, {
			
			x:worldPhotoRotation.x,
			y:worldPhotoRotation.y,
			z:(worldPhotoRotation.z),
			
			ease:Power2.easeOut,
	});*/

	logObj("Camera Rotation", getCameraObject().quaternion );
	logObj("Photo Rotation", PhotoModeSelectedPhoto.quaternion );
	
	openDatGuiForPhoto( PhotoModeSelectedPhoto );
}
function cancelTween() {
	positionTween.kill();
	rotationTween.kill();
}

//Called when we enter Photo mode and successfully tween to the selected photo.
function TweenComplete() {
	$(window).trigger("PhotoTweenCompleted", "Pointer Successfully Locked");
	
}

function PhotoModeClickHandler() {
	enterFreeMode();
}
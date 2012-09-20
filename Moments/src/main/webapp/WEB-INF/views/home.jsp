<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<html>
<head>

<script src="resources/js/ammo.js" type="text/javascript"></script>
<script src="resources/js/CubicVR.js" type="text/javascript"></script>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.js"></script> 
<script src="http://malsup.github.com/jquery.form.js"></script> 
<script src="resources/js/messi.js" type="text/javascript"></script>
<link rel="stylesheet" href="resources/css/messi.css" />

<script src="resources/js/home.js" type="text/javascript"></script>
<link rel="stylesheet" href="resources/css/home.css" />

</head>

<body onLoad="webGLStart();">
<div id="sideBar">
	<span>New Model</span>
	<form:form id="createPhotoForm" method="PUT" commandName="photo" action="rest/Image" enctype="multipart/form-data">
		<form:errors path="*" cssClass="errorblock" element="div" />
		<table>
			
			<tr>
				<td>Image File :</td>
				<td><form:input type="file" path="file" /></td>
				<td><form:errors path="file" cssClass="error" /></td>
			</tr>
			
			<tr>
				<td colspan="3"><input type="submit" /></td>
			</tr>
		</table>
	</form:form>
	<hr>
	<span>Update Existing Model</span>
	<form:form id="updatePhotoForm" method="POST" commandName="photoToUpdate" action="rest/Image" enctype="multipart/form-data">
		<form:errors path="*" cssClass="errorblock" element="div" />
		<table>
			
			<tr>
				<td>Id :</td>
				<td><form:input path="id" /></td>
				<td><form:errors path="id" cssClass="error" /></td>
			</tr>
			<tr>
				<td>Position :</td>
				<td><form:input path="position" /></td>
				<td><form:errors path="position" cssClass="error" /></td>
			</tr>
			<tr>
				<td>Points :</td>
				<td><form:input path="mesh.points" /></td>
				<td><form:errors path="mesh.points" cssClass="error" /></td>
			</tr>
			
			<tr>
				<td colspan="3"><input type="submit" /></td>
			</tr>
		</table>
	</form:form>
</div>
</body>

</html>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<div id="sideBarInner">
	<span>Update Side Bar View with Photo model Injected</span>
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
				<td>Rotation :</td>
				<td><form:input path="rotation" /></td>
				<td><form:errors path="rotation" cssClass="error" /></td>
			</tr>
			<tr>
				<td>Size :</td>
				<td><form:input path="mesh.primitive.size" /></td>
				<td><form:errors path="mesh.primitive.size" cssClass="error" /></td>
			</tr>
			
			<tr>
				<td colspan="3"><input type="submit" /></td>
			</tr>
		</table>
	</form:form>
</div>
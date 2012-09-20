package com.jethro.photofield.model;

import java.sql.Blob;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

import org.apache.commons.lang.NotImplementedException;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.validator.constraints.NotEmpty;

@Entity
@Table( name = "photos" )
@XmlRootElement(name = "sceneObject")
@JsonAutoDetect
@DynamicUpdate
public class Photo implements java.io.Serializable {	
	
	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.AUTO)
	@XmlTransient
	private Integer id;
	
	@Lob
	@NotNull
	@XmlTransient
	@Column(updatable = false )
	private Blob file;
	
	@NotEmpty
	@XmlTransient
	private String imageName = "Untitled";
	
	@NotNull
	private String position = "0, 0, 0";
	
	@NotNull
	@Embedded
	private Mesh mesh = new Mesh();
	
	@Embeddable
	public static class Mesh implements java.io.Serializable {
		
		@NotNull
		private boolean compile = true;
		public boolean isCompile() {return compile;}
		public void setCompile(boolean compile) {this.compile = compile;}
		
		@NotNull
		private String uv = "" +
				"[0, 1],[0, 0],[1, 0],[1, 1] " +
				"";
		public String getUv() {return uv;}
		public void setUv(String uv) {this.uv = uv;}
		
		@NotNull
		private String points = "" +
				"[-10, 5, -5],[-10, -5, -5], " +// TL, BL
				"[10, -5, -5],[10, 5, -5]" +//BR, TR
				"";
		
		//TODO setPoints taking width and height vals?
		public String getPoints() {return points;}
		public void setPoints(String points) {this.points = points;}

		@NotNull
		private String faces = "" +
				"[0, 1, 2, 3]" +
				"";
		public String getFaces() {return faces;}
		public void setFaces(String faces) {this.faces = faces;}
		
		@Embedded
		private Material material = new Material();
		@Embeddable
		public static class Material implements java.io.Serializable {
			
			@Embedded
			private Textures textures = new Textures();
			@Embeddable
			public static class Textures implements java.io.Serializable {
				
				@NotNull
				private String color = "resources/images/default.jpg";

				public String getColor() {return color;}
				public void setColor(String color) {color = color;}
			}
			
			public Textures getTextures() {return textures;}
			public void setTextures(Textures textures) {this.textures = textures;}
		}
		public Material getMaterial() {return material;}
		public void setMaterial(Material material) {this.material = material;}
		
	}
	
	@XmlTransient
	public Integer getId() { return id; }
	public void setId(Integer id) { this.id = id; }
	@XmlTransient
	public Blob getFile() {return file;}
	public void setFile(Blob file) {this.file = file;}
	@XmlTransient
	public String getImageName() {return imageName;}
	public void setImageName(String imageName) {this.imageName = imageName;}
	
	public Mesh getMesh() {return mesh;}
	public void setMesh(Mesh mesh) {this.mesh = mesh;}
	public String getPosition() {return position;}
	public void setPosition(String position) {this.position = position;}

}

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

import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.validator.constraints.NotEmpty;

@Entity
@Table( name = "photos" )
@XmlRootElement(name = "sceneObject")
@JsonAutoDetect
@DynamicUpdate
public class Photo2 implements java.io.Serializable {	
	
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
	private String rotation = "0, 0, 0";
	
	@NotNull
	@Embedded
	private Mesh mesh = new Mesh();
	
	@Embeddable
	public static class Mesh implements java.io.Serializable {
		
		@NotNull
		private boolean compile = true;
		
		public boolean isCompile() {return compile;}
		public void setCompile(boolean compile) {this.compile = compile;}
		
		@Embedded
		private Primitive primitive = new Primitive();
		@Embeddable
		public static class Primitive implements java.io.Serializable {
			
			@NotNull
			private String type = "box";
			@NotNull
			private String size = "5, 5, 0.01";
			
			@Embedded
			private Material material = new Material();
			@Embeddable
			public static class Material implements java.io.Serializable {
				
				@Embedded
				private Textures textures = new Textures();
				@Embeddable
				public static class Textures implements java.io.Serializable {
					
					@NotNull
					private String Color = "resources/images/TestPhoto.jpg";

					public String getColor() {return Color;}
					public void setColor(String color) {Color = color;}
				}
				
				public Textures getTextures() {return textures;}
				public void setTextures(Textures textures) {this.textures = textures;}
			}
			
			@Embedded
			private UV uv = new UV();
			@Embeddable
			public static class UV implements java.io.Serializable {
				
				@NotNull
				private String projectionMode = "cubic";
				
				@NotNull
				private String scale = "5, 5, 5";
				
				public String getProjectionMode() {return projectionMode;}
				public void setProjectionMode(String projectionMode) {this.projectionMode = projectionMode;}
				public String getScale() {return scale;}
				public void setScale(String scale) {this.scale = scale;}
			}
			
			public String getType() {return type;}
			public void setType(String type) {this.type = type;}
			public String getSize() {return size;}
			public void setSize(String size) {this.size = size;}
			
			public Material getMaterial() {return material;}
			public void setMaterial(Material material) {this.material = material;}
			public UV getUv() {return uv;}
			public void setUv(UV uv) {this.uv = uv;}
		}
		
		public Primitive getPrimitive() {return primitive;}
		public void setPrimitive(Primitive primitive) {this.primitive = primitive;}
		
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
	public String getRotation() {return rotation;}
	public void setRotation(String rotation) {this.rotation = rotation;}
}

package com.jethro.photofield.model;

import java.sql.Blob;
import java.sql.SQLException;

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
@Table( name = "photos3" )
@XmlRootElement(name = "photo3")
@JsonAutoDetect
@DynamicUpdate
public class Photo3 implements java.io.Serializable {	
	
	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	
	@Lob
	@NotNull
	@Column(updatable = false )
	private Blob file;
	
	@NotEmpty
	private String imageName = "Untitled";
	
	private String imageCaption = "";
	
	@NotNull
	private String position = "0, 0, 0";
	
	@NotNull
	@Column(name="rotation")
	private String rotation = "0, 0, 0";
	
	@NotNull
	private String scale = "1, 1, 1";
	
	
	public Integer getId() { return id; }
	public void setId(Integer id) { this.id = id; }
	
	@XmlTransient
	public Blob getFile() {return file;}
	public void setFile(Blob file) {this.file = file;}
	
	public String getImageName() {return imageName;}
	public void setImageName(String imageName) {this.imageName = imageName;}
	public String getPosition() {return position;}
	public void setPosition(String position) {this.position = position;}
	public String getRotation() {return rotation;}
	public void setRotation(String rotation) {this.rotation = rotation;}
	public String getScale() {return scale;}
	public void setScale(String scale) {this.scale = scale;}
	public String getImageCaption() {return imageCaption;}
	public void setImageCaption(String imageCaption) {this.imageCaption = imageCaption;}
}

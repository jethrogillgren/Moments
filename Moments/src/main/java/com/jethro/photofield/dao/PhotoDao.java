package com.jethro.photofield.dao;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.jethro.photofield.model.Photo;

public interface PhotoDao {
	
	public List<Integer> getIds();
	public Photo get( Integer id );
	
	public void save( Photo photo, MultipartFile file );
	
	public void update(Photo photo);
	
	public void delete(Photo photo);
	public void deleteById(Integer id);
	
	
}

package com.jethro.photofield.dao;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import com.jethro.photofield.model.Photo3;

public interface PhotoDao {
	
	public List<Integer> getIds();
	public Photo3 get( Integer id );
	
	public void save( Photo3 photo, MultipartFile file );
	
	public void update(Photo3 photo);
	
	public void delete(Photo3 photo);
	public void deleteById(Integer id);
	
	
}

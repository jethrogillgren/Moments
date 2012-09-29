package com.jethro.photofield.controller;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.Locale;

import javassist.NotFoundException;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.jethro.photofield.dao.PhotoDao;
import com.jethro.photofield.model.Photo3;

/**
 * Handles requests for the photo DAO.
 */
@Controller
@RequestMapping(value = "/rest")
public class ImageController {
	
	private static final Logger logger = LoggerFactory.getLogger(ImageController.class);
	
	@Autowired
	PhotoDao photoDao;
	
	/**
	 * Return list of all Image IDs
	 */
	@RequestMapping(value = "/Image/list", method = RequestMethod.GET)
	@ResponseBody
	public String getAllImages( Locale locale, ModelMap model ) {
		logger.info("GET /Image/list");
		return photoDao.getIds().toString();
	}
	
	/**
	 * Return Specific Image Representation
	 * @throws NotFoundException //TODO
	 */
	@RequestMapping(value = "/Image/{id}", method = RequestMethod.GET)
	//@ResponseBody
	public Photo3 getImageById( Locale locale, ModelMap model,
			HttpServletResponse response,
			@PathVariable Integer id )  {
		logger.info("GET /Image/{" + id + "}");
		if ( id == null ) {
			logger.info("GET /Image/{" + id + "} - ID is Invalid");
			try {
				response.sendError(404, "Photo with ID " + id + "was not found");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return null;
		} else {
			return photoDao.get( id );
		}
		//Photo testPhoto = new Photo();
		//return testPhoto;
	}
	
	/**
	 * Return Specific Image's Data
	 * @throws NotFoundException //TODO Handle Exceptions nicely. Custom 404 & response codes coded better?
	 * 
	 */
	@RequestMapping("/ImageData/{id}")
    @ResponseBody
    public void getImageDataById( HttpServletResponse response,
    		@PathVariable Integer id ) {
		logger.info("GET /ImageData/{" + id + "}");
		
		if ( id == null ) {
			logger.info("GET /Image/{" + id + "} - ID is Invalid");
			
			try {
				response.sendError(404, "Photo Data with ID " + id + "was not found");
				
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		} else {
			
			byte[] bytes = null;
			try {
				
				Blob blob = photoDao.get( id ).getFile();
				bytes = blob.getBytes( 1, (int) blob.length() );
				response.setContentType("image/jpeg");
				response.setContentLength( bytes.length );
				
				ServletOutputStream out = response.getOutputStream();
				out.write(bytes);
				out.flush();  
				 
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				try {
					response.sendError(404, "Photo Data with ID " + id + "was not found");
					
				} catch (IOException e2) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				try {
					response.sendError(404, "Photo Data with ID " + id + "was not found");
					
				} catch (IOException e2) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			} catch (NullPointerException e) {
				// TODO Auto-generated catch block
				try {
					response.sendError(404, "Photo Data with ID " + id + "was not found");
					
				} catch (IOException e2) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				e.printStackTrace();
				
			}
		}
    }
	
	/**
	 * Create a new Image
	 */
	@RequestMapping(value = "/Image", method = RequestMethod.PUT)
	@ResponseBody
	public String create( @Valid Photo3 photo, BindingResult result,
						@RequestParam("file") MultipartFile file) {
		logger.info("PUT /Image");
		photoDao.save( photo, file );
		return "{success:true}";
	}
	
	/**
	 * Update the Image
	 */
	@RequestMapping(value = "/Image", method = RequestMethod.POST)
	@ResponseBody
	public String update( @Valid Photo3 photo, BindingResult result) {
		logger.info("POST /Image recieved the photo update with Position: " + photo.getPosition() );
		
		photoDao.update( photo );
		return "{success:true}";
	}
	
	/**
	 * Remove the Image
	 */
	@RequestMapping(value = "/Image/{id}", method = RequestMethod.DELETE)
	//@ResponseBody
	public String delete(Locale locale, ModelMap model,
			@PathVariable Integer id) {
		logger.info("DELETE /Image/{" + id + "}");
		photoDao.deleteById( id );
		return null;
	}
}

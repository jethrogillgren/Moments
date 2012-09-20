package com.jethro.photofield.controller;

import java.io.IOException;
import java.util.Locale;

import javassist.NotFoundException;

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
import com.jethro.photofield.model.Photo;

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
	 * Return Specific Image
	 * @throws NotFoundException 
	 */
	@RequestMapping(value = "/Image/{id}", method = RequestMethod.GET)
	//@ResponseBody
	public Photo getImageById( Locale locale, ModelMap model,
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
	 * Create a new Image
	 */
	@RequestMapping(value = "/Image", method = RequestMethod.PUT)
	@ResponseBody
	public String create( @Valid Photo photo, BindingResult result,
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
	public String update( @Valid Photo photo, BindingResult result) {
		logger.info("POST /Image");
		
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

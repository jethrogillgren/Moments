package com.jethro.photofield.controller;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.jethro.photofield.dao.PhotoDao;
import com.jethro.photofield.model.Photo3;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@Autowired
	PhotoDao photoDao;
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		logger.info("/ - Returning 'home' view");
		
		model.addAttribute("photo", new Photo3() );
		//model.addAttribute("photoToUpdate", photoDao.get( 1 ) );//Testing the SideBar
		
		return "index";
	}
	
	/**
	 * Returns the Update Image Sidebar, with the specified model as a form backing object
	 */
	@RequestMapping(value = "/TEST", method = RequestMethod.GET)
	public String updateSideBar(Locale locale, Model model ) {
		logger.info("/TEST/ Controller Called");
		
		//model.addAttribute("photoToUpdate", photoDao.get( modelid ) );

		return "FPStest";
	}
	
}
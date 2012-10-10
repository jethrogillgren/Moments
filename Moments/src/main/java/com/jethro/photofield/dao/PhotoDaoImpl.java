package com.jethro.photofield.dao;

import java.io.IOException;
import java.sql.Blob;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Hibernate;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.jethro.photofield.controller.ImageController;
import com.jethro.photofield.model.Photo3;

@Repository( "photoDao" )
//@Transactional
public class PhotoDaoImpl implements PhotoDao {
	
	private static final Logger logger = LoggerFactory.getLogger(PhotoDaoImpl.class);
	
	@Autowired
	SessionFactory sessionFactory;//sessionFactory.getCurrentSession().
	
	
	@Override
	@Transactional
	//@ResponseBody
	public List<Integer> getIds() {
		logger.info( "getIds()" );
		//List<Photo> photos = sessionFactory.getCurrentSession().createQuery("FROM Photo").list();
		
		Criteria crit = sessionFactory.getCurrentSession().createCriteria(Photo3.class);
		ProjectionList proList = Projections.projectionList();
		proList.add(Projections.property("id"));
		crit.setProjection(proList);
		List<Integer> list = crit.list();
		
		logger.info( "getIds() - Returning Valid Photo Id's: " + list.toString() );
		
		return list;
	}
	
	@Override
	@Transactional
	//@ResponseBody
	public Photo3 get(Integer id) {
		logger.info( "PhotoDaoImpl.get(" + id + ")" );
		return (Photo3) sessionFactory.getCurrentSession().get( Photo3.class, id );
		
	}

	
	@Override
	@Transactional
	//@ResponseBody
	public Photo3 save(Photo3 photo, MultipartFile file) {
		logger.info( "PhotoDaoImpl.save(Photo2)  id:" + photo.getId() + "  name:" + photo.getImageName() + "   fileName: " + file.getOriginalFilename() );
		Session sess = sessionFactory.getCurrentSession();
		try {
            Blob blob = Hibernate.getLobCreator( sess ).createBlob(  file.getBytes() );
            photo.setFile( blob );
            photo.setImageName( file.getOriginalFilename() );
            
        } catch (IOException e) {
            e.printStackTrace();
        }
		
		sess.save( photo );
		return photo;
	}
	
	
	@Override
	@Transactional
	//@ResponseBody
	public void update(Photo3 photo) {
		logger.info( "PhotoDaoImpl.update(Photo2)  id:" + photo.getId() + "  name:" + photo.getImageName() );
		Session sess = sessionFactory.getCurrentSession();
		
		if( photo.getId() == null ) {
			logger.info( "PhotoDaoImpl.update - photo.getId == null" );
			//sess.save( photo );TODO Handle this
		} else {
			sess.merge( photo );
		}
	}
	
	
	@Override
	@Transactional
	//@ResponseBody
	public void delete( Photo3 photo ) {
		logger.info( "PhotoDaoImpl.delete()" );
		sessionFactory.getCurrentSession().delete( photo );
	}

	@Override
	@Transactional
	//@ResponseBody
	public void deleteById( Integer id ) {
		logger.info( "PhotoDaoImpl.deleteById(" + id + ")" );
		delete( get( id ) );
	}
}

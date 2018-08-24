package com.bridgeit.todo.notes.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.bridgeit.todo.labels.model.Label;
import com.bridgeit.todo.notes.model.Notes;
import com.bridgeit.todo.user.model.User;

@Repository
public class NoteDaoImpl implements NoteDao {

	@Autowired
	SessionFactory sessionFactory;

	
//<============================= Create Note ===============================>
	
	@Override
	public int insert(Notes note) {
       
		System.out.println(note.getTitle());
		System.out.println(note.getDescription());
		int result = (Integer) sessionFactory.getCurrentSession().save(note);
		return result;

	}
	
//<==================================== Update Note ===============================>	

	@Override
	public void update(Notes note){
		Session session =  sessionFactory.getCurrentSession();	
		
		session.merge(note);
		
	}
	
	
//<=================================== Get Label ById ================================>	
	
	@Override
	public Label getlabelById(int id) {
		Session session = sessionFactory.getCurrentSession();
		return session.get(Label.class, id);
	}
	
	
//<============================== Get Note ById ======================================>	
	
	@Override
	public Notes getNoteById(int id) {
	
		Criteria criteria = sessionFactory.openSession().createCriteria(Notes.class).add(Restrictions.eq("id", id));
		 Notes note =  (Notes) criteria.uniqueResult();
	        return note ;
	}
	
	
//<=========================================== Get All Notes ===============================>	

	@Override
	public List<Notes> getAllNotes(User user) {
		Criteria criteria = sessionFactory.openSession().createCriteria(Notes.class).add(Restrictions.eq("user", user));
		List<Notes> list=criteria.list();
		return  list;
	}
	
//<================================== Delete Note =======================================>	

	@Override
	public void deleteNote(Notes note) {
		
		Session session=sessionFactory.getCurrentSession();
		Notes note2=session.byId(Notes.class).load(note.getId());
		sessionFactory.getCurrentSession().delete(note2);
		
	}

//<========================================= Note Exist =================================>
	
	@Override
	public boolean isExist(int id) {
		
		Criteria criteria = sessionFactory.openSession().createCriteria(Notes.class).add(Restrictions.eq("id",id));
		  
	     Notes note = (Notes) criteria.uniqueResult();
		
		return note!=null?true:false;
	}
	
}

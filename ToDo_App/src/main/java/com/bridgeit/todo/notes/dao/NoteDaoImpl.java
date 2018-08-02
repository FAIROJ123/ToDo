package com.bridgeit.todo.notes.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.bridgeit.todo.notes.model.Notes;
import com.bridgeit.todo.user.model.User;

@Repository
public class NoteDaoImpl implements NoteDao {

	@Autowired
	SessionFactory sessionFactory;

	@Override
	public int insert(Notes note) {
       
		System.out.println(note.getTitle());
		System.out.println(note.getDescription());
		int result = (Integer) sessionFactory.getCurrentSession().save(note);
		return result;

	}

	@Override
	public void update(Notes note){
		Session session =  sessionFactory.getCurrentSession();	
		
		session.merge(note);
		
	}

	@Override
	public Notes getNoteById(int id) {
	
		Criteria criteria = sessionFactory.openSession().createCriteria(Notes.class).add(Restrictions.eq("id", id));
		 Notes note =  (Notes) criteria.uniqueResult();
	        return note ;
	}

	@Override
	public List<Notes> getAllNotes(User user) {
		Criteria criteria = sessionFactory.openSession().createCriteria(Notes.class).add(Restrictions.eq("user", user));
		List<Notes> list=criteria.list();
		return  list;
	}

	@Override
	public void deleteNote(Notes note) {
		
		Session session=sessionFactory.getCurrentSession();
		Notes note2=session.byId(Notes.class).load(note.getId());
		sessionFactory.getCurrentSession().delete(note2);
		
	}

	

	

	
	
}

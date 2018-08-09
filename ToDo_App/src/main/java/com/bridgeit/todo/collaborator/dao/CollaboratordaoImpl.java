package com.bridgeit.todo.collaborator.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.bridgeit.todo.collaborator.model.Collaborator;
import com.bridgeit.todo.labels.model.Label;
import com.bridgeit.todo.user.model.User;

@Repository
public class CollaboratordaoImpl implements Collaboratordao{

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public int addCollaborator(Collaborator collaborator) {
		int result = (Integer) sessionFactory.getCurrentSession().save(collaborator);
		return result;
	}

	@Override
	public List<Collaborator> getallCollaborators(User user) {
		Criteria criteria = sessionFactory.openSession().createCriteria(Collaborator.class).add(Restrictions.eq("user", user));
		List<Collaborator> list=criteria.list();
		return  list;
	}

	@Override
	public Collaborator getCollaboratorById(int id) {
		Session session=sessionFactory.getCurrentSession();
		  return session.get(Collaborator.class, id);
	}

	@Override
	public int isUserExist(Collaborator collaborator) {
		Session session = sessionFactory.getCurrentSession();
		
		Criteria criteria = session.createCriteria(Collaborator.class).add(Restrictions.eq("email", collaborator.getEmail()))
				.setProjection(Projections.count("email"));

		int count = (Integer) criteria.uniqueResult();

		return count;	
	}

	@Override
	public void update(Collaborator collaborator) {
System.out.println("Inside UPDATE::"+collaborator.getId());
		
		Session session = sessionFactory.getCurrentSession();
		session.update(collaborator);
		
	}

	@Override
	public void delete(Collaborator collaborator) {
		sessionFactory.getCurrentSession().delete(collaborator);
		
	}

	
	
}

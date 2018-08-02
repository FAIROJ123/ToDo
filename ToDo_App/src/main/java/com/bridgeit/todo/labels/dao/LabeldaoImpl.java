package com.bridgeit.todo.labels.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.bridgeit.todo.labels.model.Label;
import com.bridgeit.todo.notes.model.Notes;
import com.bridgeit.todo.user.model.User;

@Repository
public class LabeldaoImpl implements Labeldao{

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public int createlabel(Label label) {
		int result = (Integer) sessionFactory.getCurrentSession().save(label);
		return result;

		
	}

	@Override
	public List<Label> getallLabels(User user) {
		Criteria criteria = sessionFactory.openSession().createCriteria(Label.class).add(Restrictions.eq("user", user));
		List<Label> list=criteria.list();
		return  list;
	}

	

	@Override
	public Label getlabelById(int id) {
		 Session session=sessionFactory.getCurrentSession();
		  return session.get(Label.class, id);
	}

	@Override
	public int isUserExist(Label label) {
		Session session = sessionFactory.getCurrentSession();
	
		Criteria criteria = session.createCriteria(Label.class).add(Restrictions.eq("labelname", label.getLabelname()))
				.setProjection(Projections.count("labelname"));

		int count = (Integer) criteria.uniqueResult();

		return count;		
	}

	@Override
	public void update(Label label) {
		System.out.println("Inside UPDATE::"+label.getId());
		
		Session session = sessionFactory.getCurrentSession();
		session.update(label);
		//System.out.println("Inside UPDATE::"+label.getId());
	
	}

	@Override
	public void deleteLabel(Label label) {
		
		sessionFactory.getCurrentSession().delete(label);	
	}

	

}

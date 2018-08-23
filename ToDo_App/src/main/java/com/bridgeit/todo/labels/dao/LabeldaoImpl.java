package com.bridgeit.todo.labels.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.bridgeit.todo.labels.model.Label;
import com.bridgeit.todo.notes.dao.NoteDao;
import com.bridgeit.todo.notes.model.Notes;
import com.bridgeit.todo.user.model.User;

@Repository
public class LabeldaoImpl implements Labeldao {

	private static final Object Label_id = null;
	private static final Object id = null;
	@Autowired
	private SessionFactory sessionFactory;
	
	@Autowired
	private NoteDao notedao;

//<======================= Create Label ======================>
	
	
	@Override
	public int createlabel(Label label) {
		int result = (Integer) sessionFactory.getCurrentSession().save(label);
		return result;

	}
	
//<==========================GetAll Labels ===========================>	

	@Override
	public List<Label> getallLabels(User user) {
		Criteria criteria = sessionFactory.openSession().createCriteria(Label.class).add(Restrictions.eq("user", user));
		List<Label> list = criteria.list();
		return list;
	}
	
//<========================= GetLAbel ById ===========================>	
	

	@Override
	public Label getlabelById(int id) {
		Session session = sessionFactory.getCurrentSession();
		return session.get(Label.class, id);
	}
	
	
//<================================== User Exist ============================>	

	@Override
	public int isUserExist(Label label) {
		Session session = sessionFactory.getCurrentSession();

		Criteria criteria = session.createCriteria(Label.class).add(Restrictions.eq("labelname", label.getLabelname()))
				.setProjection(Projections.count("labelname"));

		int count = (Integer) criteria.uniqueResult();

		return count;
	}
	
//<================================== Update Label ====================================>	

	@Override
	public void update(Label label) {

	Session session = sessionFactory.getCurrentSession();
		session.update(label);
	
	}
	
//<===================================== Delete Label ====================================>	

	@Override
	public boolean deleteLabel(Label label) {
		
		String Query = "delete from Label where id=:Label_id";
		Query q1 = sessionFactory.getCurrentSession().createQuery(Query);
		q1.setParameter("Label_id", label.getId());
		int finalresult = q1.executeUpdate();
		System.out.println("result:"+finalresult);
		return true;
		
	}


//<============================== Delete Label ====================================>

	@Override
	public boolean deleteLabelfromNote(Label label) {
		
		
		System.out.println("inside delete...");
	
		String deleteQuery = "delete from Label_Notes where (Label_Label_id) in (select Label_id from Label where Label_id=?)";
		Query q = sessionFactory.getCurrentSession().createQuery(deleteQuery);
		q.setParameter("Label_id", label.getId());
		int result = q.executeUpdate();
		System.out.println("result:"+result);
		return true;
		
	}
}

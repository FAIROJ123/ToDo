package com.bridgeit.todo.user.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.bridgeit.todo.user.model.User;







@Repository
public class UserDaoImpl implements UserDao {

	@Autowired
	SessionFactory sessionFactory;
	
//<=========================== Check Login =================================>
	
	public boolean checkLogin(String email, String password) {
		 
				System.out.println("In Check login");
				Session session = sessionFactory.openSession();
				
		
				String SQL_QUERY ="from User as u where u.email=?0 and u.password=?1";
				Query query = session.createQuery(SQL_QUERY);
				query.setParameter(0,email);
				query.setParameter(1,password);
				List<User> list = query.list();

				
				return list !=null?true:false;              
	       
	}


//<================================ Save User Details =================================>	
	
	@Override
	public int insert(User user) {
	
		System.out.println(user.getEmail());
		
		System.out.println(user.getName());
		System.out.println(user.getPassword());
		System.out.println(user.getMobileNumber());
		  System.out.println("r3");
      int result = (Integer) sessionFactory.getCurrentSession().save(user);
     return result;
	}

	
//<========================================= GetUser ById ==================================>	

	@Override
	public User getUserById(int id) {
		
	     Criteria criteria = sessionFactory.getCurrentSession().createCriteria(User.class).add(Restrictions.eq("id", id));
	  
	     User user = (User) criteria.uniqueResult();
	        return user;
	    }


//<========================================= Update User ==================================>	
	
	@Override
	public boolean update(User user) {
		
		sessionFactory.getCurrentSession().update(user);
		return true;
	}

//<======================================== User Exist ====================================>
	
	@Override
	public boolean isExist(String email) {
		System.out.println("sUdhshfc");
		Criteria criteria = sessionFactory.openSession().createCriteria(User.class).add(Restrictions.eq("email",email));
		  
	     User user = (User) criteria.uniqueResult();
		
		return user!=null?true:false;
	}


//<====================================== Get User By Email ==================================>
	
	@Override
	public User getUserByEmail(String email) {
		Criteria criteria = sessionFactory.openSession().createCriteria(User.class).add(Restrictions.eq("email", email));
		 User user = (User) criteria.uniqueResult();
	        return user;
	}

//<====================================== Get All Users =============================>	
	@Override
	public List<User> getallusers() {
		Session session=sessionFactory.getCurrentSession();
		Query q = session.createQuery("select email,id from User ");
		List<User> list = q.list();
		return list;
		
		
	}
	
}

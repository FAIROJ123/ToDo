package com.bridgeit.todo.collaborator.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bridgeit.todo.collaborator.dao.Collaboratordao;
import com.bridgeit.todo.collaborator.model.Collaborator;
import com.bridgeit.todo.user.dao.UserDao;
import com.bridgeit.todo.user.model.User;
import com.bridgeit.todo.user.utility.Jwt;

@Service
public class CollaboratorserviceImpl implements Collaboratorservice{

	@Autowired
	private Collaboratordao collaboratordao;
		
	@Autowired
	private UserDao userdao;

	@Transactional
	@Override
	public int addCollaborator(Collaborator collaborator, String token) {
		int id = Jwt.parseJWT(token);
		User user = userdao.getUserById(id);
		collaborator.setUser(user);
		return collaboratordao.addCollaborator(collaborator);
	}

	@Transactional
	@Override
	public List<Collaborator> getAllCollaborators(String token) {
		int id = Jwt.parseJWT(token);
		User user = userdao.getUserById(id);

		List<Collaborator> listofCollaborators = collaboratordao.getallCollaborators(user);
		return listofCollaborators;
	}
	

	@Transactional
	@Override
	public void deleteCollaborator(int collaboratorid, String token) {
		System.out.println("id coll:"+collaboratorid);
		int id = Jwt.parseJWT(token);	
		System.out.println("UserId:" + id);
	
		 Collaborator collaborator=collaboratordao.getCollaboratorById(collaboratorid);
		 System.out.println("Collaborator:"+collaborator);
		 System.out.println("Collaborator: "+collaborator.getUser());
		 int userid = collaborator.getUser().getId();
		
		if (userid == id)
		{
			
			collaboratordao.delete(collaborator);;
		
		}
		
	}

	@Transactional
	@Override
	public boolean update(Collaborator collaborator, String token, int collaboratorid) {
		int id = Jwt.parseJWT(token);
		User user = userdao.getUserById(id);
		Collaborator collaborator1= collaboratordao.getCollaboratorById(id);
		collaborator1.setEmail(collaborator.getEmail());;
		if(user.getId()!= collaborator1.getUser().getId()) {
			return false;	
		}
		
		System.out.println("Pre collaborator:::"+collaborator1.getEmail());
		collaboratordao.update(collaborator1);
		return true;
	}

	@Transactional
	@Override
	public List<User> getAllUsers() {
		List<User> list=collaboratordao.getallusers();
		return list;
	}

	
}

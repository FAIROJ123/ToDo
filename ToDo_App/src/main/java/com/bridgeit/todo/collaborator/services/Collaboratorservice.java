package com.bridgeit.todo.collaborator.services;

import java.util.List;

import com.bridgeit.todo.collaborator.model.Collaborator;
import com.bridgeit.todo.user.model.User;

public interface Collaboratorservice {
	
	public int addCollaborator(Collaborator collaborator,String token);

	public List<Collaborator> getAllCollaborators(String token);

	public void deleteCollaborator(int collaboratorid, String token);

	public boolean update(Collaborator collaborator, String token, int id);

	public List<User> getAllUsers();
	
	
	/*public List<Notes> getlabelNotes(int id, String token);*/
}

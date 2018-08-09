package com.bridgeit.todo.collaborator.dao;

import java.util.List;

import com.bridgeit.todo.collaborator.model.Collaborator;
import com.bridgeit.todo.user.model.User;

public interface Collaboratordao {
	public int addCollaborator(Collaborator collaborator);

	public List<Collaborator> getallCollaborators(User user);
	public Collaborator getCollaboratorById(int id);

	public int isUserExist(Collaborator collaborator);

	public void update(Collaborator collaborator);

	public void delete(Collaborator collaborator);

}

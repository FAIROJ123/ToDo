package com.bridgeit.todo.labels.dao;

import java.util.List;

import com.bridgeit.todo.labels.model.Label;
import com.bridgeit.todo.user.model.User;

public interface Labeldao {
	
	public int createlabel(Label label);

	public List<Label> getallLabels(User user);
	public Label getlabelById(int id);

	public int isUserExist(Label label);

	public void update(Label label);

	public boolean deleteLabel(Label label);

	boolean deleteLabelfromNote(Label label);


}

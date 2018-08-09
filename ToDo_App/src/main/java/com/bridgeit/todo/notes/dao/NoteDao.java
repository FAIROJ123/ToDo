package com.bridgeit.todo.notes.dao;

import java.util.List;

import com.bridgeit.todo.labels.model.Label;
import com.bridgeit.todo.notes.model.Notes;
import com.bridgeit.todo.user.model.User;


public interface NoteDao {
	
	public int insert(Notes note);
	public void update(Notes note);
	public List<Notes> getAllNotes(User user);
	public Notes getNoteById(int id);
	public void deleteNote(Notes note);
	public Label getlabelById(int id);
	

}

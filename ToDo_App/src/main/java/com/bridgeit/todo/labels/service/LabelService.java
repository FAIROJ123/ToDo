package com.bridgeit.todo.labels.service;

import java.util.List;

import com.bridgeit.todo.labels.model.Label;
import com.bridgeit.todo.notes.model.Notes;

public interface LabelService {
	
	public int createLabel(Label label,String token);

	public List<Label> getAllLabels(String token);

	public boolean deleteLabel(int id, String token);

	public boolean update(Label label, String token, int id);
	public List<Notes> getlabelNotes(int id, String token);

}

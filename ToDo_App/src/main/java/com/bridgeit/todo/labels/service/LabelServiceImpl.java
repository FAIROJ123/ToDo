package com.bridgeit.todo.labels.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bridgeit.todo.labels.dao.Labeldao;
import com.bridgeit.todo.labels.model.Label;
import com.bridgeit.todo.notes.model.Notes;
import com.bridgeit.todo.user.dao.UserDao;
import com.bridgeit.todo.user.model.User;
import com.bridgeit.todo.user.utility.Jwt;

@Service
public class LabelServiceImpl implements LabelService{

	@Autowired
	private Labeldao labeldao;
		
	@Autowired
	private UserDao userdao;
			
		
		@Transactional
		
		public int createLabel(Label label, String token) {
			int id = Jwt.parseJWT(token);
			User user = userdao.getUserById(id);
			label.setUser(user);
			return labeldao.createlabel(label);
		}

	
	@Transactional
	@Override
	public List<Label> getAllLabels(String token) {
		int id = Jwt.parseJWT(token);
		User user = userdao.getUserById(id);

		List<Label> listoflabels = labeldao.getallLabels(user);
		return listoflabels;

	}

	@Transactional
	@Override
  public void deleteLabel(int labelid, String token) {
		
		int id = Jwt.parseJWT(token);	
		System.out.println("UserId:" + id);
	
		 Label label=labeldao.getlabelById(labelid);
		 System.out.println("Label:"+label);
		 System.out.println("label: "+label.getUser());
		 int userid = label.getUser().getId();
		
		if (userid == id)
		{
			
			labeldao.deleteLabel(label);
		
		}
	}
	
	@Transactional
	@Override
	public boolean update(Label label, String token, int labelid) {
		int id = Jwt.parseJWT(token);
		User user = userdao.getUserById(id);
		Label label1= labeldao.getlabelById(labelid);
		label1.setLabelname(label.getLabelname());
		if(user.getId()!= label1.getUser().getId()) {
			return false;	
		}
		
		System.out.println("Pre Label:::"+label1.getLabelname());
		labeldao.update(label1);
		return true;
	}
	
	@Transactional
	@Override
	public List<Notes> getlabelNotes(int id, String token)
	{
		List<Notes> labelNotes = null;
		

		Label label=labeldao.getlabelById(id);
		
		labelNotes=label.getNotes();
		
    	return labelNotes;
	}

	

}

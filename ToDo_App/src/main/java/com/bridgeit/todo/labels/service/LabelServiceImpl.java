package com.bridgeit.todo.labels.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bridgeit.todo.labels.dao.Labeldao;
import com.bridgeit.todo.labels.model.Label;
import com.bridgeit.todo.notes.dao.NoteDao;
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
	
	@Autowired
	private NoteDao notedao;
			
		
//<================================= Create Label ====================================>		
	
	@Transactional
	public int createLabel(Label label, String token) {
			int id = Jwt.parseJWT(token);
			User user = userdao.getUserById(id);
			label.setUser(user);
			return labeldao.createlabel(label);
		}

	
//<================================== GetAll Labels ===================================>	
	
	@Transactional
	@Override
	public List<Label> getAllLabels(String token) {
		int id = Jwt.parseJWT(token);
		User user = userdao.getUserById(id);

		List<Label> listoflabels = labeldao.getallLabels(user);
		return listoflabels;

	}

//<================================== Delete Label =====================================>
	
	 @Transactional
		@Override
		public boolean  deleteLabel(int id, String token) 
		{
		 System.out.println("inside service....");
		    int userid = Jwt.parseJWT(token);	
		
		     Label label=labeldao.getlabelById(id);		

			User user=userdao.getUserById(userid);
				System.out.println("Userid:"+user.getId());
				
			if(user.getId() == label.getUser().getId())
			{
				System.out.println("inside if....");
				
				List<Notes> notes = label.getNotes();
				
				for(Notes note: notes) {
					List<Label> labels = note.getLabelslist();
					
					if(labels.contains(label)) {
						labels.remove(label);
						
					}
					notedao.update(note);
					System.out.println("After update..");
				}
				
				//labeldao.update(label);
				
				
				labeldao.deleteLabel(label);
			}
			return true;
		}
	 
	 
//<=================================Update Label =================================>	 
	       
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
	
//<================================ GetLabel Notes ==============================>	
	
	
	@Transactional
	@Override
	public List<Notes> getlabelNotes(int id, String token)
	{
		
		Label label=labeldao.getlabelById(id);
		
		List<Notes> labelNotes=label.getNotes();
		
    	return labelNotes;
	}

	

}

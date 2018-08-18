package com.bridgeit.todo.notes.services;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bridgeit.todo.collaborator.dao.Collaboratordao;
import com.bridgeit.todo.collaborator.model.Collaborator;
import com.bridgeit.todo.labels.dao.Labeldao;
import com.bridgeit.todo.labels.model.Label;
import com.bridgeit.todo.notes.dao.NoteDao;
import com.bridgeit.todo.notes.model.Notes;
import com.bridgeit.todo.user.dao.UserDao;
import com.bridgeit.todo.user.model.User;
import com.bridgeit.todo.user.utility.Jwt;
import com.bridgeit.todo.user.utility.RedisUtil;

@Service
@PropertySource("classpath:image.properties")
public class NoteServices {

	@Autowired
	private NoteDao notedao;

	@Autowired
	private UserDao userdao;

	@Autowired
	private RedisUtil redisutil;

	@Autowired
	private Labeldao labeldao;
	
	
	@Autowired
	private Collaboratordao collaboratordao;

	
	@Value("${image.path}")
	private String path;

	@Value("${response.path}")
	private String responsePath;

	@Transactional
	public int createNote(Notes note, String token) {
		int id = Jwt.parseJWT(token);
		User user = userdao.getUserById(id);
		System.out.println("note id : " + note.getTitle());
		note.setUser(user);
		note.setCreatesDateAt(new Date());
		notedao.insert(note);
		return id;

	}

	@Transactional
	public boolean updateNote(Notes note, String token) {
		int id = Jwt.parseJWT(token);
		User user = userdao.getUserById(id);

		Notes note1 = notedao.getNoteById(note.getId());
		if (user.getId() != note1.getUser().getId()) {
			return false;
		}
		note.setUpdatedDateAt(new Date());

		notedao.update(note);
		return true;

	}

	@Transactional
	public List<Notes> getAllNotes(String token) {
		System.out.println(token);
		int id = Jwt.parseJWT(token);
		User user = userdao.getUserById(id);

		List<Notes> listofNote = notedao.getAllNotes(user);
		System.out.println(listofNote);
		return listofNote;

	}

	@Transactional
	public void deleteNote(int noteid, String token) {

		System.out.println("Token:" + token);
		int id = Jwt.parseJWT(token);
		System.out.println("UserId:" + id);

		Notes note2 = notedao.getNoteById(noteid);
		System.out.println("Note2: " + note2.getUser());
		int userid = note2.getUser().getId();
		System.out.println("noteUserid" + userid);
		if (userid == id) {
			System.out.println("sduhsgfuh");
			notedao.deleteNote(note2);

		}
		
	}


	@Transactional
	public void noteandlabel(int noteid, int labelid) {
		System.out.println("Entering in to the note label service");
		Notes note = notedao.getNoteById(noteid);

		Label label = labeldao.getlabelById(labelid);

		note.getLabelslist().add(label);
		label.getNotes().add(note);

		labeldao.update(label);
		notedao.update(note);
	}

	@Transactional
	public boolean labeldelete(int noteid, int labelid) {
		System.out.println("Entering in to the delete label service");
		Notes note = notedao.getNoteById( noteid );
        Label label = labeldao.getlabelById(labelid);
		note.getLabelslist().remove(label);
		notedao.update(note);
		return true;

	}
	
	
	 @Transactional
  public boolean deleteLabel(int labelid, String token) {
		
		 boolean status=false;
		int id = Jwt.parseJWT(token);	
		System.out.println("UserId:" + id);
	
		 Label label=notedao.getlabelById(labelid);
		 System.out.println("Label:"+label);
		 System.out.println("label: "+label.getUser());
		 int userid = label.getUser().getId();
		System.out.println("uSHJ:"+userid);
		if (userid == id)
		{
			System.out.println("inside if....");
			status=labeldao.deleteLabel(label);
			System.out.println("status:"+status);
		 return status;
		}
		return status;
	}

	@Transactional
	public void addCollaboratorOnNote(int userid,int noteid) {
		
		System.out.println("Entering in to the note label service");
		Notes note = notedao.getNoteById(noteid);
		System.out.println("Note in collaborator:"+note);

		User user = userdao.getUserById(userid);
		System.out.println("user in collaborator:"+user);
		
		List<User> collaboratorUser =  note.getCollaboratedUser();
		collaboratorUser.add(user);
		note.setCollaboratedUser(collaboratorUser);
		
		List<Notes> collaboratorNotes = user.getCollaboratorNotes();
		collaboratorNotes.add(note);
		user.setCollaboratorNotes(collaboratorNotes);
		
		userdao.update(user);
		notedao.update(note);

}
	
	@Transactional
	public boolean removeCollaboratorOnNote(int userid, int noteid) {
		System.out.println("Entering in to the note label service");
		Notes note = notedao.getNoteById(noteid);
		System.out.println("Note in collaborator:"+note);

		User user = userdao.getUserById(userid);
		System.out.println("user in collaborator:"+user);
		
		List<User> collaboratorUser =  note.getCollaboratedUser();
		for(User user2:collaboratorUser) {
			if(userid == user2.getId()) {
				collaboratorUser.remove(user2);
				break;
			}
		}
	    note.setCollaboratedUser(collaboratorUser);
	
		List<Notes> collaboratorNotes = user.getCollaboratorNotes();
		for(Notes note2 :collaboratorNotes) {
			if(noteid == note2.getId()) {
				collaboratorNotes.remove(note2);
				break;
			}
		}
		user.setCollaboratorNotes(collaboratorNotes);
		
		userdao.update(user);
		notedao.update(note);
		return true;
	}
	
	
	@Transactional
	public List<Notes> getAllCollaboratedNotes(String token) {
		System.out.println(token);
		int id = Jwt.parseJWT(token);
		User user = userdao.getUserById(id);

		List<Notes> listofCollaboratedNotes = user.getCollaboratorNotes();
		System.out.println(listofCollaboratedNotes);
		return listofCollaboratedNotes;

	}

	@Transactional
	public String serverImage(MultipartFile file) {

		try {

			byte[] bytes = file.getBytes();
			System.out.println("path : " + path + File.separator + file.getOriginalFilename());

			BufferedOutputStream stream = new BufferedOutputStream(
					new FileOutputStream(path + File.separator + file.getOriginalFilename()));
			stream.write(bytes);
			stream.close();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return responsePath+file.getOriginalFilename();
	}

	@Transactional
	public byte[] gettingImage(String name) 
	{
		File file = new File(path+File.separator+name);
		
		if (file.exists()) {
            
		
		try {
		 return Files.readAllBytes(file.toPath());
			
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		return null;
	}

	
	
	
}

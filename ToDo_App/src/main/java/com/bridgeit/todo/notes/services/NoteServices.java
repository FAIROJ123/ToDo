package com.bridgeit.todo.notes.services;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bridgeit.todo.labels.dao.Labeldao;
import com.bridgeit.todo.labels.model.Label;
import com.bridgeit.todo.notes.dao.NoteDao;
import com.bridgeit.todo.notes.model.Notes;
import com.bridgeit.todo.notes.model.NotesDto;
import com.bridgeit.todo.user.dao.UserDao;
import com.bridgeit.todo.user.model.User;
import com.bridgeit.todo.user.utility.Jwt;
import com.bridgeit.todo.user.utility.RedisUtil;

@Service
public class NoteServices {

	@Autowired
	private NoteDao notedao;

	@Autowired
	private UserDao userdao;

	@Autowired
	private RedisUtil redisutil;

	@Autowired
	private Labeldao labeldao;

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
	public void addLabelOnNote(Notes note, Label label) {

		note.getLabelslist().add(label);
		//label.getNotes().add(note);

		labeldao.update(label);
		//notedao.update(note);

	}

	@Transactional
	public void removeLabelOnNote(Notes note, Label label) {

		note.getLabelslist().remove(label);
		//label.getNotes().remove(note);

		//notedao.update(note);
		labeldao.update(label);
	}

	@Transactional
	public void noteandlabel(int noteid, int labelid) {
		System.out.println("Entering in to the note label service");
		Notes note = notedao.getNoteById(noteid);

		Label label = labeldao.getlabelById(labelid);

		if (note.getLabelslist().contains(label)) {
			System.out.println("remove label on note");
			removeLabelOnNote(note, label);
		} else {
			System.out.println("add label on note");
			addLabelOnNote(note, label);
		}
	}

}

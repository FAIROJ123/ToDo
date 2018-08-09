package com.bridgeit.todo.collaborator.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.bridgeit.todo.notes.model.Notes;
import com.bridgeit.todo.user.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="collaborator")
public class Collaborator {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="collaborator_id")
	private int id;
	
	@Column
	private String email;
	
	@ManyToMany
	@JoinColumn(name="NoteId")
	@JsonIgnore
    private List<Notes> notes;
	
	@ManyToOne
	private User user;


	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<Notes> getNotes() {
		return notes;
	}

	public void setNotes(List<Notes> notes) {
		this.notes = notes;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	
	
}

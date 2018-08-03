package com.bridgeit.todo.labels.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.bridgeit.todo.notes.model.Notes;
import com.bridgeit.todo.user.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "LABEL_TABLE")
public class Label {

	@Id
	@Column(name = "Label_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

	@Column
	private String labelname;

	
	@ManyToMany
	@NotFound(action=NotFoundAction.IGNORE)
	@LazyCollection(LazyCollectionOption.FALSE)
	@JsonIgnore
	private List<Notes> notes;
	
	
	@ManyToOne
	@NotFound(action=NotFoundAction.IGNORE)
	private User user;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getLabelname() {
		return labelname;
	}

	public void setLabelname(String labelname) {
		this.labelname = labelname;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<Notes> getNotes() {
		return notes;
	}

	public void setNotes(List<Notes> notes) {
		this.notes = notes;
	}

	
	
	
	

}

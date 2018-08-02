package com.bridgeit.todo.user.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Email;

import com.bridgeit.todo.labels.model.Label;
import com.bridgeit.todo.notes.model.Notes;

@Entity
@Table
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "User_Id")
	private int id;

	@Column(name = "Name")
	private String name;

	@Column(name = "Email")
	@Email
	private String email;

	@Column(name = "Password")
	private String password;

	@Column(name = "MobileNumber")
	private String mobileNumber;

	@Column(name = "IsVerified")
	private boolean isVerified;

	@OneToMany(cascade = CascadeType.PERSIST)
	private List<Notes> notes = new ArrayList<Notes>();

	/*@OneToMany(mappedBy = "user", cascade = CascadeType.PERSIST)
	private List<Label> label;*/

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public boolean isVerified() {
		return isVerified;
	}

	public void setVerified(boolean isVerified) {
		this.isVerified = isVerified;
	}

	public List<Notes> getNotes() {
		return notes;
	}

	public void setNotes(List<Notes> notes) {
		this.notes = notes;
	}

}
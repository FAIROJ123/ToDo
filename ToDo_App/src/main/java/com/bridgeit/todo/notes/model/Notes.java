package com.bridgeit.todo.notes.model;

import java.util.Date;
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

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import com.bridgeit.todo.labels.model.Label;
import com.bridgeit.todo.user.model.User;


@Entity
@Table(name="Notes")
public class Notes {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name="NoteId")
	private int id;
	
	@Column(name="Title")
	private String title;
	
	@Column(name="Description")
	private String description;
	
	@Column(name="Archive")
	private boolean archive;
	
	@Column(name="Color")
    private String color;
	
	

	@Column(name="Trash")
    private boolean trash;


	@Column
	private Date createsDateAt;
	
	@Column
	private Date updatedDateAt;

	@Column
	private boolean pin;
	
	@Column
	private Date remainder;
	
	@ManyToOne
	@JoinColumn(name="User_Id")
	@LazyCollection(LazyCollectionOption.FALSE)
	private User user;
	
	@ManyToMany
	@JoinColumn(name="Label_id",unique=false)
	@LazyCollection(LazyCollectionOption.FALSE)
	private List<Label> labelslist;
	
	@ManyToMany(mappedBy = "collaboratorNotes")
	@LazyCollection(LazyCollectionOption.FALSE)
	private List<User> collaboratedUser;
	
	private String scrapping;
	
	private String imageUrl;
	
	public List<Label> getLabelslist() {
		return labelslist;
	}

	public void setLabelslist(List<Label> labelslist) {
		this.labelslist = labelslist;
	}

	public boolean isPin() {
		return pin;
	}

	public void setPin(boolean pin) {
		this.pin = pin;
	}
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}

	public boolean isArchive() {
		return archive;
	}

	public void setArchive(boolean archive) {
		this.archive = archive;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public boolean isTrash() {
		return trash;
	}

	public void setTrash(boolean trash) {
		this.trash = trash;
	}

	public Date getCreatesDateAt() {
		return createsDateAt;
	}

	public void setCreatesDateAt(Date createsDateAt) {
		this.createsDateAt = createsDateAt;
	}

	public Date getUpdatedDateAt() {
		return updatedDateAt;
	}

	public void setUpdatedDateAt(Date updatedDateAt) {
		this.updatedDateAt = updatedDateAt;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Date getRemainder() {
		return remainder;
	}

	public void setRemainder(Date remainder) {
		this.remainder = remainder;
	}
	

	public List<User> getCollaboratedUser() {
		return collaboratedUser;
	}

	public void setCollaboratedUser(List<User> collaboratedUser) {
		this.collaboratedUser = collaboratedUser;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getScrapping() {
		return scrapping;
	}

	public void setScrapping(String scrapping) {
		this.scrapping = scrapping;
	}

	

	
	

	
}
package com.bridgeit.todo.user.model;

public class UserDto {
	

private int id;
private String email;
private String name;
private String userProfile;

public UserDto() {
	super();
	// TODO Auto-generated constructor stub
}

public String getEmail() {
	return email;
}
public void setEmail(String email) {
	this.email = email;
}

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

public String getUserProfile() {
	return userProfile;
}

public void setUserProfile(String userProfile) {
	this.userProfile = userProfile;
}





}

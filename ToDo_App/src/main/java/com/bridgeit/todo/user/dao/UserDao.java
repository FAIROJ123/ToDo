package com.bridgeit.todo.user.dao;

import com.bridgeit.todo.user.model.User;
import com.bridgeit.todo.user.model.UserDto;

public interface UserDao {
	
	
	public int insert(User user);
	public boolean checkLogin(String email, String password);
	public User getUserById(int id);
	public User getUserByEmail(String email);
	public boolean update(User user);
	public boolean isExist(String email);
	 

}

package com.bridgeit.todo.user.services;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bridgeit.todo.user.dao.UserDao;
import com.bridgeit.todo.user.model.User;
import com.bridgeit.todo.user.model.UserDto;
import com.bridgeit.todo.user.utility.Email;
import com.bridgeit.todo.user.utility.Jwt;
import com.bridgeit.todo.user.utility.RedisUtil;

@Service
public class UserService {

	@Autowired
	private UserDao userdao;

	@Autowired
	RedisUtil redisutil;

	/*
	 * public UserDao getUserdao() { return userdao; }
	 * 
	 * public void setUserdao(UserDao userdao) { this.userdao = userdao; }
	 */

	@Transactional
	public int register(User user, String url) {
		
		String newpass = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
		user.setPassword(newpass);
        String email = user.getEmail();
      
		int id = userdao.insert(user);
		String token = Jwt.createToken(Integer.toString(id), 3600000);
		Email.sender(token, url);

		redisutil.setToken(Integer.toString(id), token);
        
		
		return id;

	}

	@Transactional
	public String checkLogin(String email, String password) {
		System.out.println("In Service class...Check Login");
		User user = userdao.getUserByEmail(email);
		int id = user.getId();
		if (BCrypt.checkpw(password, user.getPassword())) {
			String token = Jwt.createToken(id + "", 86400000);
			return token;
		}
		return null;
	}

	@Transactional
	public boolean verify(String token) {
		int id = Jwt.parseJWT(token);
		User user = userdao.getUserById(id);
		user.setVerified(true);

		String radistoken = redisutil.getToken(id + "");

		System.out.println("New Token is: " + radistoken);

		if (token.equals(radistoken)) {
			userdao.update(user);
			String key = id + "";
			// redisutil.deleteUser(key);
			// System.out.println("deleted successfully :");
			System.out.println("Tokentaking from redis : " + radistoken);
		}

		return userdao.update(user) ? true : false;

	}

	@Transactional
	public boolean forgetPassword(String email, String url) {
		User user = userdao.getUserByEmail(email);
		System.out.println(user);

		if (user.isVerified()) {

			int id = user.getId();
			// Token generation
			String token = Jwt.createToken(id + "", 3600000);
			System.out.println("Token is:" + token);

			Email.sender(token, url);

		}

		return true;
	}

	@Transactional
	public boolean createPasswordResetToken(String password, String token) {

		int id = Jwt.parseJWT(token);
		User user = userdao.getUserById(id);
		user.setPassword(password);
		return userdao.update(user);

	}
	
public boolean isExist(String email) {
	boolean flag=false;
	flag=userdao.isExist(email);
	return flag;
	
}
}

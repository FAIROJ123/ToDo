package com.bridgeit.todo.user.utility;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class RedisUtil {

	 @Autowired
	  private RedisTemplate<String, String> redisTemplate;

	 public void setToken(String id,String token) {
		 redisTemplate.opsForValue().set(id, token);
		
	  }
	 
	  public String getToken(String id) {
		  return redisTemplate.opsForValue().get(id);
	  }
	  public void deleteUser(String id) {
		  redisTemplate.delete(id);
	  }	  
		
	

}
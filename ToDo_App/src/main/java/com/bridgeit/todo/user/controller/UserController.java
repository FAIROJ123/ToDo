package com.bridgeit.todo.user.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.bridgeit.todo.notes.model.Notes;
import com.bridgeit.todo.user.model.ForgotPasswordModel;
import com.bridgeit.todo.user.model.ResetModel;
import com.bridgeit.todo.user.model.User;
import com.bridgeit.todo.user.model.UserDto;
import com.bridgeit.todo.user.services.UserService;
import com.bridgeit.todo.user.utility.CustomRes;
import com.bridgeit.todo.user.utility.EmailidallreadyExist;
import com.bridgeit.todo.user.utility.UserEmailNotFound;

@RestController
public class UserController {

	@Autowired
	public UserService userservice;
	
	

	@RequestMapping(value = "/register", method = RequestMethod.POST, consumes = "application/json", produces = "application/json")
	public ResponseEntity<?> registration(@Valid @RequestBody User user, HttpServletRequest rq) {
		String url = "http://" + rq.getServerName() + ":" + rq.getServerPort() + rq.getContextPath() + "/"
				+ "activeuser/";
		String email=user.getEmail();
		if(!userservice.isExist(email))
		{
			userservice.register(user, url);
		
			
		CustomRes res = new CustomRes(0, email);
		res.setMsg("Registration success");
		res.setStatus(200);
		return new ResponseEntity<CustomRes>(res, HttpStatus.CREATED);
		}
		else {
			try {
				throw new EmailidallreadyExist("Emailid already exist");
			}catch (Exception e) {
				e.printStackTrace();
			}
			return new ResponseEntity<CustomRes>(HttpStatus.CONFLICT);
		}

	}
                              
	                     //Login
	//-------------------------------------------------------------------------------------------------\
	
	@RequestMapping(value = "/login", method = RequestMethod.POST,consumes = "application/json", produces = "application/json")
	public ResponseEntity<?> login(@RequestBody UserDto user) {
		String userexist = userservice.checkLogin(user.getEmail(), user.getPassword());
		if (userexist!=null)

		{
			
			return new ResponseEntity<CustomRes>(new CustomRes(200, userexist),HttpStatus.OK);
			
		}
		else {
			try {
				throw new UserEmailNotFound("Emailid not found");
			}catch (Exception e) {
				e.printStackTrace();
			}
		}
		
		return new ResponseEntity<String>( HttpStatus.CONFLICT);

	}

	//ActiveUser
	//-----------------------------------------------------------------------------------------------------
	
	@RequestMapping(value = "/activeuser/{token:.+}", method = RequestMethod.GET)
	public ResponseEntity<String> activeUser(@PathVariable("token") String token,HttpServletRequest rq,HttpServletResponse response) throws IOException {
		//System.out.println("token : " + token);
		String url = "http://" + rq.getServerName() + ":" + rq.getServerPort() + rq.getContextPath() + "/";
		 userservice.verify(token);
		try {
			response.sendRedirect(url+"#!/login");
			return new ResponseEntity<String>("User activated", HttpStatus.FOUND);
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<String>("User not activated", HttpStatus.NOT_FOUND);

	}
	
	//forgetpassword
	//-------------------------------------------------------------------------------------------
	

	@RequestMapping(value = "/forgetpassword", method = RequestMethod.POST)
	public ResponseEntity<?> forgetpassword(@RequestBody ForgotPasswordModel passwordModel, HttpServletRequest rq) {
	    String url = "http://" + rq.getServerName() + ":" + rq.getServerPort() + "" + rq.getContextPath() + "/"
				+ "reset/";
     	String emailid = passwordModel.getEmail();
		try {
			userservice.forgetPassword(emailid, url);
			CustomRes res = new CustomRes(0, emailid);
			res.setMsg("login success");
			res.setStatus(200);
			return new ResponseEntity<CustomRes>(res, HttpStatus.ACCEPTED);
		}catch(Exception e) {
			e.printStackTrace();
		}

		return new ResponseEntity<String>("User not activated", HttpStatus.NOT_FOUND);

	}
	
	//reset password
//==================================================================================================
  
	@RequestMapping(value="/resetpassword/{token:.+}", method=RequestMethod.POST)	
    public ResponseEntity<?>  resetpassword(@PathVariable("token") String token, @RequestBody ResetModel model,HttpServletRequest rq,HttpServletResponse response) throws IOException
    {
		String url = "http://" + rq.getServerName() + ":" + rq.getServerPort() + rq.getContextPath() + "/";
      
		String password = model.getNewpassword();
		
	   userservice.createPasswordResetToken(password,token);
	   CustomRes res = new CustomRes(0, password);
		res.setMsg("reset password Success");
		res.setStatus(200);
		return new ResponseEntity<CustomRes>(res, HttpStatus.ACCEPTED);
	  
    }
	
	@RequestMapping(value = "/reset/{token:.+}", method = RequestMethod.GET)
	public ResponseEntity<String> reset(@PathVariable("token") String token,HttpServletRequest rq,HttpServletResponse response) throws IOException {
		//System.out.println("token : " + token);
		String url = "http://" + rq.getServerName() + ":" + rq.getServerPort() + rq.getContextPath();
	
		try {
			response.sendRedirect(url+"#!/reset");
		}catch (Exception e) {
			e.printStackTrace();
		}
			return new ResponseEntity<String>("Password Reset Done", HttpStatus.FOUND);
		
	}

	
	@RequestMapping(value="/updateUser" ,method = RequestMethod.PUT)
	  public ResponseEntity<?> updateNote( @RequestBody User user,HttpServletRequest req)
	  {
		  System.out.println("asjdgh");
		  String token = req.getHeader("ID");
		  boolean status = userservice.updateUser(user, token);
		  
		  if(status)
		  {
			  CustomRes res = new CustomRes(0, token);
				res.setMsg("User updation is Done");
				res.setStatus(200);
			  return new ResponseEntity<CustomRes>( res,HttpStatus.CREATED);
		  }
		  return new ResponseEntity<String>( "Note is not Updated ",HttpStatus.NOT_FOUND);
		  
	  }
	

}

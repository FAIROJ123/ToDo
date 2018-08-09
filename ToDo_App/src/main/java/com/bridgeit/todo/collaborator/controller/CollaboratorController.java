package com.bridgeit.todo.collaborator.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.bridgeit.todo.collaborator.model.Collaborator;
import com.bridgeit.todo.collaborator.services.Collaboratorservice;
import com.bridgeit.todo.labels.model.Label;
import com.bridgeit.todo.user.utility.CustomRes;

@RestController
public class CollaboratorController {
	
	
	@Autowired
	  private Collaboratorservice collaboratorservice;
	
	
	@RequestMapping(value="/addCollaborator" ,method = RequestMethod.POST)
	  public ResponseEntity<?> createlabel(@RequestBody Collaborator collaborator,HttpServletRequest req)
	  {
		System.out.println("inside backend");
		  String token = req.getHeader("ID");
		  int status = collaboratorservice.addCollaborator(collaborator, token);
			if (status > 0) {
				CustomRes res = new CustomRes(status, token);
				res.setMsg("Collaborator added Successfully");
				res.setStatus(200);
				return new ResponseEntity<CustomRes>( res,HttpStatus.CREATED);

			}
			return new ResponseEntity<String>( "Collaborator add is Failed.",HttpStatus.NOT_FOUND);
		  
	  }
	
	
	
	@RequestMapping(value="/getallCollaborators" ,method = RequestMethod.GET)
	  public ResponseEntity<List<Collaborator>> getAllCollaborators(HttpServletRequest req)
	  {
		  String token = req.getHeader("ID");
		  List<Collaborator> list=collaboratorservice.getAllCollaborators(token);  
		 return new ResponseEntity<List<Collaborator>>( list,HttpStatus.CREATED); 
		  
	  }
	
	
	
	
	 @RequestMapping(value="/deleteCollaborator/{id}",method=RequestMethod.POST)
	  public ResponseEntity<?> deleteNote(@PathVariable("id") int id,Label label,HttpServletRequest req)
	  {
		  System.out.println("Going into the Controller...");
		  String token = req.getHeader("ID");
		  collaboratorservice.deleteCollaborator(id, token);;
		  CustomRes res = new CustomRes(id, token);
			res.setMsg("Note deleteion is Done");
			res.setStatus(200);
		return new ResponseEntity<CustomRes>(res,HttpStatus.CREATED);
	  }  
	

}

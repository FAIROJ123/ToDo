package com.bridgeit.todo.labels.controller;

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

import com.bridgeit.todo.labels.model.Label;
import com.bridgeit.todo.labels.service.LabelService;
import com.bridgeit.todo.notes.model.Notes;
import com.bridgeit.todo.notes.services.NoteServices;
import com.bridgeit.todo.user.utility.CustomRes;

@RestController
public class LabelsController {

	@Autowired
	  private LabelService labelservice;
	

	  @Autowired
	  private NoteServices noteservices;
	
	
	@RequestMapping(value="/createlabel" ,method = RequestMethod.POST)
	  public ResponseEntity<?> createlabel(@RequestBody Label label,HttpServletRequest req)
	  {
		System.out.println("inside backend");
		  String token = req.getHeader("ID");
		  int status = labelservice.createLabel(label, token);
			if (status > 0) {
				CustomRes res = new CustomRes(status, token);
				res.setMsg("label creation is Done");
				res.setStatus(200);
				return new ResponseEntity<CustomRes>( res,HttpStatus.CREATED);

			}
			return new ResponseEntity<String>( "Label creation is Failed.",HttpStatus.NOT_FOUND);
		  
	  }
	
	@RequestMapping(value="/updatelabel/{id}" ,method = RequestMethod.PUT)
	  public ResponseEntity<?> updatelabel( @RequestBody Label label,@PathVariable("id") int id,HttpServletRequest req)
	  {
		  String token = req.getHeader("ID");
		  System.out.println(token);
		  boolean status = labelservice.update(label, token, id);
		  System.out.println("In label controller"+status);
		  if(status)
		  {
			  CustomRes res = new CustomRes(0, token);
				res.setMsg("Note updation is Done");
				res.setStatus(200);
			  return new ResponseEntity<CustomRes>( res,HttpStatus.CREATED);
		  }
		  return new ResponseEntity<String>( "Note is not Updated ",HttpStatus.NOT_FOUND);
		  
	  }
	
	@RequestMapping(value="/getallLabels" ,method = RequestMethod.GET)
	  public ResponseEntity<List<Label>> getAllLabels(HttpServletRequest req)
	  {
		  String token = req.getHeader("ID");
		  List<Label> list=labelservice.getAllLabels(token);  
		 return new ResponseEntity<List<Label>>( list,HttpStatus.CREATED); 
		  
	  }
	
	@RequestMapping(value = "/labelnote/{id}", method = RequestMethod.GET)
	public ResponseEntity<List<Notes>> listAllLabelNotes(@RequestBody Label label,@PathVariable("id") int id,HttpServletRequest req)
	{
		System.out.println("Inside labelnote controller");
		String token = req.getHeader("ID");
			List<Notes> notes = labelservice.getlabelNotes(id, token);
			
			return new ResponseEntity<List<Notes>>(notes, HttpStatus.OK); 
			
	}
	
	
	 @RequestMapping(value="/deletelabel/{id}",method=RequestMethod.POST)
	  public ResponseEntity<?> deleteNote(@PathVariable("id") int id,HttpServletRequest req)
	  {
		  System.out.println("Going into the Controller...");
		  String token = req.getHeader("ID");
		 if(labelservice.deleteLabel(id, token)) {
			 CustomRes res = new CustomRes(id, token);
				res.setMsg("Label deleteion is Done");
				res.setStatus(200);
			return new ResponseEntity<CustomRes>(res,HttpStatus.CREATED);
		 }
		return new ResponseEntity<String>("label deletion is note done",HttpStatus.CONFLICT);
		  
	  }  
	
}

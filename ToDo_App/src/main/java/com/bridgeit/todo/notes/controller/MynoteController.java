package com.bridgeit.todo.notes.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.jboss.logging.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bridgeit.todo.labels.service.LabelService;
import com.bridgeit.todo.notes.model.Notes;
import com.bridgeit.todo.notes.services.NoteServices;
import com.bridgeit.todo.user.model.User;
import com.bridgeit.todo.user.utility.CustomRes;


@RestController
public class MynoteController {

  @Autowired
  private NoteServices noteservices;
  
  
  @Autowired
  private LabelService labelservice;
  
  @RequestMapping(value="/createNote" ,method = RequestMethod.POST)
  public ResponseEntity<?>createNote(@RequestBody Notes note,HttpServletRequest req)
  {
	  String token = req.getHeader("ID");
	  System.out.println("note  "+note.getTitle());
	  System.out.println("note  "+note.getId());
	  int status = noteservices.createNote(note,token);
		if (status > 0) {
			CustomRes res = new CustomRes(status, token);
			res.setMsg("Note creation is Done");
			res.setStatus(200);
			return new ResponseEntity<CustomRes>( res,HttpStatus.CREATED);

		}
		return new ResponseEntity<String>( "Note creation is Failed.",HttpStatus.NOT_FOUND);
	  
  }
  
  @RequestMapping(value="/updateNote" ,method = RequestMethod.PUT)
  public ResponseEntity<?> updateNote( @RequestBody Notes note,HttpServletRequest req)
  {
	  System.out.println("asjdgh");
	  String token = req.getHeader("ID");
	  boolean status = noteservices.updateNote(note, token);
	  
	  if(status)
	  {
		  CustomRes res = new CustomRes(0, token);
			res.setMsg("Note updation is Done");
			res.setStatus(200);
		  return new ResponseEntity<CustomRes>( res,HttpStatus.CREATED);
	  }
	  return new ResponseEntity<String>( "Note is not Updated ",HttpStatus.NOT_FOUND);
	  
  }
  
  @RequestMapping(value="/getallnotes" ,method = RequestMethod.GET)
  public ResponseEntity<List<Notes>> getAllNotes(HttpServletRequest req)
  {
	  System.out.println("dsfuh");
	  String token = req.getHeader("ID");
	  System.out.println("Token:"+token);
	  List<Notes> list=noteservices.getAllNotes(token);
	  System.out.println("NOTE LIST SIZE::"+list.size());
	 return new ResponseEntity<List<Notes>>( list,HttpStatus.CREATED); 
	  
  }
  
  @RequestMapping(value="/deleteNote/{id}",method=RequestMethod.POST)
  public ResponseEntity<?> deleteNote(@PathVariable("id") int id,Notes note,HttpServletRequest req)
  {
	  System.out.println("Going into the Controller...");
	  String token = req.getHeader("ID");
	  noteservices.deleteNote(id, token);
	  CustomRes res = new CustomRes(id, token);
		res.setMsg("Note deleteion is Done");
		res.setStatus(200);
	return new ResponseEntity<CustomRes>(res,HttpStatus.CREATED);
  } 
  
  
  @RequestMapping(value = "/noteandlabel/{id}/{id1}", method = RequestMethod.PUT)
	public ResponseEntity<?> updateRelationNoteLabe(@RequestParam("ac") int action,@PathVariable("id") int noteid,
			@PathVariable("id1") int labelid) {
		System.out.println("noteId : " + noteid);
		System.out.println("labelId : " + labelid);

		noteservices.noteandlabel(noteid,labelid);
		CustomRes res = new CustomRes(labelid, null);
		res.setMsg("label update is Done");
		res.setStatus(200);
		return new ResponseEntity<CustomRes>(res, HttpStatus.OK);

	}
  @RequestMapping(value = "/labeldeleteOnNote/{id}/{id1}", method = RequestMethod.POST)
	public ResponseEntity<?> deletelabel( @PathVariable("id") int noteid,
			@PathVariable("id1") int labelid) {
		System.out.println("noteId : " + noteid);
		System.out.println("labelId : " + labelid);
   if(noteservices.labeldelete(noteid,labelid))
   {
		CustomRes res = new CustomRes(labelid, null);
		res.setMsg(" deletion is Done");
		res.setStatus(200);
		return new ResponseEntity<CustomRes>(res, HttpStatus.OK);
   }
return new ResponseEntity<CustomRes>( HttpStatus.NOT_ACCEPTABLE);

	}

  
  
  @RequestMapping(value = "/addCollaboratorOnNote/{id}/{id1}", method = RequestMethod.POST)
 	public ResponseEntity<?> addCollaboratorOnNote(@PathVariable("id") int userid,
 			@PathVariable("id1") int noteid) {
 		System.out.println("noteId : " + noteid);
 		System.out.println("userId : " + userid);

 		noteservices.addCollaboratorOnNote(userid,noteid);
 		CustomRes res = new CustomRes(noteid, null);
 		res.setMsg("Collaborator adding is Done");
 		res.setStatus(200);
 		return new ResponseEntity<CustomRes>(res, HttpStatus.OK);

 	}
  
  @RequestMapping(value = "/removeCollaboratorOnNote/{id}/{id1}", method = RequestMethod.POST)
	public ResponseEntity<?> deleteCollaborator(@PathVariable("id") int userid,
			@PathVariable("id1") int noteid) {
		System.out.println("noteId : " + noteid);
		System.out.println("userid : " + userid);
 if(noteservices.removeCollaboratorOnNote(userid, noteid))
 {
		CustomRes res = new CustomRes(noteid, null);
		res.setMsg(" deletion is Done");
		res.setStatus(200);
		return new ResponseEntity<CustomRes>(res, HttpStatus.OK);
 }
return new ResponseEntity<CustomRes>( HttpStatus.NOT_ACCEPTABLE);

	}
  
  
  
  
  @RequestMapping(value="/getAllCollaboratedNotes" ,method = RequestMethod.GET)
  public ResponseEntity<List<Notes>> getAllCollaboratedNotes(HttpServletRequest req)
  {
	  System.out.println("dsfuh");
	  String token = req.getHeader("ID");
	  System.out.println("Token:"+token);
	  List<Notes> list=noteservices.getAllCollaboratedNotes(token);
	  System.out.println("NOTE LIST SIZE::"+list.size());
	 return new ResponseEntity<List<Notes>>( list,HttpStatus.CREATED); 
	  
  }
  
  
  @RequestMapping(value = "/uploadFile", method = RequestMethod.POST)
	public ResponseEntity<?> uploadFile(@RequestBody MultipartFile file)
	{
		String name = file.getOriginalFilename();
	
		if (!file.isEmpty()) 
		{
 		 String path=noteservices.serverImage(file);
 		 System.out.println("path : "+path);
	 	 //logger.info("Server File Location with Name=" + path);
 		CustomRes res = new CustomRes(0, path);
 		res.setMsg(path);
 		res.setStatus(200);
    	 return new ResponseEntity<CustomRes>(res,HttpStatus.OK);
		} 
		else 
		{
		 return new ResponseEntity<String>("You failed to upload " + name + " because the file was empty.",HttpStatus.CONFLICT);
  	}
	}
 
  @RequestMapping(value = "/image/{name:.+}", method = RequestMethod.GET)
	public ResponseEntity<?> showFile(@PathVariable("name") String name) 
	{
		
		byte[] file=noteservices.gettingImage(name);	

		CustomRes res = new CustomRes(0, name);
 		res.setMsg("You failed to get Image");
 		res.setStatus(200);
		
		if(file.length==0)
		{
			return new ResponseEntity<CustomRes>(res,HttpStatus.CONFLICT);	
		}
		
		return new ResponseEntity<byte[]>(file,HttpStatus.OK);
		
	
		

	}

  
  
}

package com.bridgeit.todo.user.utility;

public class Scrapping {

	private String image;
	
	private String title;
	
	private String domain;
	
	
	public Scrapping(String title, String image,String domain) {
		this.title=title;
		this.image=image;
		this.domain=domain;
		
	}

	
	public String getImage() {
		return image;
	}


	public void setImage(String image) {
		this.image = image;
	}


	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}


	public String getDomain() {
		return domain;
	}


	public void setDomain(String domain) {
		this.domain = domain;
	}

	

	
	
	
}

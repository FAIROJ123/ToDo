package com.bridgeit.todo.user.utility;

import java.net.URI;
import java.net.URISyntaxException;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

public class WebScrapping {
	
	public Scrapping parsePageHeaderInfo(String urlStr) throws Exception {

	    StringBuilder sb = new StringBuilder();
	    Connection con = Jsoup.connect(urlStr);

	    Document doc = con.get();

	    String title = null;
	    Elements metaOgTitle = doc.select("meta[property=og:title]");
	    if (metaOgTitle!=null) {
	        title= metaOgTitle.attr("content");
	    }
	    else {
	    	title = doc.title();
	    }
	    
	    String domain = null;

		try {
			URI uri = new URI(urlStr);
			domain = uri.getHost();
		} catch (URISyntaxException e) {
			e.printStackTrace();
		}
	   
	    
	    String image = null;
	    Elements metaOgImage = doc.select("meta[property=og:image]");
	    if (metaOgImage!=null) {
	    	image = metaOgImage.attr("content");
	    }
	    
	    if (image!=null) {
	        sb.append("<img src='");
	        sb.append(image);
	        sb.append("' align='left' hspace='12' vspace='12' width='150px'>");
	    }

	    if (title!=null) {
	        sb.append(title);
	    }

	    return new Scrapping(title,image,domain);
	}


}

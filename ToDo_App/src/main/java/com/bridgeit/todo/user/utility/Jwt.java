package com.bridgeit.todo.user.utility;

import java.security.Key;
import java.util.Date;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;




public class Jwt {
	

	private static final String SecretKey="Fairoj";
	
	static SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
	 
    static long nowMillis = System.currentTimeMillis();
    static Date now = new Date(nowMillis);
 
    static byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(SecretKey);
    static Key signingKey = new SecretKeySpec(apiKeySecretBytes, signatureAlgorithm.getJcaName());
 
    
	public static String createToken(String id,  long ttlMillis)
	{
		 JwtBuilder builder = Jwts.builder().setId(id)
                 .setIssuedAt(now)
                 .signWith(signatureAlgorithm, signingKey);
		 
		 if (ttlMillis >= 0) {
			    long expMillis = nowMillis + ttlMillis;
			        Date exp = new Date(expMillis);
			        builder.setExpiration(exp);
			    }
		
		return builder.compact();
		
	}
	
	
	//Sample method to validate and read the JWT
	public static int parseJWT(String jwt) {
	// System.out.println("aaa:"+jwt);
	    //This line will throw an exception if it is not a signed JWS (as expected)
	    Claims claims =Jwts.parser().setSigningKey(SecretKey).parseClaimsJws(jwt).getBody();
	    System.out.println("ID: " + claims.getId());
	    System.out.println("Expiration: " + claims.getExpiration());
	    return Integer.parseInt((claims.getId()));
	}
}

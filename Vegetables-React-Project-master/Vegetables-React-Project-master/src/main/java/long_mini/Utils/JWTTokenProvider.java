package long_mini.Utils;

import java.util.Date;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.*;
import long_mini.Security.UserDetail;


@Component
public class JWTTokenProvider {
	private static final Logger logger = LoggerFactory.getLogger(JWTTokenProvider.class);
	private final String JWT_SECRECT = "bachmocSecretKey";
	private final long JWT_EXPIRATION = 86400000;
	private final long	JWT_REFRESH_EXPIRATION= 86400000;
	static final String CLAIM_KEY_CREATED = "created";
	 
	private AppProperties appProperties;
	
	public String generateJwtToken(Authentication authentication) {
		OAuth2User userPrinpical =(OAuth2User) authentication.getPrincipal();
		return Jwts.builder()
				.setSubject((userPrinpical.getName()))
				.setIssuedAt(new Date())
				.setExpiration(new Date((new Date()).getTime()+JWT_EXPIRATION))
				.signWith(SignatureAlgorithm.HS512, JWT_SECRECT)
				.compact();
	}
	
	public String generateToken(UserDetail userDetails) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + JWT_EXPIRATION);
        return Jwts.builder()
                   .setSubject(userDetails.getUsername())
                   .setIssuedAt(now)
                   .setExpiration(expiryDate)
                   .signWith(SignatureAlgorithm.HS512, JWT_SECRECT)
                   .compact();
    }
	
	public String getTendnTuJwtToken(String token) {
		return Jwts.parser().setSigningKey(JWT_SECRECT).parseClaimsJws(token).getBody().getSubject();
	}
	
	public boolean validateJwtToken(String authToken) {
		try{
			System.out.println("Auth: "+authToken);
			Jwts.parser().setSigningKey(JWT_SECRECT).parseClaimsJws(authToken);
			return true;
		}catch(SignatureException e) {
			logger.error("Invalid JWT signature: {}", e.getMessage());
		}catch(MalformedJwtException e) {
			logger.error("Invalid JWT token: {}", e.getMessage());
		}catch(ExpiredJwtException e) {
			logger.error("Invalid token is expired: {}",e.getMessage());
		}catch(UnsupportedJwtException e) {
			logger.error("JWT token is unsupported: {}",e.getMessage());
		}catch(IllegalArgumentException e) {
			logger.error("JWT claims string is empty: {}",e.getMessage());
		}
		return false;
	}
	
	 public String createToken(Authentication authentication) {
	        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

	        Date now = new Date();
	        Date expiryDate = new Date(now.getTime() + appProperties.getAuth().getTokenExpirationMsec());

	        return Jwts.builder()
	                .setSubject(userPrincipal.getUsername())
	                .setIssuedAt(new Date())
	                .setExpiration(expiryDate)
	                .signWith(SignatureAlgorithm.HS512, appProperties.getAuth().getTokenSecret())
	                .compact();
	    }
	 
	 private Claims getClaimsFromToken(String token) {
	        Claims claims;
	        try {
	            claims = Jwts.parser()
	                    .setSigningKey(JWT_SECRECT)
	                    .parseClaimsJws(token)
	                    .getBody();
	        } catch (Exception e) {
	            claims = null;
	        }
	        return claims;
	    }
	 private Date generateExpirationDate() {
	        return new Date(System.currentTimeMillis() + JWT_REFRESH_EXPIRATION * 1000);
	    }
	 String generateToken(Map<String, Object> claims) {
	        return Jwts.builder()
	                .setClaims(claims)
	                .setExpiration(generateExpirationDate())
	                .signWith(SignatureAlgorithm.HS512, JWT_SECRECT)
	                .compact();
	    }
	 
	 public String refreshToken(String token) {
	        String refreshedToken;
	        try { 
	            final Claims claims = getClaimsFromToken(token);     
	            claims.put(CLAIM_KEY_CREATED, new Date());
	            refreshedToken = generateToken(claims);
	        } catch (Exception e) {
	            refreshedToken = null;
	        }
	        
	        return refreshedToken;
	    }

}

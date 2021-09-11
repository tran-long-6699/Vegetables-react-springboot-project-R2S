package long_mini.Utils;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import long_mini.Security.JwtUserDetailsService;
import long_mini.Security.UserDetailService;

@Service
public class JwtAuthenticationFilter extends OncePerRequestFilter{
	@Autowired JWTTokenProvider tokenProvider;
	@Autowired UserDetailService userService;
	@Autowired JwtUserDetailsService jwtUserDetailsService;
	@Autowired JWTTokenUtils jwtTokenUtil;
	public static final Logger log = Logger.getLogger(JwtAuthenticationFilter.class);
	
	  @Override
	    protected void doFilterInternal(HttpServletRequest request,
	                                    HttpServletResponse response, FilterChain filterChain)
	            throws ServletException, IOException {
	        try {
	        	String jwt = request.getHeader("Authorization") != null ? (request.getHeader("Authorization").startsWith("Bearer ") ? getJwtFromRequest(request) : request.getHeader("Authorization")) : "";
	            if (StringUtils.hasText(jwt) && tokenProvider.validateJwtToken(jwt)) {
	            	 System.out.println("Authentication Successfully");
	            	 CookieUtils.addCookie(response, "Auth", jwt, 3600);
	            	 Object authCookie = ResponseCookie.fromClientResponse("Auth", jwt)
	                         .maxAge(3600)
	                         .httpOnly(true)
	                         .path("/")
	                         .secure(true)
	                         .build();
	            	 
	        	     ResponseEntity.noContent()
	                 .header("Set-Cookie", authCookie.toString()).build();
	                String username = tokenProvider.getTendnTuJwtToken(jwt);
	                
	                UserDetails userDetails = userService.loadUserByUsername(username);
	                if(userDetails != null) {
	                    UsernamePasswordAuthenticationToken
	                            authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
	                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

	                    SecurityContextHolder.getContext().setAuthentication(authentication);
	                }
	            }else {
	            	
	            }
	        } catch (Exception ex) {
	            log.error("failed on set user authentication", ex);
	        }

	        filterChain.doFilter(request, response);
	    }

	    private String getJwtFromRequest(HttpServletRequest request) {
	        String bearerToken = request.getHeader("Authorization");
	        // Kiểm tra xem header Authorization có chứa thông tin jwt không
	        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
	            return bearerToken.substring(7);
	        }
	        return null;
	    }
	}

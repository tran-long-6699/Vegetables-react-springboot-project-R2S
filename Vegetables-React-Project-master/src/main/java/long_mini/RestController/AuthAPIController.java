package long_mini.RestController;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import long_mini.DTO.JwtResponse;
import long_mini.DTO.LoginRequest;
import long_mini.Entity.Users;
import long_mini.Security.UserDetail;
import long_mini.Service.UsersService;
import long_mini.Utils.CookieUtils;
import long_mini.Utils.JWTTokenProvider;

@RestController
@CrossOrigin
@RequestMapping("/api/login")
public class AuthAPIController {
	@Autowired JWTTokenProvider tokenProvider;
	@Autowired AuthenticationManager authenticationManager;
	@Autowired UsersService userService;
	@Autowired Users users;
	@Autowired JWTTokenProvider token;
	 	
	@PostMapping
	public ResponseEntity<?> authenticatedUser(@RequestBody LoginRequest loginRequest) {
		System.out.println(loginRequest.toString());
		Authentication authentication = authenticationManager.authenticate(
	                new UsernamePasswordAuthenticationToken(
	                        loginRequest.getUsername(),
	                        loginRequest.getPassword()
	                )
	        );
		 System.out.println("Auth: "+authentication.getAuthorities());
		 
		 SecurityContextHolder.getContext().setAuthentication(authentication);
	     String jwt = tokenProvider.generateToken((UserDetail) authentication.getPrincipal());
//	     HttpHeaders responseHeaders = new HttpHeaders();
//	     responseHeaders.add("Authorization", "Bearer "+jwt);
	     String refresh = tokenProvider.refreshToken(jwt);
	    
//	     System.out.println(authCookie.toString());
//	     System.out.println("Refresh: "+refresh);
	     UserDetail userDetail = (UserDetail) authentication.getPrincipal();
	     List<String> vaitro= userDetail.getAuthorities().stream()
	    		 .map(e -> e.getAuthority())
	    		 .collect(Collectors.toList());
	     users = userService.findByUsernameLike(userDetail.getUsername());
	        return ResponseEntity.ok()
//	        		.headers(responseHeaders)
	        		.body(new JwtResponse( 
	        		jwt,
	        		refresh,
	        		userDetail.getUsername(),
	        		users.getFullname(),
	        		users.getImage(),
	        		vaitro
	        		));
	}
	
} 
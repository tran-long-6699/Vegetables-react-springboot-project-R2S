package long_mini.Security;
                                                
import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import long_mini.Utils.RequestUtils;

@Component
public class AuthFailureHandler implements AuthenticationFailureHandler{
	@Autowired
	private LoginAttemptService loginAttemptService;
	@Autowired
	HttpServletRequest req;
	
	@Override  
	public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException exception) throws IOException, ServletException { 
		try {
			if (exception.getClass().isAssignableFrom(BadCredentialsException.class)) {
				loginAttemptService.loginFailed(RequestUtils.getClientIP(request));
			}
			if (exception.getMessage() != null && exception.getMessage().equalsIgnoreCase("blocked")) {
				response.sendRedirect(request.getContextPath() + "/veg/login?message=blocked"); 
				return;                          
			}
			
			response.sendRedirect(request.getContextPath() + "/veg/login?message=error&block="+req.getAttribute("hasErrors"));		
		}catch(Exception e) {
			
		}
	}

}

package long_mini.Security;
//package long_asm.Service;
//
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Primary;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.web.authentication.AuthenticationFailureHandler;
//import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
//import org.springframework.stereotype.Service;
//
//import long_asm.Entity.Users;
//import long_asm.ImpService.UsersRepo;
//@Service
//public class BeforeAuthenticationFilter extends UsernamePasswordAuthenticationFilter{
//	@Autowired
//	UsersRepo userService;
//	@Autowired
//	Users user;
//	
//	@Autowired
//	@Override
//	public void setAuthenticationManager(AuthenticationManager authenticationManager) {
//		super.setAuthenticationManager(authenticationManager);
//	}
//	
//	@Autowired
//	@Override
//	public void setAuthenticationSuccessHandler(AuthenticationSuccessHandler successHandler) {
//		super.setAuthenticationSuccessHandler(successHandler);
//	}
//
//	@Autowired
//	@Override
//	public void setAuthenticationFailureHandler(AuthenticationFailureHandler failureHandler) {
//		super.setAuthenticationFailureHandler(failureHandler);
//	}
//	
//	public BeforeAuthenticationFilter() {
//		super.setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher("/veg/login","POST"));
//	}
//
//	@Override
//	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
//			throws AuthenticationException {
//		String username = request.getParameter("username");
//		user = userService.findByUsernameLike(username);
//		if(user != null) {
//			System.out.println("Your username: "+user.getUsername());
//		}
//		return super.attemptAuthentication(request, response);
//	}
//	
//	
//}

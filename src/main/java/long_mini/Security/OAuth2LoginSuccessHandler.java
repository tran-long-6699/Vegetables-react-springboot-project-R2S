package long_mini.Security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import com.restfb.types.User;

import long_mini.Entity.Users;
import long_mini.ServiceImp.UsersServiceImp;
import long_mini.Utils.AppProperties;
import long_mini.Utils.HttpCookieOAuth2AuthorizationRequestRepository;
import long_mini.Utils.JWTTokenProvider;


@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
	@Autowired
	UsersServiceImp userService;
	@Autowired
	Users user;

	public JWTTokenProvider tokenProvider;

	public AppProperties appProperties;
	public HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;
	 @Autowired
	 OAuth2LoginSuccessHandler(JWTTokenProvider tokenProvider, AppProperties appProperties,
	                                       HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository) {
	        this.tokenProvider = tokenProvider;
	        this.appProperties = appProperties;
	        this.httpCookieOAuth2AuthorizationRequestRepository = httpCookieOAuth2AuthorizationRequestRepository;
	    }
	 
	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		if(response.isCommitted()) {
			logger.debug("Response has already been committed. Unable to redirect to " + "/home");
            return;
		}
		CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
		String clientName = oAuth2User.getclientName();
		user = userService.findByUsernameLike(oAuth2User.getEmail());
		User userFacebook = oAuth2User.getUser();
		if (user == null) {
			if(clientName.equals("Google")) {
				userService.create(oAuth2User);
			}else if(clientName.equals("Facebook")) {
				userService.createFacebook(userFacebook, oAuth2User);
			}				
		} else {
			List<GrantedAuthority> authorities = new ArrayList<>();
			user.getRoles().forEach(e ->{
				authorities.add(new SimpleGrantedAuthority(e.getRoleid()));
			}); 
			if(clientName.equals("Google")) {
				System.out.println("Update Success");
				userService.update(user, oAuth2User);
			}else if(clientName.equals("Facebook")) {
				userService.updateFacebook(userFacebook, user, oAuth2User);
			}
			Authentication auth = new UsernamePasswordAuthenticationToken(authentication.getPrincipal(), authentication.getCredentials(), authorities);
			SecurityContextHolder.getContext().setAuthentication(auth);
			System.out.println("Update Success: "+auth.getName());
		}

		getRedirectStrategy().sendRedirect(request, response, "http://localhost:3000/home");
	}
	
}

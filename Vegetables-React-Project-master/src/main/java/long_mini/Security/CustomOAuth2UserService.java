package long_mini.Security;
import java.io.Serializable;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.restfb.DefaultFacebookClient;
import com.restfb.FacebookClient;
import com.restfb.Parameter;
import com.restfb.Version;
import com.restfb.types.User;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		try {
			String clientName=userRequest.getClientRegistration().getClientName();
			if(clientName.equals("Facebook")) {
				FacebookClient facebookClient = new DefaultFacebookClient(userRequest.getAccessToken().getTokenValue(), Version.LATEST);			
				User user = facebookClient.fetchObject("me", User.class, Parameter.with("fields", "name, first_name, picture, birthday, gender, hometown, link"));
				return new CustomOAuth2User(clientName,super.loadUser(userRequest), user);
			}else {
				return new CustomOAuth2User(clientName, super.loadUser(userRequest));
			}
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
	} 
	
}
   
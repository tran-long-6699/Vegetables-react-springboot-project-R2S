package long_mini.Security;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import com.restfb.types.User;

public class CustomOAuth2User implements OAuth2User, Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String clientName;
	private OAuth2User oauth2User;
	private User user;
	
	public CustomOAuth2User(String clientName, OAuth2User oauth2User, User user) {
		this.clientName = clientName;
		this.oauth2User = oauth2User;
		this.user = user;
	}
	
	public CustomOAuth2User(String clientName, OAuth2User oauth2User) {
		this.clientName = clientName;
		this.oauth2User = oauth2User;
	}

	@Override
	public Map<String, Object> getAttributes() {
		return oauth2User.getAttribute(getName());
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		authorities.add(new SimpleGrantedAuthority("CUSTOMER"));
		return authorities;
	}

	@Override
	public String getName() {
		return oauth2User.getAttribute("email");
	}

	public String getFullname() {
		return oauth2User.getAttribute("name");
	}

	public String getEmail() {
		return oauth2User.getAttribute("email");
	}

	public String getProfile() {
		return oauth2User.getAttribute("picture");
	}

	public User getUser() {
		return user;
	}
	
	public String getclientName() {
		return this.clientName;
	}
	
}

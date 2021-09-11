package long_mini.Utils;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import long_mini.Entity.Users;

public class UserPrincipal implements OAuth2User, UserDetails {
	    /**
	 *  
	 */
	private static final long serialVersionUID = 1L;
		private String email;
	    private String password;
	    private Collection<? extends GrantedAuthority> authorities;
	    private Map<String, Object> attributes;

	    public UserPrincipal(String email, String password, Collection<? extends GrantedAuthority> authorities) {
	        this.email = email;
	        this.password = password;
	        this.authorities = authorities;
	    }

	    public static UserPrincipal create(Users user) {
	        List<GrantedAuthority> authorities = Collections.
	                singletonList(new SimpleGrantedAuthority("CUSTOMER"));

	        return new UserPrincipal(
	                user.getUsername(),
	                user.getPassword(),
	                authorities
	        );
	    }

	    public static UserPrincipal create(Users user, Map<String, Object> attributes) {
	        UserPrincipal userPrincipal = UserPrincipal.create(user);
	        userPrincipal.setAttributes(attributes);
	        return userPrincipal;
	    }

	

	    public String getEmail() {
	        return email;
	    }

	    @Override
	    public String getPassword() {
	        return password;
	    }

	    @Override
	    public String getUsername() {
	        return email;
	    }

	    @Override
	    public boolean isAccountNonExpired() {
	        return true;
	    }

	    @Override
	    public boolean isAccountNonLocked() {
	        return true;
	    }

	    @Override
	    public boolean isCredentialsNonExpired() {
	        return true;
	    }

	    @Override
	    public boolean isEnabled() {
	        return true;
	    }

	    @Override
	    public Collection<? extends GrantedAuthority> getAuthorities() {
	        return authorities;
	    }

	    @Override
	    public Map<String, Object> getAttributes() {
	        return attributes;
	    }

	    public void setAttributes(Map<String, Object> attributes) {
	        this.attributes = attributes;
	    }

	    @Override
	    public String getName() {
	        return email;
	    }
}

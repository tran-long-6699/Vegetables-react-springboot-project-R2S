package long_mini.Security;

import org.jboss.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import long_mini.Entity.Users;
import long_mini.Service.UsersService;

@Service
public class UserDetailService implements UserDetailsService {
	public static final Logger LOG = Logger.getLogger(UserDetailService.class);
	@Autowired Users user;
	@Autowired UsersService userService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {		
		user =userService.findByUsernameLike(username);
		if(user == null) {
			throw new UsernameNotFoundException("Login Failed");
		}
		System.out.println(user.getUsername());
		return new UserDetail(user);
	}

}

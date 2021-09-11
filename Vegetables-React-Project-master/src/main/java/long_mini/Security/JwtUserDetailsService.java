package long_mini.Security;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import long_mini.Entity.Users;
import long_mini.Service.UsersService;

@Service
public class JwtUserDetailsService implements UserDetailsService{
	@Autowired UsersService userService;
	@Autowired Users user;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		user = userService.findByUsernameLike(username);
		if (user != null) {
			return new User(username, user.getPassword(),
					new ArrayList<>());
		} else {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
	}
}

package long_mini.ServiceImp;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.restfb.types.User;

import long_mini.DAO.UsersDAO;
import long_mini.Entity.Authorities;
import long_mini.Entity.Roles;
import long_mini.Entity.Users;
import long_mini.Security.CustomOAuth2User;
import long_mini.Service.UsersService;
import net.bytebuddy.utility.RandomString;

@Service
@Transactional
public class UsersServiceImp implements UsersService {
	@Autowired
	Users users;
	@Autowired
	UsersDAO userDAO;
	@Autowired Authorities roleofuser;
	@Autowired
	AuthoritiesServiceImp roleofuserService;
	@Autowired
	RolesServiceImp roleService;
	@Autowired
	PasswordEncoder pe;

	@Override
	public List<Users> findAll() {
		return userDAO.findAll();
	}

	@Override
	public Users findByUsernameLike(String username) {
		return userDAO.findByUsernameLike(username);
	}

	@Override
	public Optional<Users> findById(String username) {
		return userDAO.findById(username);
	}

	public void create(String email, String name, String provider, String image) {
		Set<Roles> roles = new HashSet<Roles>();
		roles.add(roleService.findByRoleid("ROLE_USER"));
 		users.setActivated(true);
		users.setFullname(name);
		users.setPassword(pe.encode(RandomString.make(7)));
		users.setUsername(email);
		users.setAuthprovider(provider);
		users.setImage(image);
		users.setRoles(roles);
		userDAO.saveAndFlush(users);
	}

	public void update(Users users, String name, String provider, String image) {
		users.setFullname(name);
		users.setAuthprovider(provider);
		if (users.getImage().equals("")) {
			users.setImage(image);
		}
		userDAO.save(users);
	}

	@Override
	public List<Users> getAdministrators() {
		return userDAO.getAdministrators();
	}

	@Override
	public Users save(Users user) {
		return userDAO.save(user);
	}

	@Override
	public void deleteById(String username) {
		userDAO.deleteById(username);
	}

	@Override
	public Long countUser() {
		return userDAO.count();
	}

	@Override
	public Integer countByActivatedFalse() {
		return userDAO.countByActivatedFalse();
	}

	public void create(CustomOAuth2User oAuth2User) {
		Set<Roles> roles = new HashSet<Roles>();
		roles.add(roleService.findByRoleid("ROLE_USER"));
		users.setActivated(true);
		users.setFullname(oAuth2User.getFullname());
		users.setPassword(pe.encode(RandomString.make(7)));
		users.setUsername(oAuth2User.getEmail());
		users.setAuthprovider(oAuth2User.getclientName());
		users.setImage(oAuth2User.getProfile());
		users.setRoles(roles);
		userDAO.saveAndFlush(users);
	}

	public void update(Users user, CustomOAuth2User oAuth2User) {
		user.setFullname(user.getFullname().equals("") ? oAuth2User.getFullname() : user.getFullname());
		user.setAuthprovider(oAuth2User.getclientName());
		if (user.getImage().equals("")) {
			user.setImage(oAuth2User.getProfile());
		}
		userDAO.save(user);
	}

	public void createFacebook(User userFacebook, CustomOAuth2User oAuth2User) {
		Set<Roles> roles = new HashSet<Roles>();
		roles.add(roleService.findByRoleid("ROLE_USER"));
		users.setActivated(true);
		users.setFullname(oAuth2User.getFullname());
		users.setPassword(pe.encode(RandomString.make(7)));
		users.setUsername(oAuth2User.getEmail());
		users.setAuthprovider(oAuth2User.getclientName());
		users.setImage(oAuth2User.getProfile());
		users.setRoles(roles);
		userDAO.saveAndFlush(users);
	
		System.out.println("Create user from Facebook Success");
	}

	public void updateFacebook(User userFacebook, Users user, CustomOAuth2User oAuth2User) {
		user.setFullname(user.getFullname().equals("") ? oAuth2User.getFullname() : user.getFullname());
		user.setAuthprovider(oAuth2User.getclientName());
		if (user.getImage().equals("")) {
			user.setImage(userFacebook.getPicture().getUrl());
		}
		userDAO.save(user);
	}

	@Override
	public boolean update(Users user) {
		if(userDAO.existsById(user.getUsername())) {
			users = userDAO.findByUsernameLike(user.getUsername());
			users.setFullname(user.getFullname());
			users.setActivated(user.getActivated());
			users.setGender(user.getGender());
			userDAO.save(users);
			System.out.println("Update Success");
			return true;
		}
		return false;
	}

	@Override
	public boolean create(Users user) {
		try {
			if(!userDAO.existsById(user.getUsername())) {
				Set<Roles> roles = new HashSet<Roles>();
				roles.add(roleService.findByRoleid("ROLE_USER"));
				user.setPassword(pe.encode("12345"));
				user.setImage("default.png");
				user.setRoles(roles);
				userDAO.save(user);
				return true;
			}
			return false;
		} catch (Exception e) {
			return false;
		}	
	}

	@Override
	public boolean delete(String username) {
		try {
			if(userDAO.existsById(username)) {
				userDAO.deleteById(username);
				return true;
			}
			return false;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public boolean existsByUsername(String email) {	
		return userDAO.existsById(email);
	}

} 

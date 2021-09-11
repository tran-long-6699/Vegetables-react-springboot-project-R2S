package long_mini.RestController;

import java.util.Collection;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import long_mini.Entity.Authorities;
import long_mini.Entity.Roles;
import long_mini.Entity.Users;
import long_mini.Service.AuthoritiesService;
import long_mini.Service.RolesService;
import long_mini.Service.UsersService;

@RestController
@CrossOrigin("*")
@RequestMapping("/veg/admin/")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class AuthoritiesAPIController {
	@Autowired RolesService roleService;
	@Autowired AuthoritiesService authService;
	@Autowired UsersService userService;
	
	@GetMapping("/roles")
	public ResponseEntity<Collection<Roles>> getAllRoles(){
		return roleService.findAll().isEmpty() ? ResponseEntity.ok(Collections.emptyList()) :ResponseEntity.ok(roleService.findAll());
	}
	
	@GetMapping("/authorities")
	public ResponseEntity<Collection<Authorities>> getAllAuthorities(){
		return authService.findAll().isEmpty() ? ResponseEntity.ok(Collections.emptyList()) : ResponseEntity.ok(authService.findAll());
	}
	
	@PostMapping("/authorities")
	public ResponseEntity<Authorities> addAuthorities(@RequestBody Authorities authorities){
		return authService.add(authorities) ? ResponseEntity.ok(authorities) : ResponseEntity.badRequest().build();
	}
	
	@GetMapping("/authorities/{id}")
	public ResponseEntity<Void> getAuthorities(@PathVariable("id") Integer id){
		return authService.delete(id) ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
	} 
	
	@DeleteMapping("/authorities/{id}")
	public ResponseEntity<Void> deleteAuthorities(@PathVariable("id") Integer id){
		return authService.delete(id) ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
	} 
	
	@GetMapping("/users")
	public ResponseEntity<Collection<Users>> getAllUsers(){
		return userService.findAll().isEmpty() ? ResponseEntity.ok(Collections.emptyList()) : ResponseEntity.ok(userService.findAll());
	}
}

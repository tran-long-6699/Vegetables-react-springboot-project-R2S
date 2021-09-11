package long_mini.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import long_mini.Entity.Users;
import long_mini.Service.UsersService;

@RestController
@CrossOrigin("*")
@RequestMapping("/veg/admin/users")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class UsersAPIController {
	@Autowired UsersService userService;
	
	@PostMapping
	public ResponseEntity<Users> createUser(@RequestBody Users user){
		return userService.create(user) ? ResponseEntity.ok(user) : ResponseEntity.badRequest().build();
	}
	
	@PutMapping("/{username}")
	public ResponseEntity<Users> updateUser(@RequestBody Users user, @PathVariable("username") String username){
		return userService.update(user) ? ResponseEntity.ok(user) : ResponseEntity.badRequest().build();
	}
	
	@DeleteMapping("/{username}")
	public ResponseEntity<Void> deleteUser(@PathVariable("username") String username){
		return userService.delete(username) ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
	}
}

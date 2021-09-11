package long_mini.Service;

import java.util.List;
import java.util.Optional;
import java.util.function.IntPredicate;

import org.springframework.security.core.Authentication;

import long_mini.Entity.Authorities;
import long_mini.Entity.Users;

public interface UsersService {
	List<Users> findAll();
	
	Users findByUsernameLike(String username);
	
	Optional<Users> findById(String username);
	
	List<Users> getAdministrators();

	Users save(Users user);

	void deleteById(String username);
	
	Long countUser();
	
	Integer countByActivatedFalse();

	boolean update(Users user);

	boolean create(Users user);

	boolean delete(String username);

	boolean existsByUsername(String email);

}

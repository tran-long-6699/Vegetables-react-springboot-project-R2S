package long_mini.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import long_mini.Entity.Users;

@Repository
public interface UsersDAO extends JpaRepository<Users, String>{
	Users findByUsernameLike(String username);
	
	@Query("SELECT DISTINCT u.user FROM Authorities u")
	public List<Users> getAdministrators();
	
	@Query("SELECT count(o) FROM Users o WHERE o.activated = false")
	Integer countByActivatedFalse();
}
 
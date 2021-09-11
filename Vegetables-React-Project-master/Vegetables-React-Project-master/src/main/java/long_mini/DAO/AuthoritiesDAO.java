package long_mini.DAO;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import long_mini.Entity.Authorities;
import long_mini.Entity.Users;

@Repository
public interface AuthoritiesDAO extends JpaRepository<Authorities, Integer>{
	@Query("SELECT DISTINCT a FROM Authorities a WHERE a.user IN ?1")
	List<Authorities> authoritiesOf(List<Users> users);

	List<Authorities> findAllByUserUsernameLike(String username);
	
	Optional<Authorities> findById(Integer id);

	Authorities findByUserUsernameAndRolesRoleid(String username, String roleid);

}

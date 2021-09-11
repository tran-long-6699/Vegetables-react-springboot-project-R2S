package long_mini.Service;

import java.util.List;
import java.util.Optional;
import java.util.function.IntPredicate;

import long_mini.Entity.Authorities;

public interface AuthoritiesService {
	List<Authorities> findAll();
	
	Authorities create(Authorities auth);
	
	boolean delete(Integer id);
	
	List<Authorities> findAuthoritiesOfAdministrators();

	void save(Authorities roleofuser);
	
	List<Authorities> findAllByUsernameLike(String username);
	
	Authorities findByUserUsernameAndRolesRoleid(String username, String roleid);

	Optional<Authorities> findById(Integer id);

	boolean add(Authorities authorities);

	boolean delete(Authorities authorities);

	void deleteByAuthorities(Authorities authority);

	boolean existsById(Integer id);

}

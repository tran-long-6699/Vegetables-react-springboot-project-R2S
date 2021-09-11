package long_mini.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import long_mini.Entity.Roles;

@Repository
public interface RolesDAO extends JpaRepository<Roles, String>{
	Roles findByRoleid(String id);
}

package long_mini.Service;

import java.util.List;

import long_mini.Entity.Roles;

public interface RolesService {
	List<Roles> findAll();
	
	Roles findByRoleid(String id);
}

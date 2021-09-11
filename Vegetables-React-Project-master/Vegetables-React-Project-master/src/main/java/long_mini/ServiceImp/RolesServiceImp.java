package long_mini.ServiceImp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import long_mini.DAO.RolesDAO;
import long_mini.Entity.Roles;
import long_mini.Service.RolesService;

@Service
public class RolesServiceImp implements RolesService{
	@Autowired
	RolesDAO roledao;
	@Autowired
	Roles role;
	
	@Override
	public List<Roles> findAll() {
		return roledao.findAll();
	}

	@Override
	public Roles findByRoleid(String id) {
		return roledao.findByRoleid(id);
	}
	
}

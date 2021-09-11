package long_mini.ServiceImp;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import long_mini.DAO.AuthoritiesDAO;
import long_mini.DAO.UsersDAO;
import long_mini.Entity.Authorities;
import long_mini.Service.AuthoritiesService;

@Service
public class AuthoritiesServiceImp implements AuthoritiesService{
	@Autowired
	UsersDAO usersdao;
	@Autowired
	AuthoritiesDAO authDAO;

	@Override
	public List<Authorities> findAll() {
		return authDAO.findAll();
	}

	@Override
	public Authorities create(Authorities auth) {
		return authDAO.save(auth);
	}

	@Override
	public boolean delete(Integer id) {
		try {
			if(authDAO.existsById(id)) {
				authDAO.deleteById(id);
				return true;
			}
			return false;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public List<Authorities> findAuthoritiesOfAdministrators() {
		return authDAO.authoritiesOf(usersdao.getAdministrators());
	}

	@Override
	public void save(Authorities Authorities) {
		authDAO.save(Authorities);
	}

	@Override
	public List<Authorities> findAllByUsernameLike(String username) {
		return authDAO.findAllByUserUsernameLike(username);
	}

	@Override
	public Optional<Authorities> findById(Integer id) {
		return authDAO.findById(id);
	}

	@Override
	public boolean add(Authorities authorities) {
		try {
			authDAO.saveAndFlush(authorities);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	@Override
	public boolean delete(Authorities authorities) {
		try {
			authDAO.delete(authorities);
			return true;
		}catch(Exception e) {
			return false;
		}
		
	}

	@Override
	public Authorities findByUserUsernameAndRolesRoleid(String username, String roleid) {
		return authDAO.findByUserUsernameAndRolesRoleid(username, roleid);
	}

	@Override
	public void deleteByAuthorities(Authorities authority) {
		authDAO.delete(authority);
		
	}

	@Override
	public boolean existsById(Integer id) {
		return authDAO.existsById(id);
	}


}

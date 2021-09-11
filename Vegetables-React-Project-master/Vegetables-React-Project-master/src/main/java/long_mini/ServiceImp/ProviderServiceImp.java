package long_mini.ServiceImp;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import long_mini.DAO.ProviderDAO;
import long_mini.Entity.Provider;
import long_mini.Service.ProviderService;

@Service
public class ProviderServiceImp implements ProviderService{
	@Autowired
	ProviderDAO pvderdao;
	@Autowired
	Provider pvder;
	
	@Override
	public List<Provider> findAll() {
		return pvderdao.findAll();
	}

	@Override
	public Optional<Provider> findById(String id) {
		return pvderdao.findById(id);
	}

	@Override
	public <S extends Provider> S save(S entity) {
		return pvderdao.save(entity);
	}

	@Override
	public boolean existsById(String id) {
		return pvderdao.existsById(id);
	}

	@Override
	public void deleteById(String id) {
		pvderdao.deleteById(id);
	}

	@Override
	public boolean create(Provider provider) {
		if(!pvderdao.existsById(provider.getProviderid())) {
			pvderdao.saveAndFlush(provider);
			return true;
		}
		return false;
	}

	@Override
	public boolean update(Provider provider) {
		if(pvderdao.existsById(provider.getProviderid())) {
			pvderdao.save(provider);
			return true;
		}
		return false;
	}

	@Override
	public boolean delete(String providerid) {
		if(pvderdao.existsById(providerid)) {
			pvderdao.deleteById(providerid);
			return true;
		}
		return false;
	}
}

package long_mini.Service;

import java.util.List;
import java.util.Optional;

import long_mini.Entity.Provider;

public interface ProviderService {
	List<Provider> findAll();
	
	Optional<Provider> findById(String id);

	<S extends Provider> S save(S entity);

	boolean existsById(String id);

	void deleteById(String id);

	boolean create(Provider provider);

	boolean update(Provider provider);

	boolean delete(String providerid);
}

package long_mini.Service;

import java.util.List;
import java.util.Optional;

import long_mini.Entity.Category;

public interface CategoryService {
	List<Category> findAll();
	
	Optional<Category> findById(Integer id);
	
	<S extends Category> S save(S entity);
	
	boolean existsById(Integer id);
	
	void deleteById(Integer id);
}

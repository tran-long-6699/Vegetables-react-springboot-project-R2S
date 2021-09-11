package long_mini.Service;

import java.util.List;
import java.util.Optional;

import long_mini.Entity.Product;

public interface ProductService {
	List<Product> findAll();
	
	Product findByProductidLike(String pdid);
	
	List<Product> findAllByCategoryid(Integer catid);
	
	List<Product> findAllByProductnameLike(String productname);
	
	Optional<Product> findById(String id);

	<S extends Product> S save(S entity);

	boolean existsById(String id);

	void deleteById(String id);
}

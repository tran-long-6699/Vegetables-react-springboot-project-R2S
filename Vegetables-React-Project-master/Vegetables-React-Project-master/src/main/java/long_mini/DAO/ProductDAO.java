package long_mini.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import long_mini.Entity.Product;

@Repository
public interface ProductDAO extends JpaRepository<Product, String>{
	
	Product findByProductidLike(String pdid);
	
	List<Product> findAllByCategoryCatid(Integer catid);
	
	List<Product> findAllByProductnameLike(String productname);
}

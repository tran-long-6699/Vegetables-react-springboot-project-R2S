package long_mini.ServiceImp;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import long_mini.DAO.ProductDAO;
import long_mini.Entity.Product;
import long_mini.Service.ProductService;
@Service
public class ProductServiceImp implements ProductService{
	@Autowired
	ProductDAO prodao;
	@Autowired
	Product pro;
	
	@Override
	public List<Product> findAll() {
		return prodao.findAll();
	}
	@Override
	public Product findByProductidLike(String pdid) {
		return prodao.findByProductidLike(pdid);
	}
	@Override
	public List<Product> findAllByCategoryid(Integer catid) {
		return prodao.findAllByCategoryCatid(catid);
	}
	
	@Override
	public Optional<Product> findById(String id) {
		return prodao.findById(id);
	}
	@Override
	public <S extends Product> S save(S entity) {
		return prodao.save(entity);
	}
	@Override
	public boolean existsById(String id) {
		return prodao.existsById(id);
	}
	@Override
	public void deleteById(String id) {
		prodao.deleteById(id);
	}
	@Override
	public List<Product> findAllByProductnameLike(String productname) {
		return prodao.findAllByProductnameLike("%"+productname+"%");
	}
	
	
}

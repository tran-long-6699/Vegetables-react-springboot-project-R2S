package long_mini.ServiceImp;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import long_mini.DAO.CategoryDAO;
import long_mini.Entity.Category;
import long_mini.Service.CategoryService;

@Service
public class CategoryServiceImp implements CategoryService{
	@Autowired
	CategoryDAO catdao;
	@Autowired
	Category category;
	
	@Override
	public List<Category> findAll() {
		return catdao.findAll();
	}

	@Override
	public Optional<Category> findById(Integer id) {
		return catdao.findById(id);
	}

	@Override
	public <S extends Category> S save(S entity) {
		return catdao.save(entity);
	}

	@Override
	public boolean existsById(Integer id) {
		return catdao.existsById(id);
	}

	@Override
	public void deleteById(Integer id) {
		catdao.deleteById(id);	
	}


}

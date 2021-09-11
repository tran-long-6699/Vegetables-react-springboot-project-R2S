package long_mini.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import long_mini.Entity.Category;

@Repository
public interface CategoryDAO extends JpaRepository<Category, Integer>{

}

package long_mini.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import long_mini.Entity.Orderdetail;

@Repository
public interface OrderdetailDAO extends JpaRepository<Orderdetail, Integer>{
	List<Orderdetail> findAllByOrdersId(Integer orderid);
}

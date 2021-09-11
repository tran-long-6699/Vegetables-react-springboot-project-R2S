package long_mini.DAO;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import long_mini.Entity.Orders;

@Repository
public interface OrdersDAO extends JpaRepository<Orders, Integer>{
	
	@Query("SELECT DISTINCT(MONTH(o.invoicedate)) FROM Orders o")
	List<Integer> getMonth();

	List<Orders> findAllByUserUsernameOrderByIdDesc(String email);

}

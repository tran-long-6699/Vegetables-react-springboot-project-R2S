package long_mini.Service;

import java.util.List;
import java.util.Optional;
import org.springframework.security.core.Authentication;

import long_mini.Entity.Orders;
import long_mini.DTO.OrderRequest;

public interface OrdersService {
	List<Orders> findAll();
	
	<S extends Orders> S save(S entity);
	
	Optional<Orders> findById(Integer id);
	
	List<Orders> findAllByUserUsername(String customerid);
	
	List<Integer> getMonth();

	boolean createOrderDetail(OrderRequest request, Authentication auth);
}

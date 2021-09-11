package long_mini.Service;

import java.util.Collection;
import java.util.List;

import long_mini.Entity.Orderdetail;

public interface OrderdetailService {
	List<Orderdetail> findAll();
	
	List<Orderdetail> findAllByOrderid(Integer orderid);

	void saveAllAndFlush(Collection<Orderdetail> details);

}

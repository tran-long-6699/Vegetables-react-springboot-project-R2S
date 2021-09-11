package long_mini.ServiceImp;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import long_mini.DAO.OrderdetailDAO;
import long_mini.Entity.Orderdetail;
import long_mini.Service.OrderdetailService;
@Service
public class OrderdetailServiceImp implements OrderdetailService{
	@Autowired
	OrderdetailDAO orderdao;
	@Autowired
	Orderdetail order;
	
	@Override
	public List<Orderdetail> findAll() {
		return orderdao.findAll();
	}

	@Override
	public List<Orderdetail> findAllByOrderid(Integer orderid) {
		return orderdao.findAllByOrdersId(orderid);
	}

	@Override
	public void saveAllAndFlush(Collection<Orderdetail> details) {
		orderdao.saveAllAndFlush(details);
	}

}

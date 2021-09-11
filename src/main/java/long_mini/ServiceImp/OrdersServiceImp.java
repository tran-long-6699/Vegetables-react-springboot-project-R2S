package long_mini.ServiceImp;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import long_mini.DAO.OrdersDAO;
import long_mini.Entity.Orderdetail;
import long_mini.Entity.Orders;
import long_mini.Service.OrderdetailService;
import long_mini.Service.OrdersService;
import long_mini.Service.ProductService;
import long_mini.Service.UsersService;
import long_mini.DTO.DetailDTO;
import long_mini.DTO.OrderRequest;
@Service
public class OrdersServiceImp implements OrdersService{
	@Autowired OrdersDAO orderDAO;
	@Autowired Orders order;
	@Autowired OrderdetailService detailService;
	@Autowired UsersService userService;
	@Autowired Orderdetail details;
	@Autowired ProductService pdService;
	
	@Override
	public List<Orders> findAll() {
		return orderDAO.findAll();
	}
  
	@Override
	public <S extends Orders> S save(S entity) {
		return orderDAO.save(entity);
	}
    
	@Override
	public Optional<Orders> findById(Integer id) {
		return orderDAO.findById(id);
	}

	
	@Override
	public List<Integer> getMonth() {
		return orderDAO.getMonth();
	}
 
	@Override
	public boolean createOrderDetail(OrderRequest request, Authentication auth) {
		try {
			order = new Orders();
			order.setId(null);
			order.setUser(userService.findByUsernameLike(auth.getName()));
			order.setAddress(request.getAddress());
			order.setFullname(request.getFullname());
			order.setModeofpayment(request.getModeofpayment());
			order.setPhone(request.getPhone());
			order.setTotal(request.getTotal());
			order.setSubtotal(request.getSubtotal());
			orderDAO.save(order);
			
			Set<Orderdetail> ordDetail = new HashSet<Orderdetail>();
			Set<DetailDTO> detailDTO = request.getOrderDetails();
			detailDTO.forEach(e->{
				details = new Orderdetail();
				details.setDetailid(null);
				details.setOrders(order);
				details.setPrice(Double.valueOf(e.getPriceaverage()));
				details.setProducts(pdService.findByProductidLike(e.getProductid()));
				details.setQuantity(e.getSoLuong());
				ordDetail.add(details);
			});
			detailService.saveAllAndFlush(ordDetail);
			return true;
		}catch(Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@Override
	public List<Orders> findAllByUserUsername(String username) {
		return orderDAO.findAllByUserUsernameOrderByIdDesc(username);
	}

   	
}

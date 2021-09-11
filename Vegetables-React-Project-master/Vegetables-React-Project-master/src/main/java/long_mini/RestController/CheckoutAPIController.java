package long_mini.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import long_mini.DTO.OrderRequest;
import long_mini.Service.OrdersService;

@RestController
@CrossOrigin
@RequestMapping("/veg/customer/checkout")
@PreAuthorize("hasAuthority('ROLE_USER')")
public class CheckoutAPIController {
	@Autowired OrdersService orderService;
	
	@PostMapping
	public ResponseEntity<OrderRequest> order(@RequestBody OrderRequest order, Authentication auth){
		return  orderService.createOrderDetail(order, auth) ? ResponseEntity.ok(order) : ResponseEntity.badRequest().build();
	}
}

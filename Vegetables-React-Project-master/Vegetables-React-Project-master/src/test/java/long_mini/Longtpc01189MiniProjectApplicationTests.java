package long_mini;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.Date;
import java.util.HashSet;
import java.util.Random;
import java.util.Set;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import long_mini.Entity.Authorities;
import long_mini.Entity.Orderdetail;
import long_mini.Entity.Orders;
import long_mini.Entity.Product;
import long_mini.Entity.Provider;
import long_mini.Entity.Roles;
import long_mini.Entity.Users;
import long_mini.Service.AuthoritiesService;
import long_mini.Service.CategoryService;
import long_mini.Service.OrdersService;
import long_mini.Service.ProductService;
import long_mini.Service.ProviderService;
import long_mini.Service.RolesService;
import long_mini.Service.UsersService;
@SpringBootTest
@TestMethodOrder(OrderAnnotation.class)
class Longtpc01189MiniProjectApplicationTests {
	@Autowired ProviderService pService;
	@Autowired UsersService uService;
	@Autowired PasswordEncoder pe;
	@Autowired RolesService rService;
	@Autowired AuthoritiesService authService;
	@Autowired CategoryService catService;
	@Autowired ProductService productService;
	@Autowired OrdersService oService;
	
	@Test
	@Order(value = 1)
	public void testCreateUser() {
		String email ="longtran@gmail.com";
		String password = pe.encode("12345");
		String fullname ="Trần Long";
		Boolean gender = true;
		String image = "";
		String verifycode ="";
		Boolean activated = true;
		String authprovider ="";
		Date createdate = new Date();
		Users user = new Users(email, password, fullname, gender, image, verifycode, activated, authprovider, createdate, null, null);
		uService.save(user);
		assertNotNull(uService.findByUsernameLike(email));
	}
	
	
	@Test
	@Order(value = 2)
	public void testFindAllUser() {
		assertThat(uService.findAll()).size().isGreaterThan(0);
	}
	
	@Test
	@Order(value = 3)
	public void testFindByUsername() {
		String email ="longtran@gmail.com";
		Users user = uService.findById(email).get();
		assertEquals(email, user.getUsername());
	}
	
	
	@Test
	@Order(value = 4)
	public void testUpdateUser() {
		String email ="longtran@gmail.com";
		Users user = uService.findById(email).get();
		user.setAuthprovider("GOOGLE");
		uService.save(user);
		assertNotEquals("FACEBOOK", uService.findById(email).get().getAuthprovider());
	}

	@Test
	@Order(value = 5)
	public void testDeleteUser() {
		String email ="longtran@gmail.com";
		uService.deleteById(email);
		assertThat(uService.existsByUsername(email)).isFalse();
	}
	
	@Test
	@Order(value = 1)
	public void testCreateProvider() {
		Provider provider = new Provider("ComTest", "Company Junit Test", "0701231231", "Trà Vinh", null);
		pService.save(provider);
		assertNotNull(pService.findById("ComTest").get());
	}
	
	
	@Test
	@Order(value = 2)
	public void testFindAll() {
		assertThat(pService.findAll()).size().isGreaterThan(0);
	}
	
	@Test
	@Order(value = 3)
	public void testFindById() {
		Provider provider = pService.findById("ComTest").get();
		assertEquals("ComTest", provider.getProviderid());
	}
	
	
	@Test
	@Order(value = 4)
	public void testUpdateProvider() {
		Provider provider = pService.findById("ComTest").get();
		provider.setPhone("0702362681");
		pService.save(provider);
		assertNotEquals("0701231231", pService.findById("ComTest").get().getPhone());
	}

	@Test
	@Order(value = 5)
	public void testDeleteProvider() {
		pService.deleteById("ComTest");
		assertThat(pService.existsById("ComTest")).isFalse();
	}
	
	@Test
	@Order(value = 1)
	public void testCreateAuthorities() {
		String email ="longtran12@gmail.com";
		String password = pe.encode("12345");
		String fullname ="Trần Long";
		Boolean gender = true;
		String image = "";
		String verifycode ="";
		Boolean activated = true;
		String authprovider ="";
		Date createdate = new Date();
		String roleid ="ROLE_USER";
		Set<Roles> roles = new HashSet<Roles>();
		roles.add(rService.findByRoleid(roleid));
		Users user = new Users(email, password, fullname, gender, image, verifycode, activated, authprovider, createdate,roles, null);
		uService.save(user);
		assertNotNull(uService.findByUsernameLike(email));
	}
	
	
	@Test
	@Order(value = 2)
	public void testFindAllAuthorities() {
		assertThat(authService.findAll()).size().isGreaterThan(0);
	}
	
	@Test
	@Order(value = 3)
	public void testFindByAuthorities() {
		String email ="longtran12@gmail.com";
		String roleid = "ROLE_USER";
		assertEquals(email, authService.findByUserUsernameAndRolesRoleid(email, roleid).getUser().getUsername());
	}
	
	
	@Test
	@Order(value = 4)
	public void testUpdateAuthorities() {
		String oldRole ="ROLE_USER";
		String role ="ROLE_PM";
		String username="longtran12@gmail.com";
		Authorities authorities = authService.findByUserUsernameAndRolesRoleid(username, oldRole);
		authorities.setRoles(rService.findByRoleid(role));
		authService.save(authorities);
		assertNotEquals("ROLE_USER", authService.findByUserUsernameAndRolesRoleid(username, role).getRoles().getRoleid());
	}

	@Test
	@Order(value = 5)
	public void testDeleteAuthorities() {
		String username ="longtran12@gmail.com";
		String role = "ROLE_PM";
		Authorities authority = authService.findByUserUsernameAndRolesRoleid(username, role);
		Integer id = authority.getId();
		authService.deleteByAuthorities(authority);
		assertThat(authService.existsById(id)).isFalse();
	}
	
	@Test
	@Order(value = 1)
	public void testFindAllProducts() {
		assertThat(productService.findAll()).size().isGreaterThan(0);
	}
	
	@Test
	@Order(value = 1)
	public void testFindAllCategories() {
		assertThat(catService.findAll()).size().isGreaterThan(0);
	}
	
	@Test
	@Order(value=1)
	public void testCreateOrder() {
		Random generator = new Random(19900828);
		Integer orderExamp = generator.nextInt(5);
		Integer quantity = 2;
		Double price = 500000.0;
		String fullname ="Trần Long";
		Date invoicedate = new Date();
		Integer subtotal = 1000000;
		Integer total = 1030000;
		String phone ="0702362681";
		String address = "Cầu Quan - Tiểu Cần - Trà Vinh";
		String modeofpayment ="ATM";
		Users user = uService.findByUsernameLike("daiduong1871999@gmail.com");
		Integer countDetail =5;
		Product product = productService.findByProductidLike("Veg01");
		Set<Orderdetail> orderdetail = new HashSet<Orderdetail>();
		
		Orders order = new Orders(orderExamp, fullname, invoicedate, subtotal, total, phone, address, modeofpayment, orderdetail, user);
		for (int i = 0; i < countDetail; i++) {
			Orderdetail detail = new Orderdetail(null, quantity, price, order, product);
			orderdetail.add(detail);
		}
		order.setOrderdetail(orderdetail);
		oService.save(order);
		
	}
}

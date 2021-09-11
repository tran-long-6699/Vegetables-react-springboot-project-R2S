//package long_mini.Provider;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.junit.jupiter.api.Assertions.assertNotEquals;
//import static org.junit.jupiter.api.Assertions.assertNotNull;
//
//import org.junit.jupiter.api.Order;
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.TestMethodOrder;
//import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
//import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
//import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
//
//
//import long_mini.Entity.Provider;
//import long_mini.Service.ProviderService;
//import long_mini.ServiceImp.ProviderServiceImp;
//
//@DataJpaTest
//@TestMethodOrder(OrderAnnotation.class)
//@AutoConfigureTestDatabase(replace = Replace.NONE)
//public class ProviderRestControllerTest {
//
//@Autowired private ProviderServiceImp pService;
//	
//	@Test
//	@Order(value = 1)
//	public void testCreateProvider() {
//		Provider provider = new Provider("ComTest", "Company Junit Test", "0701231231", "Trà Vinh", null);
//		pService.save(provider);
//		assertNotNull(pService.findById("ComTest").get());
//	}
//	
//	
//	@Test
//	@Order(value = 2)
//	public void testFindAll() {
//		assertThat(pService.findAll()).size().isGreaterThan(0);
//	}
//	
//	@Test
//	@Order(value = 3)
//	public void testFindById() {
//		Provider provider = pService.findById("ComTest").get();
//		assertEquals("ComTest", provider.getProviderid());
//	}
//	
//	
//	@Test
//	@Order(value = 4)
//	public void testUpdateProvider() {
//		Provider provider = pService.findById("ComTest").get();
//		provider.setPhone("0702362681");
//		pService.save(provider);
//		assertNotEquals("0701231231", pService.findById("ComTest").get().getPhone());
//	}
//
//	@Test
//	@Order(value = 5)
//	public void testDeleteProvider() {
//		pService.deleteById("ComTest");
//		assertThat(pService.existsById("ComTest")).isFalse();
//	}
//}

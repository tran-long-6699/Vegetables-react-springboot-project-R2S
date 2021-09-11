package long_mini.RestController;

import java.util.Collection;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import long_mini.Entity.Category;
import long_mini.Entity.Product;
import long_mini.Service.CategoryService;
import long_mini.Service.ProductService;

@RestController
@CrossOrigin
@RequestMapping("/veg/api")
public class ShopAPIController {
	@Autowired ProductService pdService;
	@Autowired CategoryService catService;
	
	@GetMapping("/product")
	public ResponseEntity<Collection<Product>> dsSP(){
		return pdService.findAll().isEmpty() ? ResponseEntity.ok(Collections.emptyList()) : ResponseEntity.ok(pdService.findAll());
	}
	
	@GetMapping("/product/{categoryid}")
	public ResponseEntity<Collection<Product>> dsSPTheoLoai(@PathVariable("categoryid") Integer categoryid){
		return pdService.findAllByCategoryid(categoryid).isEmpty() ? ResponseEntity.ok(Collections.emptyList()) : ResponseEntity.ok(pdService.findAllByCategoryid(categoryid));
	}
	
	@GetMapping("/categories")
	public ResponseEntity<Collection<Category>> dsLoai(){
		return catService.findAll().isEmpty() ? ResponseEntity.ok(Collections.emptyList()) : ResponseEntity.ok(catService.findAll());
	}
}

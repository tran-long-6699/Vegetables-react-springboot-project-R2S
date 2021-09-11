package long_mini.RestController;

import java.util.Collection;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import long_mini.Entity.Provider;
import long_mini.Service.ProviderService;

@RestController
@CrossOrigin
@RequestMapping("/veg/admin/provider")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class ProviderAPIController {
	@Autowired ProviderService pService;
	
	@GetMapping
	public ResponseEntity<Collection<Provider>> fetchAllProvider(){
		return pService.findAll().isEmpty() ? ResponseEntity.ok(Collections.emptyList()) : ResponseEntity.ok(pService.findAll());
	}
	
	@PostMapping
	public ResponseEntity<Provider> saveProvider(@RequestBody Provider provider){
		return pService.create(provider) ? ResponseEntity.ok(provider) : ResponseEntity.badRequest().build();
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Provider> updateProvider(@RequestBody Provider provider, @PathVariable("id") String providerid){
		return pService.update(provider) ? ResponseEntity.ok(provider) : ResponseEntity.notFound().build();
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteProvider(@PathVariable("id") String providerid){
		return pService.delete(providerid) ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
	}
}

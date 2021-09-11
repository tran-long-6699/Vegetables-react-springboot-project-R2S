package long_mini.DAO;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import long_mini.Entity.Provider;

@Repository
public interface ProviderDAO extends JpaRepository<Provider, String>{

}

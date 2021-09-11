package long_mini.Entity;

import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.bytebuddy.utility.RandomString;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Component
@Getter
@Setter
public class Provider implements Serializable{/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	public String providerid = RandomString.make(15);
	public String providername;
	public String phone;
	public String address;
	
	@OneToMany(mappedBy = "provider")
	@JsonIgnore
	public Set<Product> product = new HashSet<>();
	
}

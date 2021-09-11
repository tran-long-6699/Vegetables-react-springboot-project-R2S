package long_mini.Entity;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.AllArgsConstructor;

@Getter @Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Component
public class Roles implements Serializable{/**
	 * 
	 */  
	private static final long serialVersionUID = 1L;
	@Id
	public String roleid;
	public String rolename;
	
	@OneToMany(mappedBy = "roles")
	@JsonIgnore
	public Set<Authorities> authrole = new HashSet<>();
}

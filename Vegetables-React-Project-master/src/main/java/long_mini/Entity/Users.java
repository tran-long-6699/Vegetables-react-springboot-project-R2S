package long_mini.Entity;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import long_mini.Utils.RemoveDuplicate;

@Getter @Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Component
@ToString
public class Users implements Serializable{
	
	private static final long serialVersionUID = 1L;
	@Id
	public String username;
	@JsonIgnore
	public String password;
	public String fullname;
	public Boolean gender;
	public String image;
	public String verifycode;
	public Boolean activated = false;
	public String authprovider;
	@Temporal(TemporalType.DATE)
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	public Date createdate = new Date();
	
	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name="Authorities", joinColumns = @JoinColumn(name="username"),
	inverseJoinColumns = @JoinColumn(name="roleid"))
	public Set<Roles> roles = new HashSet<Roles>();

	@OneToMany(mappedBy = "user")
	@JsonIgnore
	public Set<Authorities> authorities = new HashSet<>();
	
	
	public Users(String email, String password, String fullname, String image) {
		this.username = email;
		this.password = password;
		this.fullname= fullname;
		this.image = image;
	}
}

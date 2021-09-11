package long_mini.Entity;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Component
public class Product implements Serializable{
	/**
	 * 
	 */ 
	private static final long serialVersionUID = 1L;
	@Id
	public String productid;
	public String productname;
	public String description;
	public String image;  
	public Integer priceaverage =0;
	public Integer sales = 0;
	
	@ManyToOne
	@JoinColumn(name="categoryid",referencedColumnName = "catid")
	public Category category;
	
	@ManyToOne
	@JoinColumn(name="providerid")
	public Provider provider;
	
	
	@OneToMany(mappedBy = "products")
	@JsonIgnore
	public Set<Orderdetail> orderdetails = new HashSet<Orderdetail>();
	
	
}

package long_mini.Entity;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Component
@ToString
public class Orderdetail implements Serializable{/**
	 * 
	 */ 
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Integer detailid;
	public Integer quantity=1;
	public Double price = 0.0;
	
	@ManyToOne
	@JoinColumn(name="orderid")
	public Orders orders;
	
	@ManyToOne
	@JoinColumn(name="pdid")
	public Product products;
}

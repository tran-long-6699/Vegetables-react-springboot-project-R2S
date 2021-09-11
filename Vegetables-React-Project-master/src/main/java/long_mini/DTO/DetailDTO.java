package long_mini.DTO;

import java.io.Serializable;

import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DetailDTO implements Serializable{/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	public String productid;
	public String productname;
	public String image;
	public Integer soLuong;
	public Integer priceaverage;
}

package long_mini.DTO;

import java.util.HashSet;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import long_mini.Entity.Orderdetail;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {
	public String username;
	public String address;
	public String phone;
	public String modeofpayment;
	public String fullname;
	public Integer total;
	public Integer subtotal;
	public Set<DetailDTO> orderDetails = new HashSet<DetailDTO>();
}

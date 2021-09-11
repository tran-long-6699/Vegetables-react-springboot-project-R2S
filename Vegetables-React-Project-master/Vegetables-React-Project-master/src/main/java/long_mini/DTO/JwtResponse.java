package long_mini.DTO;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class JwtResponse {
	private String accesstoken;
	private String refreshtoken;
	private String type = "Bearer";
	private String username;
	private String fullname;
	private String image;
	private List<String> roles;
//	private String cookie;
	public JwtResponse(String accessToken, String refreshtoken, String username, String fullname,String image, List<String> roles) {
		this.accesstoken = accessToken;
		this.refreshtoken = refreshtoken;
		this.username = username;
		this.fullname = fullname;
		this.image = image;
		this.roles = roles;
//		this.cookie = cookie;
	}
}

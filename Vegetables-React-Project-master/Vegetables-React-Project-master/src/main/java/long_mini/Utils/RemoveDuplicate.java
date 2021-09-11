package long_mini.Utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RemoveDuplicate {
	@Autowired PasswordEncoder pe;	
	
	
	public static String encode(String pass) {
		RemoveDuplicate remove = new RemoveDuplicate();
		return remove.encodePE(pass);
	}
	
	
	public String encodePE(String pass) {
		return pe.encode(pass);
	}
}

package long_mini.Security;
import java.io.IOException;
import java.util.Collection;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Component
public class AuthSuccessHandler implements AuthenticationSuccessHandler {
	private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();	
	
	@Override
	public void onAuthenticationSuccess(HttpServletRequest arg0, HttpServletResponse arg1,
			Authentication authentication) throws IOException, ServletException {
		boolean hasManRole = false;
		boolean hasEmpRole = false;
		boolean hasCusRole = false;
		Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
		for (GrantedAuthority grantedAuthority : authorities) {
			if (grantedAuthority.getAuthority().equals("MANAGER")) {
				hasManRole = true;
				break;
			} else if (grantedAuthority.getAuthority().equals("STAFF")) {
				hasEmpRole = true; 
				break;
			} else if (grantedAuthority.getAuthority().equals("CUSTOMER")) {
				hasCusRole = true;
				break;
			} 
		}
		if (hasEmpRole) {
			redirectStrategy.sendRedirect(arg0, arg1, "/veg/home");
		} else if (hasManRole) {
			redirectStrategy.sendRedirect(arg0, arg1, "/veg/admin/home");
		} else if (hasCusRole) {
			redirectStrategy.sendRedirect(arg0, arg1, "/veg/home");
		} else {
			throw new IllegalStateException();
		}
	}
}

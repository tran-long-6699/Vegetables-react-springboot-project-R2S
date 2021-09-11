package long_mini.Security;

import static long_mini.Utils.HttpCookieOAuth2AuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import long_mini.Utils.CookieUtils;
import long_mini.Utils.HttpCookieOAuth2AuthorizationRequestRepository;
@Component
public class OAuth2AuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler{
	 @Autowired
	    HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;

	    @Override
	    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
	        String targetUrl = CookieUtils.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME)
	                .map(Cookie::getValue)
	                .orElse(("/"));
 
	        targetUrl = UriComponentsBuilder.fromUriString(targetUrl)
	                .queryParam("error", exception.getLocalizedMessage())
	                .build().toUriString();
	        httpCookieOAuth2AuthorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
	        System.out.println("Co loi");
	        getRedirectStrategy().sendRedirect(request, response, targetUrl);
	    }
}

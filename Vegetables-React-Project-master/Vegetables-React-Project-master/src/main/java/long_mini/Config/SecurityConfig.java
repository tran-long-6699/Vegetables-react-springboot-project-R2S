package long_mini.Config;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import long_mini.Security.AuthFailureHandler;
import long_mini.Security.AuthSuccessHandler;
import long_mini.Security.CustomAccessDeniedHandler;
import long_mini.Security.CustomOAuth2UserService;
import long_mini.Security.OAuth2AuthenticationFailureHandler;
import long_mini.Security.OAuth2LoginSuccessHandler;
import long_mini.Security.UserDetailService;
import long_mini.Utils.HttpCookieOAuth2AuthorizationRequestRepository;
import long_mini.Utils.JwtAuthenticationFilter;
import long_mini.Utils.JwtAuthenticationTokenFilter;
              
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter{
	@Autowired
	private CustomOAuth2UserService oAuth2UserService;
	
//	@Autowired
//	private CustomAccessDeniedHandler customAccessDeniedHandler;
//	
//	@Autowired
//	private AuthSuccessHandler authenticationSuccessHandler;
//	
//	@Autowired
//	private AuthFailureHandler authenticationFailureHandler;
	
	@Autowired OAuth2LoginSuccessHandler oauth2LoginSuccessHandler;
	@Autowired JwtAuthenticationFilter jwtAuthenticationFilter;
	@Bean
	public OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHanler() {
		return new OAuth2AuthenticationFailureHandler();
	}
	
	@Bean
	public UserDetailService userDetailService() {
		return new UserDetailService();
	};
	
	@Bean
	public JwtAuthenticationFilter tokenAuthenticationFilter() {
		return new JwtAuthenticationFilter();
	}
	
	@Bean
    public HttpCookieOAuth2AuthorizationRequestRepository cookieAuthorizationRequestRepository() {
        return new HttpCookieOAuth2AuthorizationRequestRepository();
    }
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	
	@Bean
	public DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider auth = new DaoAuthenticationProvider();
		auth.setPasswordEncoder(passwordEncoder());
		auth.setUserDetailsService(userDetailService());
		return auth;
	}

	@Bean(name= BeanIds.AUTHENTICATION_MANAGER)
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.authenticationProvider(authenticationProvider());
	}

       
//	@Bean
//    CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
//        configuration.setAllowedMethods(Arrays.asList("GET","POST","PUT","DELETE"));
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }
	private static final String[] AUTH_WHITELIST = {
	        "/swagger-resources/**",
	        "/swagger-ui.html",
	        "/v2/api-docs",
	        "/webjars/**"
	};
	
	@Override
	public void configure(WebSecurity web) throws Exception {
		 web.ignoring().antMatchers(AUTH_WHITELIST);
	}
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type"));
        corsConfiguration.setAllowedOrigins(List.of("*"));
        corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PUT","OPTIONS","PATCH", "DELETE"));
        corsConfiguration.setAllowCredentials(false);
        corsConfiguration.setExposedHeaders(List.of("Authorization"));
 
		http.csrf().disable();		
		 http
         .authorizeRequests()   
         		.antMatchers("/veg/api/categories","/veg/api/product/**","/api/login","/swagger-ui/**","/swagger-ui.html","/login").permitAll()
         		.antMatchers (
         	            "/v2/api-docs" , 
         	             "/swagger-resources/** " ,  
         	             "/swagger-ui.html" , 
         	             "/webjars/**" ,
         	              "/swagger.json")
         	        .permitAll ()
         	 .antMatchers("/api/login/get-token").hasAnyAuthority("ROLE_ADMIN", "ROLE_USER","ROLE_PM")
             .antMatchers("**/admin/**").hasAuthority("ROLE_ADMIN")
             .antMatchers("/veg/customer/checkout").hasAuthority("ROLE_USER")
             .anyRequest().authenticated()
             .and()
          .formLogin().disable()    ;     
//          .oauth2Login()
// 			.loginPage("/login")
//// 			.defaultSuccessUrl("/bachmoc/login/oauth2/success",true)
//// 			.failureUrl("/bachmoc/dang-nhap/error")
// 			.authorizationEndpoint().baseUri("/oauth2/authorization")
// 			.authorizationRequestRepository(cookieAuthorizationRequestRepository())
// 			.and()
// 			.userInfoEndpoint().userService(oAuth2UserService)
// 			.and()
// 			.successHandler(oauth2LoginSuccessHandler)
// 			.failureHandler(oAuth2AuthenticationFailureHanler());
            
//         .logout().permitAll()
//         .logoutUrl("/bachmoc/dang-xuat")
//         .logoutSuccessUrl("/bachmoc/trang-chu?logout")
//             .and() 
//         .exceptionHandling() 
//             .accessDeniedHandler(customAccessDeniedHandler);   
		 
		 http.addFilterBefore(jwtAuthenticationFilter, JwtAuthenticationTokenFilter.class);
		 http.cors().configurationSource(request -> corsConfiguration);
 } 
	}
	
	  

 
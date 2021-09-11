package long_mini.Security;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;

@Service
public class LoginAttemptService {
	@Autowired
	HttpServletRequest req;
	
	private final int MAX_ATTEMPT = 5;

	private LoadingCache<String, Integer> attemptsCache;

	public LoginAttemptService() {
		attemptsCache = CacheBuilder.newBuilder().expireAfterWrite(30, TimeUnit.MINUTES)
				.build(new CacheLoader<String, Integer>() {
					public Integer load(String key) {
						return 0;
					}
				}); 
	}

	public void loginSucceeded(String key) {
		attemptsCache.invalidate(key);
	}

	public void loginFailed(String key) {
		int attempts = 0;
		try {
			attempts = attemptsCache.get(key);
		} catch (ExecutionException e) {
			attempts = 0;
		}
		attempts++;
		attemptsCache.put(key, attempts);
	}

	public boolean isBlocked(String key) {
		try {
			req.setAttribute("hasErrors", "You-have-"+(MAX_ATTEMPT- attemptsCache.get(key))+ "-times");
			return attemptsCache.get(key) >= MAX_ATTEMPT;
		} catch (ExecutionException e) {
			return false;
		}
	}
}

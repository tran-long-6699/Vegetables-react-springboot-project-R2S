package long_mini;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

import long_mini.Utils.AppProperties;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableConfigurationProperties(AppProperties.class)
@EnableSwagger2
public class Longtpc01189MiniProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(Longtpc01189MiniProjectApplication.class, args);
	}

}

package long_mini.Utils;

import java.util.Calendar;
import java.util.Date;

import org.springframework.stereotype.Service;

@Service
public class DateTimeUtils {
	public static Date plusMonth(Date date, Integer number) {
		number = number <= 0 ? 1 : number;
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.MONTH, number);
		date = cal.getTime();
		return date;
	}
}

import com.threewks.thundr.route.Router;
import controllers.Controller;

public class ApplicationRoutes {
	public static void addRoutes(Router router) {
		router.get("/", Controller.class, "home");
	}
}

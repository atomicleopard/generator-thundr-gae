import com.threewks.thundr.action.method.MethodAction;
import com.threewks.thundr.route.Route;
import com.threewks.thundr.route.Routes;
import static com.threewks.thundr.route.RouteType.*;
import controllers.Controller;

public class ApplicationRoutes {
	public static void addRoutes(Routes routes) {
		routes.addRoute(new Route(GET, "/", null), new MethodAction(Controller.class, "home"));
	}
}

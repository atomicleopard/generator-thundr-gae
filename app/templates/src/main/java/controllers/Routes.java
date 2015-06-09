package controllers;

import com.threewks.thundr.route.Router;

public class Routes {
	public static void addRoutes(Router router) {
		router.get("/", Controller.class, "home");
	}
}

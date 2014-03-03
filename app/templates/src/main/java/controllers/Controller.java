package controllers;

import java.util.Map;

import com.atomicleopard.expressive.Expressive;
import com.threewks.thundr.view.View;
import com.threewks.thundr.view.jsp.JspView;

public class Controller {
	public View home() {
		Map<String, Object> model = Expressive.map("message", "hello world");
		return new JspView("home.jsp", model);
	}
}

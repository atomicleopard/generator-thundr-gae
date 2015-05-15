<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib prefix="t" uri="http://threewks.com/thundr/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tags" tagdir="/WEB-INF/tags"%>
<tags:layout
	ng-app="app" 
	ng-strict-di=""
	title="Test Page"
	description="Test Page description"
	keywords="Keywords For This Page" 
	>
	<jsp:attribute name="styles">
		<t:style src="home.css"/>
	</jsp:attribute>
	
	<jsp:attribute name="scripts">
		<t:script src="controller/home-controller.js"/>
	</jsp:attribute>
	
	<jsp:body>
		Hello
		<div ui-view>
		</div>
	</jsp:body>
</tags:layout>

<%@ tag dynamic-attributes="dynAttrs" %>
<%@ attribute name="title" required="false"%>
<%@ attribute name="description" required="false"%>
<%@ attribute name="keywords" required="false"%>
<%@ attribute name="styles" required="false"%>
<%@ attribute name="scripts" required="false"%>
<%@ taglib prefix="t" uri="http://threewks.com/thundr/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tags" tagdir="/WEB-INF/tags"%>
<!doctype html>
<html class="no-js" 
	  lang="en" 
	  itemscope="" itemtype="http://schema.org/WebPage">
<head>
	<meta charset="utf-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<title>${title}</title>
	<meta name="description" itemprop="description" property="og:description" content="${description}"/>
	<meta name="keywords" content="${keywords}"/>
	<meta property="og:title" content="${title}" />
	<meta property="og:type" content="website" />
	
	<meta name="viewport" content="width=device-width, initial-scale=1">
	
	<%@ include file="meta-favicons.html" %>
	
	<t:style src="/static/fonts/font-awesome.css"/>
	<t:style src="main.css"/>
  	${styles}
  	<t:script src="/static/lib/modernizr/modernizr.js"/>
</head>
<body <c:forEach items="${dynAttrs}" var="dynAttr">${dynAttr.key}="${dynAttr.value}"</c:forEach> >
	<div id="content">
		<jsp:doBody/>
	</div>
	<div id="scripts">
	  	<t:script src="/static/lib/lodash/lodash.js"/>
	  	<t:script src="/static/lib/jquery/jquery.js"/>
	  	<t:script src="/static/lib/angular/angular.js"/>
	  	<t:script src="/static/lib/angular-bootstrap/ui-bootstrap-tpls.js"/>
	  	<t:script src="/static/lib/angular-ui-router/angular-ui-router.js"/>
	  	<t:script src="app.js"/>
	  	${scripts}	
  	</div>
</body>
</html>

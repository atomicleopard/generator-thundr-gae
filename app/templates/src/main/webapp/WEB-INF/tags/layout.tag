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
  	<!-- bower:css -->
	<!-- endbower -->
	<!-- injector:css -->
  	<!-- endinjector -->
  	${styles}
</head>
<body <c:forEach items="${dynAttrs}" var="dynAttr">${dynAttr.key}="${dynAttr.value}"</c:forEach> >
	<div id="content">
		<jsp:doBody/>
	</div>
	<div id="scripts">
  		<!-- bower:js -->
		<!-- endbower -->
		<!-- injector:js -->
  		<!-- endinjector -->
	  	${scripts}	
  	</div>
</body>
</html>

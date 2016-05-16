<!DOCTYPE HTML>
<html>
  <head>
    <base href="<%=basePath%>">
    <link href="<%=R.getCommonPath("lib/bootstrap/css/bootstrap.min.css") %>" type="text/css" rel="stylesheet" />
	<link href="<%=R.getCommonPath("main/css/style.css") %>" type="text/css" rel="stylesheet" />
	<link href="<%=R.getCommonPath("main/css/default.css") %>" type="text/css" rel="stylesheet" />
    <link href="<%=R.getStaticPath("js/select2/css/select2.min.css") %>" type="text/css" rel="stylesheet" />	
    <link href="<%=R.getStaticPath("js/jcrop/css/jquery.Jcrop.min.css") %>" type="text/css" rel="stylesheet" />		
	<jsp:include page="../common/RD.jsp"></jsp:include>
    <%@include file="../common/common_title.jsp" %>	
	<script type="text/javascript" src="<%=R.getCommonPath("lib/jquery-1.8.0.js") %>"></script>
</head>
<div class="school_img"><img src="<%=R.getCommonPath("main/images/join.png") %>" width="100%" height="100%"></div>
	<script type="text/javascript" src="<%=R.getCommonPath("lib/nin.overlay.js") %>"></script>
	<script type="text/javascript" src="<%=R.getCommonPath("lib/ejs.js") %>"></script>
	<script type="text/javascript" src="<%=R.getCommonPath("lib/view.js") %>"></script>
	<script type="text/javascript" src="<%=R.getCommonPath("lib/jquery.ejsplugin.js") %>"></script>
	<script type="text/javascript" src="<%=R.getCommonPath("lib/uploadfile.js") %>"></script>
	<script type="text/javascript" src="<%=R.getStaticPath("js/layer-v1.9.3/layer.js") %>"></script>
	<script type="text/javascript" src="<%=R.getStaticPath("js/jcrop/js/jquery.Jcrop.min.js") %>"></script>
	<script type="text/javascript" src="<%=R.getStaticPath("js/select2/js/select2.full.min.js") %>"></script>
	<script type="text/javascript" src="<%=R.getStaticPath("js/select2/js/i18n/zh-CN.js") %>"></script>
	<script type="text/javascript" src="<%=R.getStaticPath("js/My97DatePicker/WdatePicker.js") %>"></script>
</html>

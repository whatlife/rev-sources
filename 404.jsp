<!DOCTYPE html>
<html lang="zh-cn">
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>404</title>
  <link href="<%=R.getCommonPath("main/css/style.css") %>" type="text/css" rel="stylesheet" />
  <link href="<%=R.getCommonPath("lib/bootstrap/css/bootstrap.min.css") %>" type="text/css" rel="stylesheet" />
  <script type="text/javascript" src="<%=R.getCommonPath("lib/jquery-1.8.0.js") %>"></script>
</head>
<body class="build_bg">
	<div class="build_img"></div>
	<div class="build error_404">
		<div><img src="<%=R.getCommonPath("main/images/404.png")%>"></div>
		<h2 class="develop">很抱歉~  您访问的页面无法显示，请尝试以下操作</h2>
		<div class="back_btn">
			<a href="javascript:history.back();" class="back_left"><img src="<%=R.getCommonPath("main/images/back_left.png")%>">返回上一页</a>
			<a href="<%=RD.get("mainUrl") %>" class="back_right">返回首页<img src="<%=R.getCommonPath("main/images/back_right.png")%>"></a>
		</div>
	</div>
</body>
</html>

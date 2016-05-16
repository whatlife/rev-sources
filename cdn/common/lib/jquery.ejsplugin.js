(function($){
	//ejsRender插件 ajax 返回数据格式 {"code":"200", "data":{"list":[{}], "page":"", .....}}  
	$.fn.ajaxEjsRender = function(options, callbackFun){
  		var defaults = { renderEl : "", templete : "temp", data : {}, url : "", dataType:"json", type : "GET", async:true };  
	    $.extend(defaults,options);
	    var temp = $("#"+defaults.templete).html();
	    
	    var loadingEl = defaults.loadingEl || defaults.renderEl;
	    
	    if($.fn.ninLayIn) $("#"+loadingEl).ninLayIn({html:"<div class='loading'></div>正在努力加载中",duration:0,bgColor: ["#fff",0.4]});
	    
	    $.ajax({
			type: defaults.type,
			url: defaults.url,
			data: $.param(defaults.data, true),
			dataType:defaults.dataType,
			async:defaults.async,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			success:function(data){
				if(data && data.code=="200"){
					var html = new EJS({"text":temp,"type":"["}).render(data.data);
				    $("#"+defaults.renderEl).html(html);
				    if($.fn.ninLayIn) $("#"+loadingEl).ninLayOut();
				    
				    if(typeof(callbackFun)==='function') callbackFun.call(null, data);
				}else if(data && data.code=="401"){
					window.location.href=RD.mainUrl+"doView?action=v_public&start=login_go";
				}else if(data && data.code=="500"){
					alert("内部服务器错误(500),请联系客服！");
					//console.log("内部服务器错误(500Doservice).");
				}else if(data && data.code=="410"){
					//console.log("非法访问.");
					alert(data.msg);
				}else{
					if(typeof(callbackFun)==='function') callbackFun.call(null, data);
				}
			}
		});
  	}; 
  	
  	/**
  	 * ajax 获取数据
  	 * {url:"sxxxxxxx"}
  	 */
  	$.fn.ajaxData = function(options, callbackFun){
  		var defaults = {url : "", type:"GET", data:{}, dataType:"json", async:true};
  		$.extend(defaults,options);
  		
  		$.ajax({
			type: defaults.type,
			url: defaults.url,
			data: $.param(defaults.data, true),
			dataType:defaults.dataType,
			async:defaults.async,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			success:function(data){
				if(data && data.code=="200"){
					if(typeof(callbackFun)==='function') callbackFun.call(null, data);
					else alert("没设置callbackFun");
				}else if(data && data.code=="401"){
					window.location.href=RD.mainUrl+"doView?action=v_public&start=login_go";
				}else if(data && data.code=="500"){
					console.log("内部服务器错误(500Doservice).");
					alert("内部服务器错误(500),请联系客服！");
				}else if(data && data.code=="410"){
					console.log("非法访问.");
					alert(data.msg);
				}else{
					if(typeof(callbackFun)==='function') callbackFun.call(null, data);
				}
			}
		});
  	}
  	
})(jQuery);
;(function(redirecturl){
	
	//重写验证控件
	window._99forminfo=function make_class(ele,type,msg){
		if(msg===false || msg===undefined){
			msg = "";
			type = "hide";
		}
		var valid_arr;
		if((valid_arr = $(ele).siblings(".help-tip")).length>0){
			
		}else if((valid_arr = $(ele).parent().find(".help-tip")).length>0){
			
		}else{
			 var hasFound = false;
			 $(ele).parent().nextAll().each(function(){
				 valid_arr = $(this).find(".help-tip");
				 if(valid_arr.size()>0){
					hasFound = true;
				 	return false;
				 }
			 });
			 hasFound || (valid_arr = undefined);
		}
		if(valid_arr && valid_arr.size()>0){
			var input = valid_arr.parents(".input").eq(0);
			input.removeClass("success");
			input.removeClass("error");
			if(type==="success"){
				valid_arr.html('<i class="icon icon-success"></i>').show();
				var input = valid_arr.parents(".input").eq(0);
				input.addClass("success");
			}else if(type==="error"){
				valid_arr.html('<p>'+msg+'</p><i class="icon icon-error"></i>').show();
				var input = valid_arr.parents(".input").eq(0);
				input.addClass("error");
			}else{
				valid_arr.hide();
			}
		}
	}
	
	//获取cookie
	function getCookie(c_name) {
		c_name = c_name.toUpperCase();
		    if (document.cookie.length>0)
		    {
			     c_start=document.cookie.indexOf(c_name + "=");
			     if (c_start!=-1)
			     {
				    c_start=c_start + c_name.length+1 ;
				    c_end=document.cookie.indexOf(";",c_start);
			     	if (c_end==-1) c_end=document.cookie.length;
			     	var value = document.cookie.substring(c_start,c_end);
			     	if(value=='""'){
			     		return "";
			     	}else{
			     		return decodeURIComponent(value);
			     	}
			     }
		    }
		    return "";
		}
    var _uc = getCookie("_uc");
    (_uc.length!=31)&&$("#u_archive_code").val();
	
	//设置cookie
	function setCookie(c_name,value) {
		var c_domain = ".99cj.com";
		var date=new Date(); 
		var expiresDays=7;//设置为7天以后过期  
		date.setTime(date.getTime()+expiresDays*24*3600*1000); 
		var c_expires = date.toGMTString();
	    document.cookie=c_name.toUpperCase()+ "=" +escape(value)+
	    ";expires="+c_expires+";path=/;";
	}
	
	var user_code=$("#input_value").val();
	//表单验证：
	var validSetting = {
		"elements":{"u_archive_code":{"isnull":false,"msg_null":"档案号不能为空"},
					"u_full_name":{"isnull":false,"msg_null":"姓名不能为空"}
					},
		"ajaxSubmit":{
						url:RD.mainActionUrl+"do?action=login/login&start=validate_institution_user",
						beforeSubmit:function(){
							$("#error_msg").hide();
							return true;
						},
						data:function(){
							return {
								"register_app":"iloveacc",
								"archive_code":$("#u_archive_code").val(),
								"full_name":$("#u_full_name").val(),
								"user_name":user_code,
								"institution_code":$("#institution_code").val()
							};
						},
						success:function(data){
							//code为200时，为登录成功
							if(data.code=="200"){
								setCookie("_uc",data.data.user_code);
								window.location.href = data.data.institution_url;								
							}else{
								$("#error_msg").html(data.msg).show();								
							}
						}
					},
		"submitEle":"#btn_validate"
	};
	
	$("#loginform")._99formvalid(validSetting);
})(redirecturl);


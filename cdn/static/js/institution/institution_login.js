;(function(){
	
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
    (_uc.length!=31)&&$("#u_user_name").val();
	
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
	//登录系统类型
	var register_app = "iloveacc";
	var redirecturl = $("#redirecturl").val();
	//登录类型有  用户名/手机/邮箱
	var login_type = {"mobile":"mobile","email":"email","code":"code"};
	
	//表单验证：
	var validSetting = {
		"elements":{"u_user_name":{"isnull":false,"msg_null":"用户名不能为空"},
					"u_password":{"isnull":false,"msg_null":"登录密码不能为空"}
					},
		"ajaxSubmit":{
						url:RD.mainActionUrl+"do?action=login/login&start=login",
						beforeSubmit:function(){
							$("#error_msg").hide();
							return true;
						},
						data:function(){
							return {
								"login_type":getLoginType($("#u_user_name").val()),
								"user_name":$("#u_user_name").val(),
								"password":$("#u_password").val(),
								"home_url":$("#redirecturl").val(),
								"register_app":register_app
							};
						},
						success:function(data){
							//code为200时，为登录成功
							if(data.code=="200"){
								setCookie("_uc",data.data.user_code);
								window.location.href = data.data.institution_url;
							}else{
								var msg = "";
								switch(data.data.error_code){
									case 'no_user':
										msg = "您输入的用户不存在，请重新输入。或者您可以<a href='"+RD.mainUrl+"doView?action=v_public&start=rg_go' style='color:#f08200;'>注册账号</a>？";
										break;
									case 'no_active':
										msg = "您输入的邮箱用户暂未激活，请<a href='javascript:;' id='active_email' data-value='"+data.data.input_value+"'>点击激活</a> 或者 <a href='javascript:;' id='update_email' data-value='"+data.data.input_value+"'>修改邮箱</a>？";
										break;
									case 'error_max':
										msg = "密码错误超过限制次数，请明天再登录，或者您可以<a href='"+RD.mainUrl+"doView?action=v_public&start=fp_go' style='font-weight:bold;color:#28a7e1;'>去重设密码</a>";
										break;
									case 'error_pwd':
										if(data.data.limit_count<=0)
											msg = "密码错误超过限制次数，请明天再登录，或者您<a href='"+RD.mainUrl+"doView?action=v_public&start=fp_go' style='font-weight:bold;color:#28a7e1;'>去重设密码</a>？";
										else
											msg = "密码错误，出错"+data.data.limit_count+"次后账号将锁定";
										break;
									case 'no_bind_mobile':
										msg = "手机号码未验证，请使用其他方式登录！";
										break;
									case 'error_validate':
										msg = "账号异常，您可以使用QQ或者微信号进行登录！";
										break;
									case 'account_invalid':
										msg = "账号已被冻结，请联系客服电话：<span style='font-weight:bold;color:#28a7e1;'>400-703-2208</span>";
										break;
									case 'institution_disabled':
										msg = data.msg;
										break;
									case 'institution_deleted':
										msg = data.msg;
										break;
									case 'institution_user_sync_error':
										msg = data.msg;
										break;
									case 'institution_user_need_validated':
										window.location.href = RD.mainUrl + "doView?action=v_public&start=institution_validation&input_value=" + data.data.input_value + "&institution_code=" + data.data.institution_code;
										break;
								}
								if(msg != "") {
									$("#error_msg").html(msg).show();
								}
							}
						}
					},
		"submitEle":"#user_login"
	};
	
	$("#loginform")._99formvalid(validSetting);
	
	
	//获取登录用户名类型
	function getLoginType(input_code){
		if(checkRegexp("email",input_code)){
			return login_type.email;
		}else if(checkRegexp("mobile",input_code)){
			return login_type.mobile;
		}else{
			return login_type.code;
		}
	}
	
	//发送激活邮件
	$("#error_msg").on("click","#active_email",function(){
		var user_name = $(this).attr("data-value");
		_99Plugin.post(RD.mainActionUrl+"do?action=login/register&start=sendEmailActiveLink&redirecturl="+redirecturl+"&register_app="+register_app,{username:user_name,logintype:getLoginType(user_name)},function(data){
			if(data.code==="200")
				window.location.href = RD.mainUrl + 'doView?action=v_common&start=show&code=rg.08&data={"email":"'+data.data.email+'"}&redirecturl='+redirecturl+'&register_app='+register_app;
			else
				window.location.href = RD.mainUrl + 'doView?action=v_common&start=show&code='+data.data.code+'&data={"email":"'+data.data.email+'"}&redirecturl='+redirecturl+'&register_app='+register_app;
		});
	});
	
	//修改邮箱
	$("#error_msg").on("click","#update_email",function(){
		var user_name = $(this).attr("data-value");
		window.location.href = RD.mainUrl + 'doView?action=v_public&start=change_email&redirecturl='+redirecturl+'&register_app='+register_app;
	});
	//加密之后访问项目
	function enter_app_do(app_name){
		var data={
				'app_name'     : app_name,
				'loginType'    : 'login'
				};
		
		$.ajax({
			type    : 'post',
			dataType: 'json',
			url  :  RD.mainActionUrl+'do?action=user/student_center&start=enter_app',
			data :  data,
			async:  false,
			success: function(data) { 
				if('200' === data.code) {
					window.location.href=data.data;
				}
			}
		});
	}

	function shortcut_login_do(id,status){
		var data={
			"home_url" : $("#redirecturl").val(),
			"user_name" : $("#user_name").val()
		};
		var url= RD.mainActionUrl+"do?action=login/login&start=shortcut_login";
		$.ajax({
			   type: "POST",
			   dataType: "json",
			   data:data,
			   url: url,
	           success:function(data){
	        	 if(data.code=="200"){
						setCookie("_uc",data.data.user_code);
						window.location.href = data.data.institution_url;
	             }else{
						var msg = "";
						switch(data.data.error_code){
							case 'institution_disabled':
								msg = data.msg;
								break;
							case 'institution_deleted':
								msg = data.msg;
								break;
							case 'institution_user_sync_error':
								msg = data.msg;
								break;
							case 'institution_user_need_validated':
								window.location.href = RD.mainUrl + "doView?action=v_public&start=institution_validation&input_value=" + data.data.input_value + "&institution_code=" + data.data.institution_code;
								break;
						}
						if(msg != "") {
							$("#error_msg").html(msg).show(); 
						}
	             }
	           }
	     });
    }
	
	$("#quick_login").on("click",function(){
		shortcut_login_do();
	});

	function redirectToOldLoginPage() {
		var data = {
			"home_url" : $("#redirecturl").val()
		};
		$.ajax({
			type : 'post',
			dataType : 'json',
			url : RD.mainActionUrl + 'do?action=login/login&start=getOldLoginUrl',
			data : data,
			async : false,
			success : function(data) {
				if ('200' === data.code) {
					window.open(data.data.old_login_url);
				}
			}
		});
	}

	$('.form-header').on('click', '.title-item', function() {
		// $(this).addClass('active').siblings().removeClass('active'); 切换tab
		var titleItemId = $(this).attr("id");
		if (titleItemId === "titleTips_iloveacc") {
			redirectToOldLoginPage();
		}
	});
})();


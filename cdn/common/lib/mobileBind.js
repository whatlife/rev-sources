(function(){
	/**
	 *绑定手机
	 *setting:{mobile:"15080342123",callback:function(){//绑定成功回调}}
	 */
	if(!_99Plugin)_99Plugin={};
	var tip = "_99plugin_bindform_";
	var is_new = false,sint;
	var layercontent = '<div style="display:none" id="'+tip+'div"><input type="hidden" name="'+tip+'needvalid" id="'+tip+'needvalid" value="1" /><div class="prompt"></div><div class="verification"><form name="'+tip+'form" id="'+tip+'form"><span class="verification-text">验证码</span><input class="success-massage" type="text" id="'+tip+'code"/><input type="hidden" name="'+tip+'mobile" id="'+tip+'mobile"/><span class="re-send"><a href="#" id="'+tip+'send_code">重新获取</a></span><span class="warn" style="display:none;"></span></form></div><div class="clear"></div><div class="ver-warn" style="display:none;"><span></span></div></div>';
	_99Plugin["mobilebind"] = function(setting){
		if(!checkRegexp("mobile",setting.mobile)){
			alert("手机号码格式错误");
			return ;
		}
		if($("#"+tip+"mobile").val()!==setting.mobile){
			$("#"+tip+"div").remove();
			$("body").append(layercontent);
			is_new = true;
			clearInterval(sint);
		}else{
			is_new = false;
		}
		mainLayer = layer.open({
            type: 1, //page层
            area: ['525px', '350px'],
            title: '验证手机',
            closeBtn: true,
            offset:"150px",
            btn: ['确定', '取消'],
            skin: 'layui-layer-molv', //墨绿风格
            shade: 0.6, //遮罩透明度
            shift: 1, //0-6的动画形式，-1不开启
            //content: '<div class="prompt">已向 13600902006 发送验证短信！</div><div class="verification"><span class="verification-text">验证码</span><input class="success-massage" type="text" value="验证码"/><span class="re-send-success">60秒后重新发送</span></div>',
            content: $("#"+tip+"div"),
            success:function(){
				if(is_new){
					$("#"+tip+"mobile_span").html(setting.mobile);
					$("#"+tip+"mobile").val(setting.mobile);
					bindFormSubmitEvent(setting.callback);
				}
			},
            yes:function(){
            	if($("#"+tip+"div #"+tip +"needvalid").val()=="0"){
            		layer.close(mainLayer);
            		return ;
            	}
            	var mobile_code = $("#"+tip+"code").val();
            	if(mobile_code =="" || !checkRegexp("code",mobile_code)){
            		showHideError("验证码不能为空");
            		return ;
            	}
            	_99Plugin.ajax({
            		url:RD.mainActionUrl+"do?action=user/safe_center&start=bind_mobile_submit",
            		data:{mobile:$("#"+tip+"mobile").val(),mobile_code:mobile_code},
            		dataType:"jsonp",
    				success:function(data){
    					if(data.code==="200"){
    						layer.close(mainLayer);
    						if(typeof setting.callback ==="function")setting.callback();
    					}else{
    						showHideError(data.msg);
    					}
    				}
            	});
            }
       });
	};
	
	function showHideError(msg){
		if(msg==""){ 
			$("#"+tip+"div .warn").hide();
			$("#"+tip+"div .ver-warn").hide();
			$("#"+tip+"code").addClass("success-massage").removeClass("failure-massage");
		}else{
			$("#"+tip+"div .warn").show();
			$("#"+tip+"div .ver-warn span").html(msg)
			$("#"+tip+"div .ver-warn").show();
			$("#"+tip+"code").addClass("failure-massage").removeClass("success-massage");
		}
	}
	
	function bindFormSubmitEvent(back){
		
		//发送手机验证码
		var send_code = function (){
			var mobile = $("#"+tip+"mobile").val();
			$("#"+tip+"send_code").unbind("click",send_code);
			setStatus(false);
			$("#"+tip+"send_code").html("验证码发送中...");
			_99Plugin.post(RD.mainActionUrl+"do?action=user/safe_center&start=sendMobileCode",{"mobile":mobile},function(data){
				//code为200时，为发送成功
				if(data.code=="200"){
					$("#"+tip+"div .prompt").html("已向 "+mobile.substring(0,3)+"****"+mobile.substring(7)+" 发送验证短信！");
					$("#"+tip+"send_code").html("验证码已发送");
					setTimeout(re_send_code,2000);
				}else if(data.code=="1001"){
					$("#"+tip+"div .prompt").html(data.msg);
					$("#"+tip+"div #"+tip +"needvalid").val("0");
					$("#"+tip+"div .verification").hide();
				}else{
					$("#"+tip+"div .prompt").html(data.msg);
					$("#"+tip+"send_code").html("获取验证码");
					$("#"+tip+"send_code").bind("click",send_code);
					setStatus(true);
				}
			},"jsonp");
		}
		
		//重新发送验证码
		function re_send_code(){
			var i =60;//i秒后重新发送
			var re_send_fun = function(){
				console.log(i);
				if(i<=0){
					clearInterval(sint);
					$("#"+tip+"send_code").html("获取验证码");
					$("#"+tip+"send_code").bind("click",send_code);
					setStatus(true);
				}else{
					$("#"+tip+"send_code").html(i+"秒后重新获取");
				}
				i=i-1;
			}
			re_send_fun();
			sint = setInterval(re_send_fun,1000);
		}
		
		function setStatus(status){
			if(status){
				$("#"+tip+"send_code").parent().addClass("re-send").removeClass("re-send-success");
			}else{
				$("#"+tip+"send_code").parent().addClass("re-send-success").removeClass("re-send");
			}
		}
		
		$("#"+tip+"send_code").unbind("click",send_code);
		//绑定“发送验证码”按钮点击事件
		$("#"+tip+"send_code").bind("click",send_code);
		
		
		$("#"+tip+"code").bind("blur",function(){
			if($(this).val()==""){
				showHideError("验证码不能为空");
			}else if(checkRegexp("code",$(this).val())){
				showHideError("");
			}else{
				showHideError("请输入正确的验证码");
			}
		});
		
		$("#"+tip+"send_code").trigger("click");
	}
})();
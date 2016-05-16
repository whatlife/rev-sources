$(function(){
	// 下拉选择登录身份
	$('.loginTypeSelect').click(function(){
		$('#loginType').attr('loginType', $(this).attr('loginType')).html($(this).children('a').html());
	});
	
	var baseUrl = $('base').attr('href');
	
	// 上一次请求的URL
	var lastRefer = self.document.referrer;
	// 是否来自子项目的请求登录
	var isFromSubObject = $('#isFromSubObject').val() == 'true';
	var $login_id = $("#loginId");
	var $password = $("#loginPassword");
	
	$("#login_submit").click(function(){
		var loginID = $.trim($login_id.val());
		var password = $.trim($password.val());
		if(loginID.length < 1) {
			layer.tips('<font style="color:#000;">&nbsp;请输入用户名&nbsp;</font>', '#tipForLoginId', {tips:[2, '#d9534f']});
			$login_id.one('click', function(){
				layer.closeAll('tips');
			});
			return false;
		}
		if(password.length < 1) {
			layer.tips('<font style="color:#000;">&nbsp;请输入密码&nbsp;</font>', '#tipForLoginPassword', {tips:[2, '#d9534f']});
			$password.one('click', function(){
				layer.closeAll('tips');
			});
			return false;
		}
		var _layer_id;
		var userType = $('#loginType').attr('loginType') || 'student';
		var data = {'loginid': loginID,
					'password': password,
					'action': 'login',
					'start': userType};
		$.ajax({
			type: 'post',
			dataType: 'json',
			url: 'do',
			data: data,
			success: function(jsonObj) { 
				if('200' == jsonObj.code) {
					if(isFromSubObject && null != lastRefer && "" != lastRefer) {
						self.location.href=lastRefer;
					} else {
						if(baseUrl) {
							self.location.href=baseUrl;
						} else {
							self.location.href='doView?action=forward&start=main';
						}
					}
				} else {
					layer.open({
						title: ['<b>错误</b>', 'background: rgb(60,141,188);'],
						type: 0,
						content: jsonObj.msg,
						icon: 5,
						btn: '确定',
						yes: function(index, layero){
							$password.val('');
							$login_id.focus();
							layer.close(index);
						}
					});
				}
			},
			beforeSend: function(xmlHttpRequest) {
				_layer_id = layer.open({
					type: 3,
					icon: 2
				});
			},
			complete: function(xmlLHttpRequest, textStatus) {
				layer.close(_layer_id);
			},
			error: function() {
				layer.close(_layer_id);
				layer.open({
					title: ['<b>错误</b>', 'background: rgb(60,141,188);'],
					type: 0,
					content: "请求失败,请检查您的网络!",
					icon: 5,
					btn: '确定'
				});
			}
		});
		return false;
	});
});

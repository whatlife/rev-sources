/**
 * 社交平台分享
 * 20150608 新增分享到qq好友 
 */
(function($) {

	$.fn.snsShare = function(options,sns){
	
		var defaults = {
    				tsina:{//分享到新浪微博 
					url : "http://www.99cj.com",							
					title : document.title,								
					appkey : "488084773",								
					pic : "http://www.99cj.com/cdn/common/main/images/99_logo.png"	
				},
				tqq:{//分享到腾讯微博
					url : "http://www.99cj.com",							
					title : document.title,								
					pic : "http://www.99cj.com/cdn/common/main/images/99_logo.png"	
				},
				tqzone:{//分享到QQ空间
					url : "http://www.99cj.com",							
					title : document.title,								
					pic : "http://www.99cj.com/cdn/common/main/images/99_logo.png",	
					summary: "",
					desc: ""
				},
				tqqfriend:{//分享到qq好友
					url : "http://www.99cj.com",							
					title : document.title,								
					pic : "http://www.99cj.com/cdn/common/main/images/99_logo.png",	
					summary: "",
					desc: ""
				}
			},
			settings = $.extend(true,{}, defaults[sns], options),
			shareUrl = {
				tsina : "http://service.weibo.com/share/share.php?url={url}&title={title}&appkey={appkey}&pic={pic}",
				tqq : "http://share.v.t.qq.com/index.php?c=share&a=index&url={url}&title={title}&appkey={appkey}&pic={pic}",
				tqzone : "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={url}&pics={pic}&title={title}&summary={summary}&desc={desc}",
				tqqfriend: "http://connect.qq.com/widget/shareqq/index.html?url={url}&pics={pic}&title={title}&summary={summary}&desc={desc}"
			};
		

		return $(this).each(function(){
			
			function formatmodel(str,model){
			    for(var k in model){
			        var re = new RegExp("{"+k+"}","g");
			        if(k == "url" || k == "pic"){
			        	str = str.replace(re,encodeURIComponent(model[k]));
			        }else{
			        	str = str.replace(re,model[k]);
			        }
			    }
			    return str;
			}
			
			var text= encodeURIComponent(settings.title);
				settings.title = text;
			window.open(formatmodel(shareUrl[sns],settings));
		});
	};
})(jQuery);

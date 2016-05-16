//////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////处理并保存URL到cookie功能，目的是在返回功能时可以读取URL/////////////
/////////////////////////////////Easydozer 2009.6.26//////////////////////////////////////////

function UrlManager(manName)
{
	this.CookieName = (!manName) ? "" : "_" + manName;//名字	
	//-------------------------------------------------------
	//向名字为 SaveCookieCurrentVisitedUrl 的cookie中追加 url
	this.add = function(url){//追加
		var MAX_COUNT = 6;	
		var allUrl = this.all();	
		if(allUrl == ""){
			allUrl = url;
		}
		else{
			var urlArray = allUrl.split("?@?@?");			
			var count = urlArray.length;			
			if(count < MAX_COUNT){
				allUrl = allUrl + "?@?@?" + url;
			}
			else{
				allUrl = "";
				for(var k=count+1-MAX_COUNT;k<count;k++){
					allUrl += urlArray[k] + "?@?@?";
				}
				allUrl += url;
			}
		}
	
	    this.debug("add=" + allUrl);			    
		this.setCookie(escape(allUrl));
	}
	
	//从名字为 SaveCookieCurrentVisitedUrl 的cookie中取得最后一次追回的 url
	this.get = function(){
		var allUrl = this.all();	
	    this.debug("get=" + allUrl);
	
		var retu = "";
		if(allUrl == ""){
			return "";
		}
		else{
			var urlArray = allUrl.split("?@?@?");		
			var count = urlArray.length;
			retu = urlArray[count - 1];
			
			/********		
			allUrl = "";
			//for(var k=0;k<count-1;k++){//edit by xiejs at 2009-06-11
			for(var k=0;k<count;k++){
				if(allUrl == ""){
					allUrl = urlArray[k];
				}
				else{
					allUrl += "?@?@?" + urlArray[k] ;
				}
			}
			**************/
		}
		
		this.setCookie(escape(allUrl));
	    this.debug("get=" + retu);
	
		return retu;
	}

	//从名字为 SaveCookieCurrentVisitedUrl 的cookie中取得所有的 url
	this.all = function(){
		var name = "SaveCookieCurrentVisitedUrl" + ((this.CookieName) ? this.CookieName : "");
	    this.debug("all-name=" + name);
	    
		var WholeCookie = document.cookie;
		this.debug("all-WholeCookie=" + WholeCookie);
		
		var index = WholeCookie.indexOf(name + "=");	    
		if (index == -1) return "";	
		index = WholeCookie.indexOf(name + "=", index)+(name.length + 1);	    
	    this.debug("all-index=" + index);
	
		var endstr = WholeCookie.indexOf(";", index);	
		if (endstr == -1) endstr = WholeCookie.length;	
		var IndividualCookie = unescape(WholeCookie.substring(index, endstr));	
	    this.debug("all-IndividualCookie=" + IndividualCookie);
	
		if (IndividualCookie == null || IndividualCookie == "null" ||
			IndividualCookie == "" || IndividualCookie.indexOf("undefined") >= 0) {
			IndividualCookie = ""
		}
		return IndividualCookie
	}
	
	//清除名字为 SaveCookieCurrentVisitedUrl 的cookie中值
	this.clear = function(){
		this.setCookie(null);
	}
	
	//////////////////////////////////////////////////////////////////////////////////////////
	//向cookie中设置值，设置的值－已经进行了escape处理，是否设置失效，true表需要－说明需要保存到硬盘
	this.setCookie = function(value, isExpires){
		var name = "SaveCookieCurrentVisitedUrl" + ((this.CookieName) ? this.CookieName : "");
		value = (!value) ? null : value;
		this.debug("setCookie=" + value);
		if(isExpires){
		    //浏览器保存cookie到硬盘，这样cookie属于所有打开的浏览器（包括新开的IE），关闭浏览器cookie还在
			var today = new Date();
			var expiration = new Date(today.getTime() + 30 * 60 * 1000);  // 6 hours from now
			document.cookie = name+"="+value+";expires="+expiration.toGMTString()+";path=/";
		}
		else{
			//浏览器不将cookie保存到硬盘，这样每cookie只属于浏览器本身，关闭浏览器就消失
			document.cookie = name+"="+value+";path=/";
		}
	}
	
	//调试用
	this.debug=function(val){
	    //alert(val);
	}
	
}






/**
title:进行表自动校验程序
desc:要求根据例子样式进行处理,其原理是对文本框加上自定义的属性,再根据属性进行正则表达式处理
version: 1.0
author:Easydozer
Date:2003-9-13

Example:
<script language="JavaScript" src="checkForm.js"></script>
<form method="POST" name="form" onsubmit="return checkForm(this)">
  <p>EMAIL:<input type="text" name="T1" Isull="notnull" DataType="Email" Caption="电子邮件" size="20"></p>
  <p>PassWord:<input type="text" name="T1" ISNULL="" DataType="Password" MAXLEN="10" MINLEN="2" size="20" value="12"></p>
  <p>NUMBER:<input type="text" name="T1" ISNULL="" DataType="number(5,3)" size="20"></p>
  <p>Tel:<input type="text" name="T1" ISNULL="" DataType="Tel" size="20"></p>
  <p>CODE:<input type="text" name="T1" ISNULL="" DataType="POSTCODE" size="20"></p>
  <p>URL:<input type="text" name="T1" ISNULL="" DataType="URL" size="20"></p>
  <p>DATE:<input type="text" name="T1" DataType="date('yyyy-MM-dd')" size="20"></p>
  </p>ISNULL<SELECT NAME="" ISNULL="notnull"><option value=""></option><option value="1">1</option></SELECT>
  <P>MINLEN MAXLEN<TEXTAREA NAME="" ROWS="" COLS="" MINLEN="1" MAXLEN="20"></TEXTAREA></P>
  <p><input type="button" value="按钮" name="B1" onclick="CheckForm(form)"><input type="reset" value="全部重写" name="B2"></p>
  
  objname: alert 带有控件名称
  <input type="text" name="T1" isnull="notnull" datatype="script:checkAccount(#1)" caption="科目编码" errormsg="必须以10开头" size="20">
  <input type="text" name="T1" isnull="notnull" datatype="regexp:/^10/ig" caption="科目编码" errormsg="必须以10开头" size="20">
  </p>
</form>
function checkAccount(box){
	if((box.value).indexOf("10") == 0) return true;
	return false;
}
*/

/**
ISNULL  -- 表单域属性名(是否进行非空校验) 
    值：NOTNULL或notnull --表单域属性值(进行非空校验)

MAXLEN --- 表单域属性名(本表单域最大长度值<一个汉字的长度为2>)
MINLEN --- 表单域属性名(本表单域最小长度值<一个汉字的长度为2>)

DataType --- 表单域属性名(表单域数据类型,即进行何种类型的校验)
	数据类型有:
	EMAIL --- 电子邮件
	PASSWORD --- 密码
	TEL --- 电话
	POSTCODE --- 邮政编码
	URL --- 超级链接
	TITLE -- 不能包含特殊字符中内容 ' " & ? > < / \ |
	UNQUOT  -- 不能输入单引号及双引号 
	CODE  -- 只能输入大小写字母下划线及数字
	IP    -- 验证IP地址
	SCRIPT: -- 调用一个函数，这个函数返回true or false，可以传一个参数 #1 表当前对象 errormsg 错误提示
	REGEXP:  -- 正则表达式 errormsg
	 --- 数字
	NUMBER
	NUMBER()
	NUMBER(X)
	NUMBER(X,I)
	 --- 无符号数字(即不能有+-符号)
	POSITIVE
	POSITIVE()
	POSITIVE(X)
	POSITIVE(X,I)
	 --- 负数字(小于等于0)
	NEGATIVE
	NEGATIVE()
	NEGATIVE(X)
	NEGATIVE(X,I)
	 --- 必须为整数(即不能有小数点)
	INTEGER
	INTEGER()
	INTEGER(X)

	 --- 日期	
	DATE('yyyy')
	DATE('MM')
	DATE('M')
	DATE('dd')
	DATE('d')
	
	DATE('yyyyMM')
	DATE('yyyy/MM')
	DATE('yyyy-MM')
	DATE('yyyy年MM月')

	DATE('yyyyMMdd')
	DATE('yyyy/MM/dd')
	DATE('yyyy-MM-dd')
	DATE('yyyy年MM月dd日')
	
	DATE('yyyyMd')
	DATE('yyyy/M/d')
	DATE('yyyy-M-d')
	DATE('yyyy年M月d日')

	DATE('yyyyMMddHHmm')
	DATE('yyyy/MM/dd HH:mm')
	DATE('yyyy-MM-dd HH:mm')
	DATE('yyyy年MM月dd日 HH:mm')

	DATE('yyyyMMddHHmmss')
	DATE('yyyy/MM/dd HH:mm:ss')
	DATE('yyyy-MM-dd HH:mm:ss')
	DATE('yyyy年MM月dd日 HH:mm:ss')

**/
var __var_checkform_ignore_names = "", __var_checkform_include_names = "";
function checkFormIgnoreNames(names, isIgnore){//设置在验证时忽略的表单域，或只包含的表单域，用分号间隔
	isIgnore = (isIgnore != false) ? true : false;
	if(isIgnore){
		__var_checkform_ignore_names = ";"+names+";";
		__var_checkform_include_names = "";
	}
	else{
		__var_checkform_ignore_names = "";
		__var_checkform_include_names = ";"+names+";";
	}
}

function checkForm(fbox, check_confirm_name)//参数说明：需要验证的表单，可能多行时，复选框的名称
{
	fbox = (fbox) ? fbox : document.forms[0];
	
	if(check_confirm_name){//使用了多行编辑，可能只需要验证某些行的情况
		var names = __MM_GetFieldNames(fbox);
		if(!names) return true;
		
		var names_boxs = new Array();
		
		var check = true;
		$("input[name='"+check_confirm_name+"']", $(fbox)).each(function(i){
			if(!$(this).attr("checked")) return;//没有选中的哪种
			for(var k=0,len=names.length; k<len; k++){
				var name = names[k];
				if(!__var_checkform_include_names && __var_checkform_ignore_names.indexOf(";"+name+";") >= 0) continue;//没有设置只包含时，存在忽略列表中的 跳过
				if(__var_checkform_include_names && __var_checkform_include_names.indexOf(";"+name+";") < 0) continue;//设置了只包含时，不存在列表中的 跳过
				var boxs = names_boxs[name];
				if(!boxs){
					try{
						//boxs = $("input[name='"+name+"'],textarea[name='"+name+"'],select[name='"+name+"']", $(fbox));
						var temp_boxs = fbox.namedItem(name);
						temp_boxs = (temp_boxs.length) ? temp_boxs : new Array(temp_boxs);
						boxs = $(temp_boxs);
					}catch(ex){;};
					if(!boxs) names_boxs[name] = boxs;
				}
				if(!boxs) continue;
				var box = boxs.get(i);
				if(!box) continue;
				if("INPUT,TEXTAREA,SELECT".indexOf($(box).get(0).tagName) < 0) continue;
				check = __MM_checkFormField(box);
        		if(!check) return false;
			}
		});
		
		return check;
	}
	else{
		var e = fbox.elements;
		for(var i=0;i<e.length;i++){
			var obj = e[i];
			if(!__var_checkform_include_names && __var_checkform_ignore_names.indexOf(";"+obj.name+";") >= 0) continue;//没有设置只包含时，存在忽略列表中的 跳过
			if(__var_checkform_include_names && __var_checkform_include_names.indexOf(";"+obj.name+";") < 0) continue;//设置了只包含时，不存在列表中的 跳过
			//---------------------------------
	        var check = __MM_checkFormField(obj);
	        if(!check) return false;
		}
		return true;
	}
	
}

///////////////////////////////////////////////
function __MM_checkFormField(obj){
	if(!obj) return true;	
    var value = _MM_GetFieldBoxValue(obj);//值
    var caption = obj.getAttribute("caption");//显示名称
    caption = (caption) ? caption : obj.getAttribute("objname");//向前兼容
    caption = (caption) ? "\""+caption+"\"" : "";
    var level = obj.getAttribute("level");
    level = (level) ? level : "1";//级别，1表禁止，0表提醒
        
    /////////////////////////////////////////////////////////////////////
    var attribute = (obj)?obj.getAttribute("isnull"):null;
    if(attribute && /^NOTNULL$/i.test(attribute)){ //check null
		if(!__MM_checkNULL(value,caption,level)){
			__MM_Focus(obj);
			return false;
		}
	}

    var attribute = (obj)?obj.getAttribute("maxlen"):null;
	if(attribute && /^([1-9])([0-9])*$/.test(attribute)){ // check maxlen
		if(!__MM_checkMaxLen_s(attribute,value,caption,level)){
			__MM_Focus(obj);
			return false;
		}
	}

    var attribute = (obj)?obj.getAttribute("minlen"):null;
	if(attribute && /^([1-9])([0-9])*$/.test(attribute)){ // check minlen
		if(!__MM_checkMinLen_s(attribute,value,caption,level)){
			__MM_Focus(obj);
			return false;
		}
	}
	
    var datatype = (obj)?obj.getAttribute("datatype"):null; 
	if(__MM_trim(value) != "" && datatype){
		if(/^EMAIL$/i.test(datatype)){//check email
			if(!__MM_checkEmail(value,caption,level)){
				__MM_Focus(obj);
				return false;
			}
		}
		if(/^PASSWORD$/i.test(datatype)){//check password
			if(!__MM_checkPwd(value,caption,level)){
				__MM_Focus(obj);
				return false;
			}
		}
		if(/^TEL$/i.test(datatype)){//check tel
			if(!__MM_checkTel(value,caption,level)){
				__MM_Focus(obj);
				return false;
			}
		}

		if(/^POSTCODE$/i.test(datatype)){//check CODE
			if(!__MM_checkPostCode(value,caption,level)){
				__MM_Focus(obj);
				return false;
			}
		}

		if(/^URL$/i.test(datatype)){//check url
			if(!__MM_checkURL(value,caption,level)){
				__MM_Focus(obj);
				return false;
			}
		}
		
		if(/^TITLE$/i.test(datatype)){//check title
			if(!__MM_checkTitle(value,caption,level)){
				__MM_Focus(obj);
				return false;
			}				
		}
		
		if(/^UNQUOT$/i.test(datatype)){//check unquot
			if(!__MM_checkUnQuot(value,caption,level)){
				__MM_Focus(obj);
				return false;
			}				
		}
		
		if(/^CODE$/i.test(datatype)){//check code
			if(!__MM_checkCode(value,caption,level)){
				__MM_Focus(obj);
				return false;
			}				
		}
		
		if(/^IP$/i.test(datatype)){//check IP Address
			if(!__MM_checkIpAddress(value,caption,level)){
				__MM_Focus(obj);
				return false;
			}				
		}

		if(/^DATE\(/i.test(datatype)){//check date
			try{
				if(!__MM_checkDate(datatype,value,caption,level)){
					__MM_Focus(obj);
					return false;
				}
			}
			catch(ex){}
		}

		if(/^NUMBER/i.test(datatype)){//check number
			try{
				if(!__MM_checkNumber(datatype,value,caption,level)){
					__MM_Focus(obj);
					return false;
				}
			}
			catch(ex){}
		}

		if(/^POSITIVE/i.test(datatype)){//check positive
			try{
				if(!__MM_checkPositive(datatype,value,caption,level)){
					__MM_Focus(obj);
					return false;
				}
			}
			catch(ex){}
		}
		
		if(/^NEGATIVE/i.test(datatype)){//check negative
			try{
				if(!__MM_checkNegative(datatype,value,caption,level)){
					__MM_Focus(obj);
					return false;
				}
			}
			catch(ex){}
		}
		

		if(/^INTEGER/i.test(datatype)){ //check integer
			try{
				if(!__MM_checkInteger(datatype,value,caption,level)){
					__MM_Focus(obj);
					return false;
				}
			}
			catch(ex){}
		}
		
		/////////////////////			
	}
	/////////////////////////
	if(datatype){
    	if(/^REGEXP:/i.test(datatype)){//正则表达式
			try{
				var errormsg = obj.getAttribute("errormsg");//显示错误提示
				errormsg = (!errormsg) ? "" : errormsg;
				if(!__MM_checkRegexp(datatype.substr(7),value,caption,errormsg,level)){
					__MM_Focus(obj);
					return false;
				}
			}
			catch(ex){}
		}
		
		if(/^SCRIPT:/i.test(datatype)){//脚本
			try{
				var errormsg = obj.getAttribute("errormsg");//显示错误提示
				errormsg = (!errormsg) ? "" : errormsg;
				if(!__MM_checkScript(datatype.substr(7),obj,caption,errormsg,level)){
					__MM_Focus(obj);
					return false;
				}
			}
			catch(ex){}
		}
    }
	return true;
}

///////////////////////////////////////////////
function __MM_checkNULL(val,caption,level)
{
	if(!val || __MM_trim(val) == ""){
		return __MM_RaiseMsg(caption + "输入不能为空!",level);
	}
	return true;
}

function __MM_checkMaxLen(len,val,caption,level)
{
	val = (val) ? val : "";
	if(len){
		var t = val.replace(/[^\x00-\xff]/g,"AA");
		if(t.length > len){
			return __MM_RaiseMsg(caption + "输入长度不能超过"+len+"\r\n\r\n目前您输入的长度为(一个汉字占两个长度位置):"+t.length,level);
		}
	}
	return true;
}

function __MM_checkMinLen(len,val,caption,level)
{
	if(!val) val = "";
	if(len){
		var t = val.replace(/[^\x00-\xff]/g,"AA");
		if(t.length < len){
			return __MM_RaiseMsg(caption + "输入长度不能小于"+len+"\r\n\r\n目前您输入的长度为(一个汉字占两个长度位置):"+t.length,level);
		}
	}
	return true;
}
function __MM_checkMaxLen_s(len,val,caption,level)
{
	val = (val) ? val : "";
	if(len){
		if(val.length > len){
			return __MM_RaiseMsg(caption + "输入长度不能超过"+len+"\r\n\r\n目前您输入的长度为:"+val.length,level);
		}
	}
	return true;
}

function __MM_checkMinLen_s(len,val,caption,level)
{
	if(!val) val = "";
	if(len){
		if(val.length < len){
			return __MM_RaiseMsg(caption + "输入长度不能小于"+len+"\r\n\r\n目前您输入的长度为:"+val.length,level);
		}
	}
	return true;
}

function __MM_checkEmail(email,caption,level)
{
	var reg = new RegExp("^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.([a-zA-Z0-9]){2,4}){1,2}$");
	if(!reg.test(email)){
		return __MM_RaiseMsg("不合法的电子邮件地址!",level);
	}
	return true;
}

function __MM_checkTel(tel,caption,level)
{
	if(!/^([0-9])*-?([0-9])*$/.test(tel)){
		return __MM_RaiseMsg(caption + "输入必须为数字或-",level);
	}
	return true;
}

function __MM_checkPostCode(code,caption,level)
{
	if(!/^([0-9])*([0-9])*$/.test(code)){
		return __MM_RaiseMsg(caption + "输入必须为数字!",level);
	}	
	return true;
}

function __MM_checkURL(url,caption,level)
{
	if(!/^HTTP|HTTPS|FTP|MAILTO/i.test(url)){
		return __MM_RaiseMsg(caption + "输入URL不完整!",level);
	}	
	return true;
}

function __MM_checkPwd(pwd,caption,level)
{
	if(!/^([a-zA-Z0-9])*([a-zA-Z0-9])*$/.test(pwd)){
		return __MM_RaiseMsg(caption + "输入必须只能包含数字、字母!",level);
	}
	return true;
}

function __MM_checkTitle(title,caption,level)
{
	//不能输入的符号有：' " & $ ? > < / | 
	// 2010-08-13 18:03 modify darell
	if(/\'|\"|\&|\x24|\?|\>|\<|\/|\|\$/ig.test(title)){
		var msg = "\' \" & $ ? > < / |";
	//if(/\'|\"|\&|\x24|\?|\>|\<|\/|\|\$\‘|\“|\&|\？||\|/ig.test(title)){
	//	var msg = "\' \" & $ > < / | ";
		return __MM_RaiseMsg(caption + "输入不能包含任何下列字符之一\r\n\t"+msg+"",level);
	}
	return true;
}

function __MM_checkUnQuot(unquot,caption,level)
{
	//不能输入的符号有：' " 
	if(/\'|\"/ig.test(unquot)){
		var msg = "\' \"";
		return __MM_RaiseMsg(caption + "输入不能包含任何下列字符之一\r\n\t"+msg+"",level);
	}
	return true;
}

function __MM_checkCode(code,caption,level)
{
	if(!/^([a-zA-Z0-9\_\-])+$/.test(code)){
		return __MM_RaiseMsg(caption + "输入只能包含数字、字母、_",level);
	}	
	return true;
}

function __MM_checkIpAddress(ipAddress, caption, level){
	var parttern = /^((?:[1-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.)((?:[0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){2}(?:[1-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/;
	if(!parttern.test(ipAddress)){
		return __MM_RaiseMsg(caption + "输入IP地址不正确!",level);
	}	
	return true;
}

function __MM_checkNumber(datatype,value,caption,level)
{
	//处理输入值是否包含有单引号或双引号,如果包含就不进行以下处理啦,数据中是不可能有单引号或双引号的
	if(/\'|\"/.test(value)){
		return __MM_RaiseMsg(caption + "只能输入数字,不能包含有单引号或双引号!",level);
	}

	var fuc = datatype;
	fuc = (new String(__MM_trim(fuc))).toUpperCase();
    
    __MM_checkForm_debug(fuc);
	try{
		if(/^NUMBER$/i.test(fuc)){// number
			fuc = "__MM_NUMBER(-1,-1,'"+value+"','"+caption+"',"+level+")";
		}
		else if(/^NUMBER\(\)/i.test(fuc)){ // number()
			fuc = "__MM_NUMBER(-1,-1,'"+value+"','"+caption+"',"+level+")";
		}
		else if(/^NUMBER\(([0-9])*\)/i.test(fuc)){// number(5)
			fuc = "__MM_" + fuc.replace(")",",-1,'"+value+"','"+caption+"',"+level+")");
		}
		else{// number(5,2)
			fuc = "__MM_" + fuc.replace(")",",'"+value+"','"+caption+"',"+level+")");
		}
		if(!eval(fuc)){
			return false;
		}
        
	}
	catch(ex){}
	return true;
}

function __MM_checkPositive(datatype,value,caption,level)
{
	try{
		var val = value;
		if(/^(-|\+)+/.test(val)){
			return __MM_RaiseMsg(caption + "输入不能带有正负(+,-)符号，只能是正数！",level);
		}
	}
	catch(ex){}
	datatype = (new String(datatype)).toUpperCase();
	datatype = datatype.replace("POSITIVE","NUMBER");
	return __MM_checkNumber(datatype,value,caption,level);
}

function __MM_checkNegative(datatype,value,caption,level)
{
	try{
		var val = value;
		if(!/^-/.test(val) && val != 0){
			return __MM_RaiseMsg(caption + "输入必须为负数或0！",level);
		}
	}
	catch(ex){}
	datatype = (new String(datatype)).toUpperCase();
	datatype = datatype.replace("NEGATIVE","NUMBER");
	return __MM_checkNumber(datatype,value,caption,level);
}

function __MM_checkInteger(datatype,value,caption,level)
{
	try{
		var val = value;
		if(/^(-|\+)+/.test(val)){
			return __MM_RaiseMsg(caption + "输入不能带有正负(+,-)符号，只能是正整数!",level);
		}

		if(/(\.)+/.test(val)){
			return __MM_RaiseMsg(caption + "输入不能带有小数点(.)符号，只能是整数!",level);
		}
	}
	catch(ex){}

	datatype = (new String(datatype)).toUpperCase();
	datatype = datatype.replace("INTEGER","NUMBER");
	return __MM_checkNumber(datatype,value,caption,level);
}

//参数：L1长度，L2小数位数,Num待判断的数字,caption说明
function __MM_NUMBER(L1,L2,Num,caption,level)
{
	if(!/^(-|\+|([0-9]))([0-9])*\.?([0-9])*$/.test(Num)){
		return __MM_RaiseMsg(caption + "输入含有不是数字的字符!",level);
	}
	var Numstr = Num;
	Numstr = Numstr.replace("-","");
	Numstr = Numstr.replace("+","");
	
	if(/^00/.test(Numstr)){
		return __MM_RaiseMsg(caption + "输入数字不合理!",level);
	}

    if(L2 == 0 && /(\.)/.test(Num)){
        return __MM_RaiseMsg(caption + "输入不能带有小数!",level);
    }

	Numstr = Numstr.replace(".","");

	if(L1 > 0){
		if(Numstr.length > L1){
			return __MM_RaiseMsg(caption + "数字的长度太长,只允许长度为:"+L1,level);
		}
		else{
			if(L2 > 0){
				if(!/\./.test(Num)){
					if(Num.length > L1 - L2){
						return __MM_RaiseMsg(caption + "数字整数位太多,只允许"+(L1 - L2)+"位!",level);
					}
				}
				else{
					var res = /\./.exec(Num);
					try{
						var pos = res.index;
						//alert("pos=" + pos);
						//alert(L1 - L2);
						if(pos > L1 - L2){
							return __MM_RaiseMsg(caption + "数字整数位太多,只允许"+(L1 - L2)+"位!",level);
						}
						if(Numstr.length - pos > L2){
							return __MM_RaiseMsg(caption + "数字小数位太多,只允许"+L2+"位小数!",level);
						}
					}
					catch(ex){}
				}
			}
		}
	}
	return true;
}

/**
Pattern:
	yyyyMM
	yyyy/MM
	yyyy-MM
	yyyy年MM月

	yyyyMMdd
	yyyy/MM/dd
	yyyy-MM-dd
	yyyy年MM月dd日

	yyyyMMddHHmm
	yyyy/MM/dd HH:mm
	yyyy-MM-dd HH:mm
	yyyy年MM月dd日 HH:mm

	yyyyMMddHHmmss
	yyyy/MM/dd HH:mm:ss
	yyyy-MM-dd HH:mm:ss
	yyyy年MM月dd日 HH:mm:ss
*/
function __MM_checkDate(datatype,dateValue,caption,level)
{
	//=====================================
	var array = new Array(); var msgArray = new Array();
	array['yyyy'] = /^([1,2]\d\d\d)$/;					msgArray['yyyy'] = "";
	array['MM']   = /^(?:0[1-9]|1[0-2])$/;				msgArray['MM']   = "(01到12，且定长2位)";
	array['M']    = /^(?:[1-9]|1[0-2])$/;				msgArray['M']    = "(1到12的数字)";
	array['dd']   = /^(?:0[1-9]|[1-2][0-9]|3[0-1])$/;	msgArray['dd']   = "(01到31，且定长2位)";
	array['d']    = /^(?:[1-9]|[1-2][0-9]|3[0-1])$/;	msgArray['d']    = "(1到31的数字)";
	//------------------------------------------------
	
	array['yyyyMM'] = /^([1,2]\d\d\d)(\d\d)$/;
	array['yyyy/MM'] = /^([1,2]\d\d\d)\/(\d\d)$/;
	array['yyyy-MM'] = /^([1,2]\d\d\d)-(\d\d)$/;
	array['yyyy年MM月'] = /^([1,2]\d\d\d)年(\d\d)月$/;
	
	array['yyyyMd'] = /^([1,2]\d\d\d)(\d{1,2})(\d{1,2})$/;
	array['yyyy/M/d'] = /^([1,2]\d\d\d)\/(\d{1,2})\/(\d{1,2})$/;
	array['yyyy-M-d'] = /^([1,2]\d\d\d)-(\d{1,2})-(\d{1,2})$/;
	array['yyyy年M月d日'] = /^([1,2]\d\d\d)年(\d{1,2})月(\d{1,2})日$/;

	array['yyyyMMdd'] = /^([1,2]\d\d\d)(\d\d)(\d\d)$/;
	array['yyyy/MM/dd'] = /^([1,2]\d\d\d)\/(\d\d)\/(\d\d)$/;
	array['yyyy-MM-dd'] = /^([1,2]\d\d\d)-(\d\d)-(\d\d)$/;
	array['yyyy年MM月dd日'] = /^([1,2]\d\d\d)年(\d\d)月(\d\d)日$/;

	array['yyyyMMddHHmm'] = /^([1,2]\d\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/;
	array['yyyy/MM/dd HH:mm'] = /^([1,2]\d\d\d)\/(\d\d)\/(\d\d) (\d\d):(\d\d)$/;
	array['yyyy-MM-dd HH:mm'] = /^([1,2]\d\d\d)-(\d\d)-(\d\d) (\d\d):(\d\d)$/;
	array['yyyy年MM月dd日 HH:mm'] = /^([1,2]\d\d\d)年(\d\d)月(\d\d)日 (\d\d):(\d\d)$/;

	array['yyyyMMddHHmmss'] = /^([1,2]\d\d\d)(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)$/;
	array['yyyy/MM/dd HH:mm:ss'] = /^([1,2]\d\d\d)\/(\d\d)\/(\d\d) (\d\d):(\d\d):(\d\d)$/;
	array['yyyy-MM-dd HH:mm:ss'] = /^([1,2]\d\d\d)-(\d\d)-(\d\d) (\d\d):(\d\d):(\d\d)$/;
	array['yyyy年MM月dd日 HH:mm:ss'] = /^([1,2]\d\d\d)年(\d\d)月(\d\d)日 (\d\d):(\d\d):(\d\d)$/;
	
	var Par = datatype
	var Val = dateValue;
	
	var ary2 = Par.split("'");
	var Pattern = ary2[1];
	var reg = array[Pattern];
	//alert(Val);
	//alert(reg);
	if(!reg || !reg.test(Val)){
		//alert(reg);
		return __MM_RaiseMsg(caption + "输入格式不正确,应为 "+Pattern + " " +(msgArray[Pattern]?msgArray[Pattern]:""),level);
	}
	//alert(Pattern);
	//---------------------------------------
	//处理只有年或月或日的格式验证
	if(Pattern == 'yyyy' || Pattern == 'MM' || Pattern == 'M' || Pattern == 'dd' || Pattern == 'd'){
		//alert(Pattern);
		return true;//只要进行第1步验证就可以了。
	}
	//---------------------------------------
	
	var dateAry = Val.match(reg); 
	if(dateAry == null ){
		return __MM_RaiseMsg(caption + "输入格式不正确,应为 "+Pattern + " " +(msgArray[Pattern]?msgArray[Pattern]:""),level);
	}	

	dateAry[2] = dateAry[2]-1;
	if(!dateAry[1]) dateAry[1] = "2000";
	if(dateAry[2]!=0 && !dateAry[2]) dateAry[2] = "01";
	if(!dateAry[3]) dateAry[3] = "01";
	if(!dateAry[4]) dateAry[4] = "00";
	if(!dateAry[5]) dateAry[5] = "00";
	if(!dateAry[6]) dateAry[6] = "00";
	var myDate = new Date(dateAry[1],dateAry[2],dateAry[3],dateAry[4],dateAry[5],dateAry[6]); 
	if(myDate.getFullYear() != dateAry[1]){
		return __MM_RaiseMsg(caption + "输入格式不正确(月),应为"+Pattern,level);
	}
	if(myDate.getMonth() != dateAry[2]){
		return __MM_RaiseMsg(caption + "输入格式不正确(日),应为"+Pattern,level);
	}
	if(myDate.getDate() != dateAry[3]){
		return __MM_RaiseMsg(caption + "输入格式不正确(时),应为"+Pattern,level);
	}

	if(myDate.getHours() != dateAry[4]){
		return __MM_RaiseMsg(caption + "输入格式不正确(分),应为"+Pattern,level);
	}
	if(myDate.getMinutes() != dateAry[5]){
		return __MM_RaiseMsg(caption + "输入格式不正确(秒),应为"+Pattern,level);
	}
	if(myDate.getSeconds() != dateAry[6]){
		return __MM_RaiseMsg(caption + "输入格式不正确,应为"+Pattern,level);
	}

	return true;
}

//正则表达式
function __MM_checkRegexp(datatype,value,caption,errormsg,level){
	if(!datatype) return true;
	try{
		var regex = eval(datatype);
		var check = regex.test(value);
		if(!check){
			var msg = (caption?caption:"") + (errormsg?errormsg:"");
			return __MM_RaiseMsg(msg, level);
		}
	}
	catch(ex){;}
	return true;
}

//函数脚本
function __MM_checkScript(datatype,box,caption, errormsg,level){
	if(!datatype) return true;
	try{
		if(datatype.indexOf("#1") >= 0){
			datatype = datatype.replace(/\#1/ig, "box");
		}
		
		var check = eval(datatype);
		if(!check){
			var msg = (caption?caption:"") + (errormsg?errormsg:"");
			return __MM_RaiseMsg(msg, level);
		}
	}
	catch(ex){;}
	return true;
}

//取得表单域对象值
//表单域对象
function _MM_GetFieldBoxValue(fieldBox)
{
    if(!fieldBox){
        return null;
    }

    if(fieldBox.type == 'radio'){
        var form = fieldBox.form;
        var formName = (form) ? form.name : "";
        var fieldName = fieldBox.name;
        var value = null;

        radlist=document.getElementsByTagName("input");    
        
        for (var i=0; i<radlist.length; i++){    
            var radioBox = radlist[i];
            if(!radioBox) continue;
            var radioBoxForm = radioBox.form;
            var radioBoxFormName = (radioBoxForm) ? radioBoxForm.name : "";
            if(radioBox.type == "radio" &&  
                    radioBox.name == fieldName &&  
                    radioBoxFormName == formName &&  
                    radioBox.checked){    
                value = radioBox.value;
                break;
            }    
        }    
        return value;    
    }
    else if(fieldBox.type == 'checkbox'){//处理复选框
        if(fieldBox.checked){
            return fieldBox.value;
        }
        else{
            return null;
        }
    }
    else{
        return fieldBox.value;
    }
}

//得到一个表单有多少个名字的表单域
function __MM_GetFieldNames(fbox){
	var retu = null;
	if(!fbox) return retu;
	var names = ",";
	var index = 0;
	$("input,textarea,select", $(fbox)).each(function(i){
		var name = $(this).attr("name");
		if(names.indexOf(","+name+",") >= 0) return;
		names += name + ",";
		if(retu == null) retu = new Array();
		retu[index++] = name;		
	});
	return retu;
}

function __MM_trim(val){
	if(!val) return val;
	return val.replace(/(^\s*)|(\s*$)/g,"");
}

//根据level显示信息，level=0提醒，1禁止
function __MM_RaiseMsg(msg,level)
{
	if(!msg){
		return false;
	}
	
    if(level==0){
    	var check = true;
    	msg = msg + "\r\n\r\n是否继续？\r\n";
    	try{
        	check = netinnetConfirm(msg);
    	}
    	catch(ex){
    		check = confirm(msg);
    	}
        return check;
    }
    else{//if level==1
        try{
        	netinnetAlert(msg);
        }
        catch(ex){
        	alert(msg);
        };
        return false;
    }
    return false;
}

function __MM_Focus(obj)
{
	try{
		obj.select();
	}
	catch(ex){
		try{
			obj.focus();
		}
		catch(ex2){}
	}
}

function __MM_checkForm_debug(msg)
{
    //alert(msg);
}

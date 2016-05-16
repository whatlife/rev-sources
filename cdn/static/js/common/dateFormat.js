//日期属性拓展 lipeng 
Date.prototype.format = function(format) {
	if(!format||format=="")
	{
		format="yyyy-MM-dd hh:mm:ss";
	}
	/*
	 * format="yyyy-MM-dd hh:mm:ss";
	 */
	var o = {
		"M+" : this.getMonth() + 1,
		"d+" : this.getDate(),
		"h+" : this.getHours(),
		"m+" : this.getMinutes(),
		"s+" : this.getSeconds(),
		"q+" : Math.floor((this.getMonth() + 3) / 3),
		"S" : this.getMilliseconds()
	}

	if(/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}

	for(var k in o) {
		if(new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
}

//把查询区域日期的时间和分钟改为 00:00
function changeBeginTime(obj)
{
	if(obj.value!="")
	{
		var date = new Date(obj.value.replace(/-/g, "/"));
		$("#"+obj.id).val(date.format("yyyy-MM-dd")+" 00:00");
	}
}

//格式化从数据库返回的日期类型
function formatDateVal(elementId)
{
	var valDate = $("#"+elementId).val();
	if (!$.StringUtils.isEmpty(valDate)) {
		if(typeof(valDate)=="string"&&valDate.constructor==String)
		{
			if (valDate.indexOf(".") > 0) {
				valDate = valDate.substring(0, valDate.indexOf("."));
				var date = new Date(valDate.replace(/-/g, "/"));
				$("#" + elementId).val(date.format("yyyy-MM-dd hh:mm"));
			}else if(valDate.indexOf("-") > 0)
			{
				$("#"+elementId).val(valDate);
			}else 
			{
				var date = new Date(valDate);
				if(typeof(date)=="object"&&date.constructor==Date)
				{
					$("#"+elementId).val(date.format("yyyy-MM-dd hh:mm"));
				}else
				{
					$("#"+elementId).val(valDate);
				}
			}
		}else if(typeof(valDate)=="object"&&valDate.constructor==Date)
		{
			var date = new Date(valDate);
			$("#" + elementId).val(date.format("yyyy-MM-dd hh:mm"));
		}
		else
		{
			$("#"+elementId).val(valDate);
		}
	}
}

//把查询区域日期的时间和分钟改为 23:59
function changeEndTime(obj)
{
	if(obj.value!="")
	{
		var date = new Date(obj.value.replace(/-/g, "/"));
		$("#"+obj.id).val(date.format("yyyy-MM-dd")+" 23:59");
	}
}
//批量格式化java日志格式
function formatDateVals(list)
{
	if(!$.StringUtils.isEmpty(list))
	{
		if(list.length>0)
		{
			$.each(list,function(index){
				formatDateVal(list[index]);
			});
		}
	}
}
//时间控件查询条件控制
//当前时间
function currentTime(flag){
	if(flag){
		WdatePicker({dateFmt:'yyyy-MM-dd HH:mm',minDate:'%y-%M-%d '});
	}else{
		WdatePicker({dateFmt:'yyyy-MM-dd HH:mm',maxDate:'%y-%M-%d '});
	}
}
//创建时间从事件(控件没有初始值的时候用)
function createTimeFromFuncForNoInit(thisObj, obj) {
	var thisVal = $("#" + thisObj).val();
	// 开始和到的时间值
	var end = $("#" + obj).val();
	if ($.StringUtils.isEmpty(thisVal)) {
		if (!$.StringUtils.isEmpty(end)) {
			WdatePicker({
				dateFmt : 'yyyy-MM-dd 00:00',
				maxDate : end
			});
		} else {
			WdatePicker({
				dateFmt : 'yyyy-MM-dd 00:00'
			});
		}
	} else {
		if (!$.StringUtils.isEmpty(end)) {
			WdatePicker({
				dateFmt : 'yyyy-MM-dd HH:mm',
				maxDate : end
			});
		} else {
			WdatePicker({
				dateFmt : 'yyyy-MM-dd HH:mm'
			});
		}
	}
}
//创建时间到事件(控件没有初始值的时候用)
function createTimeToFuncForNoInit(thisObj,obj) {
	var thisVal = $("#"+thisObj).val();
	// 开始和到的时间值
	var begin = $("#" + obj).val();
	if($.StringUtils.isEmpty(thisVal)){
		if (!$.StringUtils.isEmpty(begin)) {
			WdatePicker({
				dateFmt : 'yyyy-MM-dd 23:59',
				minDate : begin
			});
		} else {
			WdatePicker({
				dateFmt : 'yyyy-MM-dd 23:59'
			});
		}
	}else{
		if (!$.StringUtils.isEmpty(begin)) {
			WdatePicker({
				dateFmt : 'yyyy-MM-dd HH:mm',
				minDate : begin
			});
		} else {
			WdatePicker({
				dateFmt : 'yyyy-MM-dd HH:mm'
			});
		}
		}
	}
function betweenCreateTime(obj1,obj2){
	//开始和到的时间值
	var begin=$("#"+obj1).val();
	//开始和到的时间值
	var end=$("#"+obj2).val();
	//如果开始时间不为空，则设置到的最小值为开始时间
	if(!isBlankOrEmpty(end) || !isBlankOrEmpty(begin))
	{
		WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:end,minDate:begin});
	}else{
		WdatePicker({dateFmt:'yyyy-MM-dd'});
	}
}
//创建时间从事件
function createTimeFromFunc(obj){
	//开始和到的时间值
	var end=$("#"+obj).val();
	var minDate = new Date().format("yyyy-MM-dd"); 
	//如果开始时间不为空，则设置到的最小值为开始时间
	if(!isBlankOrEmpty(end))
	{
		WdatePicker({dateFmt:'yyyy-MM-dd',maxDate:end,minDate:minDate});
	}else{
		WdatePicker({dateFmt:'yyyy-MM-dd',minDate:minDate});
	}
}
//创建时间到事件
function createTimeToFunc(obj){
	//开始和到的时间值
	var begin=$("#"+obj).val();
	//如果开始时间不为空，则设置到的最小值为开始时间
	if(!isBlankOrEmpty(begin))
	{
		WdatePicker({dateFmt:'yyyy-MM-dd',minDate:begin});
	}else{
		WdatePicker({dateFmt:'yyyy-MM-dd'});
	}
}
//创建时间从事件
function createTimeFromEditFunc(obj){
	//开始和到的时间值
	var end=$("#"+obj).val();
	//如果开始时间不为空，则设置到的最小值为开始时间
	if(!$.StringUtils.isEmpty(end))
	{
		WdatePicker({dateFmt:'yyyy-MM-dd HH:mm',maxDate:end});
	}else{
		WdatePicker({dateFmt:'yyyy-MM-dd HH:mm'});
	}
}
//创建时间从事件
function createTimeFromEditFuncNew(obj){
	//开始和到的时间值
	var end=$("#"+obj).val();
	//如果开始时间不为空，则设置到的最小值为开始时间
	if(!$.StringUtils.isEmpty(end))
	{
		WdatePicker({dateFmt:'yyyy-MM-dd HH:mm',maxDate:end});
	}else{
		WdatePicker({dateFmt:'yyyy-MM-dd HH:mm'});
	}
}
//创建时间到事件
function createTimeToEditFunc(obj){
	//开始和到的时间值
	var begin=$("#"+obj).val();
	//如果开始时间不为空，则设置到的最小值为开始时间
	if(!$.StringUtils.isEmpty(begin))
	{
		WdatePicker({dateFmt:'yyyy-MM-dd HH:mm',minDate:begin});
	}else{
		WdatePicker({dateFmt:'yyyy-MM-dd HH:mm'});
	}
}
//创建时间到事件
function createTimeToEditFuncNew(obj){
	//开始和到的时间值
	var begin=$("#"+obj).val();
	//如果开始时间不为空，则设置到的最小值为开始时间
	if(!$.StringUtils.isEmpty(begin))
	{
		WdatePicker({dateFmt:'yyyy-MM-dd HH:mm',minDate:begin});
	}else{
		WdatePicker({dateFmt:'yyyy-MM-dd HH:mm'});
	}
}

//限制不能大于指定目标时间
var currentMax=function(obj){
	return function(){
		createTimeMaxFunc(obj);
	}
}
function createTimeMaxFunc(obj){
	//开始和到的时间值
	var end=$("#"+obj).val();
	//如果开始时间不为空，则设置到的最小值为开始时间
	if(!$.StringUtils.isEmpty(end))
	{
		WdatePicker({dateFmt:'yyyy-MM-dd HH:mm',maxDate:end});
	}else{
		WdatePicker({dateFmt:'yyyy-MM-dd HH:mm'});
	}
} 
//限制不能小于指定目标时间
var currentMin=function(obj){
	return function(){
		createTimeMinFunc(obj);
	}
}
function createTimeMinFunc(obj){
	//开始和到的时间值
	var begin=$("#"+obj).val();
	//如果开始时间不为空，则设置到的最小值为开始时间
	if(!$.StringUtils.isEmpty(begin))
	{
		WdatePicker({dateFmt:'yyyy-MM-dd HH:mm',minDate:begin});
	}else{
		WdatePicker({dateFmt:'yyyy-MM-dd HH:mm'});
	}
}

$(window).ready(function(){
	$("textarea").bind("blur",function(event){
		var temp = event.currentTarget;
		var value =temp.value;
		value = value.replace(/\'/g,"");
		value = value.replace(/\"/g,"");
		$("#"+temp.id).val(value);
		return true;
	});
});

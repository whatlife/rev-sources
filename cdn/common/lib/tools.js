//时间格式转换
function dateformat(date,format){
	if(date){
		if(format!==undefined){
			var k={'yyyy':[0,4],'MM':[4,6],'dd':[6,8],'HH':[8,10],'mm':[10,12],'ss':[12,14]};
			for(var key in k){
				format = format.replace(key,date.substring(k[key][0],k[key][1]));
			}
			date = format;
		}else{
			var len = date.length;
			len==8 && (date = date.substring(0,4) +"-"+ date.substring(4,6) +"-"+ date.substring(6,8));
			len==14 && (date = date.substring(0,4) +"-"+ date.substring(4,6) +"-"+ date.substring(6,8) +" "+ date.substring(8,10)+":"+ date.substring(10,12)+":"+ date.substring(12,14));
		}
	}
	return date;
}
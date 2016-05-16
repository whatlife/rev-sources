/*
***************************copy right of netinnet.cn ***************************
                           ver 20100114
*/
/*
 *此js文件是一些常用的自定义Js，避免每个页面都写着相同的Js
 */

/* 字符串去空格功能  */
function softkf_Trim(sText){ return sText.replace(new RegExp("(^[\\s]*)|([\\s]*$)", "g"), ""); }

  /* 调用平台的Form验证提交功能 */
function updateDel_softkf(operationFlag)
{ if(!hasOneChecked("CHECK_CONFIRM")){ netinnetAlert("请至少勾选一行");  return false;    }		    
   if(!checkForm(document.forms[0],"CHECK_CONFIRM")) return false;
   if( operationFlag == "delete" )
	{ 	if(netinnetConfirm("确实要删除吗？"))
	 	 {	v_dto.start.value=operationFlag;  v_dto.submit();  return;	 } 	
	}else{  v_dto.start.value=operationFlag;  v_dto.submit(); } 	  
 }
 
 function deleteAll_softkf(tableName)
 { 	if(netinnetConfirm("即将清空全部数据，此操作不可恢复！确定？"))
 	{	v_dto.start.value="deleteAll";	v_dto.submit();	return;	}
 }
 
 /* 调用平台的全选全不选功能 */
function doCheckAll(checkBoxObject)
{	if(checkBoxObject.checked){	selectedAllCheckBox("CHECK_CONFIRM");}
	else{	deselectAllCheckBox("CHECK_CONFIRM");	 }
}

 /** 打开一个新窗口 **/
function openWindow(url)
{	var newwindow=window.open(url,"","toolbar=no,menubar=no,location=no,resizable=yes,scrollbars=yes");
	if(document.all){ newwindow.moveTo(0,0); newwindow.resizeTo(screen.width,screen.height-27); } 
}

/**通用的检查上传文件类型的函数,使用该函数只能上传Pdf，Jpg，Doc，Txt，Xls类型的文件。**/
function commonCheckUploadFile(file,jsfun)
{ if( file.value == "" ) { netinnetAlert("请选择要上传的文件，文件类型只能为doc,txt,xls,pdf,jpg，并且不能大于10M。"); file.focus(); file.select(); return false; } 
var typestr = file.value.substr(file.value.lastIndexOf(".")+1);
if( typestr.toUpperCase()=="PDF" || typestr.toUpperCase()=="JPG" || typestr.toUpperCase()=="DOC" || typestr.toUpperCase()=="TXT" || typestr.toUpperCase()=="XLS" ){
return true;
   } else{ netinnetAlert("文件类型只能为doc,txt,xls,pdf,jpg，请重新选择."); file.focus(); file.select(); return false; } return false;
}

/*********账簿划线*******/
function doZBShowLine(){
	doZBShowLine("0");
}
function doDrawLine(type,fbox){
	$("select[name=vouchertype_i]").prepend($('<option value="--" memo="----------------" rowclass="8" isNormalRec="0">--</option>'));
	$("select[name=vouchertype_i]").prepend($('<option value="==" memo="================" rowclass="9" isNormalRec="0">==</option>'));
	 $("select[name=vouchertype_i]>option[rowclass="+type+"]").attr("selected","selected"); 
	 
	type_do($("select[name=vouchertype_i]").val());
	doAddSubmit(fbox);
}

function doZBShowLine(isdel){ 
	 $("select[name=vouchertype_i]>option[rowclass=8]").remove(); 
	$("select[name=vouchertype_i]>option[rowclass=9]").remove(); 
	$("tr[rowclass]").each(function(eq){
		
		var keyid=$(this).find("input[name=ledgerrecordid]").val();
		$("#div_for_drawLine_only").prepend($("<div id='line"+$(this).attr("rowid")+"' keyid='"+keyid+"' style='position:relative;z-index:1001;'></div>"))
	    var obj_o = $(this).offset(); 
		var obj_w = $(this).width(); 
		var obj_l=obj_o.left-$("#div_for_drawLine_only").offset().left
		var obj_t=obj_o.top-$("#div_for_drawLine_only").offset().top
		var line_type = ($(this).attr("rowclass")=="9")?"2":"1";
	 
 		 _Bill_draw_line('line'+$(this).attr("rowid"),obj_l,obj_t-3,obj_l+obj_w,obj_t-3,'RED',line_type);
 		if(isdel!="1"){
 		//要实现删除划线 单线太细 用户可能点击不到background-color:transparent;
 	 	$("#div_for_drawLine_only").prepend($("<div id='del_line"+$(this).attr("rowid")+"' rowclass='"+$(this).attr("rowclass")+"' rowid='"+$(this).attr("rowid")+"' keyid='"+keyid+"'    style='cursor:hand;position:relative;z-index:1002;left:"+obj_l+";top:"+(obj_t)+";background-color:transparent;'><div style='position:absolute;top:-11px;width:"+obj_w+";left:0px;height:5px;background-color:transparent;;'></div></div>"))
	     $("#del_line"+$(this).attr("rowid")).click(function(){
 			 var obj = $("#line"+$(this).attr("rowid"));
 			 var del_line=$(this);
 			 try{
 			 	doRemove(keyid,$(this).attr("rowclass"))
 			 	}catch(ex){
	 		     if(confirm("确定要删除该划线?")){
	 		 	 	$.post("do?action=ts_ledger&start=delete_line",{"sxid":$("input[name=sxid]").val(),"ledgerrecordid":keyid},function(data){
	 		 	 	$(obj).remove();
	 		 	 	$(del_line).remove();
	 		 	 	},"html");
	 		 	 }
 		 	 }
 		 });}
	});	
	
}


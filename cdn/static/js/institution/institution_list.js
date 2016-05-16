;(function(global) {
	var __layerIndex;
	function institution_list(page, pageFun) {
		page = page || 1;
		pageFun = pageFun || 'institution_list';
		var pageCount = 30;
		var data = {page:page, pageFun:pageFun, pageCount:pageCount};
		$.fn.ajaxEjsRender({
			renderEl : "institution_list_body",  
			templete : "institution_list_tpl",  
			data     : data,  
			dataType : 'json',
			url      : RD.mainActionUrl+"do?action=mg/institution_list&start=get_institution_list"
		}, function(){
		});
	}

	function search_institution_list(page, pageFun) {
		page = page || 1;
		pageFun = pageFun || 'search_institution_list';
		var pageCount = 30;
		var data = {page:page, pageFun:pageFun, pageCount:pageCount,province_where:$("#province_where").val(),city_where:$("#city_where").val(),institution_name_where_like:$("#institution_name_where_like").val()};
		$.fn.ajaxEjsRender({
			renderEl : "institution_list_body",  
			templete : "institution_list_tpl",  
			data     : data,  
			dataType : 'json',
			type     : "POST",
			url      : RD.mainActionUrl+"do?action=mg/institution_list&start=get_search_institution_list"
		}, function(){

		});
	}
	function info(institution){
		    var $institution = $("#"+institution);
		    $("#institution_code").val($institution.attr("institution_code"));
			$("#institution_name").val($institution.attr("institution_name"));
			$("#short_name").val($institution.attr("short_name"));
			$("#home_url").val($institution.attr("home_url"));
			$("#admin_code").val($institution.attr("admin_code"));
			$("#province").val($institution.attr("province"));
			$("#city").val($institution.attr("city"));
			$("#address").val($institution.attr("address"));
			$("#branch_count").val($institution.attr("branch_count"));
			$("#teacher_count").val($institution.attr("teacher_count"));
			$("#contacts").val($institution.attr("contacts"));
			$("#phone").val($institution.attr("phone"));
			$("#email").val($institution.attr("email"));
			$("#create_time").val(dateformat($institution.attr("create_time")));
			$institution.attr("is_exam_institution")==1?$("#is_exam_institution").val("是"):$("#is_exam_institution").val("否");
			$institution.attr("enable_card_sales")==1?$("#enable_card_sales").val("开启中"):$("#enable_card_sales").val("关闭");
			$institution.attr("enable_page_embedding")==1?$("#enable_page_embedding").val("开启中"):$("#enable_page_embedding").val("关闭");


			__layer_index = $.layer({
				type: 1,
			    title : '基本信息',
			    border : [5 , 0.5 , '#000', true],
			    area: ['720px', '460px'],
			    page: {dom: '#user_info'}
			});	
	}
	function update_status(id,status){
		var msg = '1'=== status?"确定要禁用？":"确定要启用？";
		layer.confirm(msg,function(){
			update_status_do(id,status);
		});
	}
	function update_status_do(id,status){
	    status = status=='1'?'0':'1';
		var url= RD.mainActionUrl+"do?action=mg/institution_list&start=update_status";
		$.ajax({
			   type: "POST",
			   dataType: "json",
			   data:{institution_id:id,status:status},
			   url: url,
	           success:function(data){
	        	 if(data.code=="200"){
	               layer.msg('操作成功！', 1,{type:1},function(){
	            	   layer.closeAll();
	            	   $(".paginate").find(".active")[0].click();
	               });
	             }else{
	               layer.msg("操作失败");	 
	             }
	           }
	     });
    }
	function update_info(institution_id){
		window.location.href = RD.mainUrl+"doView?action=v_mg&start=institution_edit&institution_id="+institution_id;
	}
	
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

	$("#btn-search").on("click",function(){
		search_institution_list();
	});
	$("#btn-add-institution").on("click",function(){
		window.location.href = RD.mainUrl+"doView?action=v_mg&start=institution_add";
	});
	$("#school_name_where").on("click",function(e){
	   if(e.which===13){
		   $("#btn-search").trigger("click");
	   }	
	});
	institution_list();
	$("#province_where").provinces("#city_where","","");
	
	global.institution_list        = institution_list;
	global.search_institution_list = search_institution_list;
	global.info               = info;
	global.update_info        = update_info;
	global.update_status      = update_status;
})(this);
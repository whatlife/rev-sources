;(function(){	
	var __opt = $("#opt").val(),
	    __start = "edit"==__opt?"infoupdate":"infoadd",
	    __def_pro,
	    __def_city,
	    __valid_elements;
	if("edit"===__opt){
		__valid_elements={
				"u_phone":{"datatype":"tel","msg_error":"您输入的联系方式格式不正确","msg_null":"联系方式不能为空","isnull":false},
				"u_institution_name":{"datatype":"companyname","msg_error":"可以填写中文、英文","max_len":100,"min_len":3,"isnull":false,"url": RD.mainActionUrl+"do?action=institution/institution_info&start=institution_name_unique_valid_1&institution_id="+$("#institution_id").val(),caption:"名称"},
				"u_institution_admin_code":{"datatype":"username","msg_error":"可以填写中文、英文 ","max_len":20,"min_len":3,caption:"管理员"},
				"u_short_name":{"datatype":"username","msg_error":"可以填写中文、英文","max_len":20,"min_len":1,"isnull":false,caption:"简称"},
				"u_institution_code":{"datatype":"usercode","msg_error":"可以使用的符号有[A-Za-z0-9_]","max_len":20,"min_len":4,"isnull":false,"url":RD.mainActionUrl+"do?action=institution/institution_info&start=institution_code_unique_valid_1&institution_id="+$("#institution_id").val(),caption:"编码"},
				"u_home_url":{"datatype":"url","msg_error":"您输入的格式不正确","isnull":false,"url": RD.mainActionUrl+"do?action=institution/institution_info&start=institution_home_url_unique_valid_1&institution_id="+$("#institution_id").val(),caption:"URL"},
				"logo_url":{"msg_null":"logo不能为空","isnull":false},
				"u_province":{"datatype":"usercode","msg_null":"省份不能为空","isnull":false},
				"u_city":{"datatype":"usercode","msg_error":"城市不能为空","isnull":false},
				"u_contacts":{"datatype":"realname","msg_error":"可以填写中文、英文 ","max_len":20,"min_len":2,"isnull":false,caption:"联系人"},
				"u_email":{"datatype":"email","msg_error":"您输入的邮箱格式不正确 ","max_len":40,"min_len":1,"isnull":false,caption:"邮箱"},
				"u_teacher_count":{"datatype":"num1","msg_error":"您输入的格式不正确","max_len":3,"min_len":1,"isnull":false,caption:"数量"},
				"u_branch_count":{"datatype":"num1","msg_error":"您输入的格式不正确","max_len":3,"min_len":1,"isnull":false,caption:"数量"},
		};
		$.fn.ajaxData({url:RD.mainActionUrl + "do?action=institution/institution_info&start=info",data:{institution_id:$("#institution_id").val()}}, function(json){
			var list = json.data.list;
			if(list.length>0){
				var tJson = list[0];
				$("#btn_delete").css("display", "block");
				$("#img_logo_url").attr("path", tJson["logo_url"]);
				$("#logo_url").val(tJson["logo_url"]);
				tJson["home_url"]==""?$("#u_home_url").val(RD.iloveaccUrl+tJson["institution_code"]+".edu"):$("#u_home_url").val(tJson["home_url"]);
				$("#u_institution_name").prop("disabled", false).val(tJson["institution_name"]);
				$("#u_institution_code").prop("disabled", false).val(tJson["institution_code"]);
				$("#u_short_name").val(tJson["short_name"]);
				$("#u_institution_admin_code").prop("disabled", false).html('<option value="'+tJson["admin_code"]+'"  selected>'+tJson["admin_code"]+'</option>');
				$("#u_contacts").val(tJson["contacts"]);
				$("#u_phone").val(tJson["phone"]);
				$("#u_email").val(tJson["email"]);
				tJson["is_exam_institution"]==1?$("#u_is_exam_institution_y").attr('checked',true):$("#u_is_exam_institution_n").attr('checked',true);
				tJson["enable_card_sales"]==1?$("#u_enable_card_sales_y").attr('checked',true):$("#u_enable_card_sales_n").attr('checked',true);
				tJson["enable_page_embedding"]==1?$("#u_enable_page_embedding_y").attr('checked',true):$("#u_enable_page_embedding_n").attr('checked',true);
				$("#u_teacher_count").val(tJson["teacher_count"]);
				$("#u_branch_count").val(tJson["branch_count"]);
				tJson["status"]==1?$("#u_status_y").attr('checked',true):$("#u_status_n").attr('checked',true);
				$("#temp_institution_code").val(tJson["admin_code"]);
				 __def_pro =  tJson["province"];
				 __def_city = tJson["city"];
				 initSelect2();
			}
			
			//加载图片
			NssFileUtil.showLAImage("img");
			$("#u_province").provinces("#u_city",typeof __def_pro ==="undefined"?"":__def_pro,typeof __def_city ==="undefined"?"":__def_city);
			//菜单
		});
	}else{
	  $("#u_province").provinces("#u_city","","");	  
	  		
	  __valid_elements={
				"u_phone":{"datatype":"tel","msg_error":"您输入的联系方式格式不正确","msg_null":"联系方式不能为空","isnull":false},
				"u_institution_name":{"datatype":"companyname","msg_error":"可以填写中文、英文","max_len":100,"min_len":3,"isnull":false,"url": RD.mainActionUrl+"do?action=institution/institution_info&start=institution_name_unique_valid",caption:"名称"},
				"u_institution_admin_code":{"datatype":"username","msg_error":"可以填写中文、英文 ","max_len":20,"min_len":3,caption:"管理员"},
				"u_short_name":{"datatype":"username","msg_error":"可以填写中文、英文","max_len":20,"min_len":1,"isnull":false,caption:"简称"},
				"u_institution_code":{"datatype":"usercode","msg_error":"可以使用的符号有[A-Za-z0-9_]","max_len":20,"min_len":4,"isnull":false,"url":RD.mainActionUrl+"do?action=institution/institution_info&start=institution_code_unique_valid",caption:"编码"},
				"u_home_url":{"datatype":"url","msg_error":"您输入的格式不正确","isnull":false,"url": RD.mainActionUrl+"do?action=institution/institution_info&start=institution_home_url_unique_valid",caption:"URL"},
				"logo_url":{"msg_null":"logo不能为空","isnull":false},
				"u_province":{"datatype":"usercode","msg_null":"省份不能为空","isnull":false},
				"u_city":{"datatype":"usercode","msg_error":"城市不能为空","isnull":false},
				"u_contacts":{"datatype":"realname","msg_error":"可以填写中文、英文 ","max_len":20,"min_len":2,"isnull":false,caption:"联系人"},
				"u_email":{"datatype":"email","msg_error":"您输入的邮箱格式不正确 ","max_len":40,"min_len":1,"isnull":false,caption:"邮箱"},
				"u_teacher_count":{"datatype":"num1","msg_error":"您输入的格式不正确","max_len":3,"min_len":1,"isnull":false,caption:"数量"},
				"u_branch_count":{"datatype":"num1","msg_error":"您输入的格式不正确","max_len":3,"min_len":1,"isnull":false,caption:"数量"},
				
	  };
	  $(document).ready(function() {
		  // formatRepo,formatRepoSelection暂时没有用
		  function formatRepo(repo) {
			    if (repo.loading) return repo.text;

			    var markup = '<div class="clearfix">' +
			    '<div class="col-sm-1">' +
			    '<img src="' + repo.owner.avatar_url + '" style="max-width: 100%" />' +
			    '</div>' +
			    '<div clas="col-sm-10">' +
			    '<div class="clearfix">' +
			    '<div class="col-sm-6">' + repo.full_name + '</div>' +
			    '<div class="col-sm-3"><i class="fa fa-code-fork"></i> ' + repo.forks_count + '</div>' +
			    '<div class="col-sm-2"><i class="fa fa-star"></i> ' + repo.stargazers_count + '</div>' +
			    '</div>';

			    if (repo.description) {
			      markup += '<div>' + repo.description + '</div>';
			    }

			    markup += '</div></div>';

			    return markup;
			  }

	     function formatRepoSelection (repo) {
			    return repo.full_name || repo.text;
		 }  
	     initSelect2();
	 });
	}
	
	function initSelect2(){
	    $("#u_institution_admin_code").select2({
	     	 language: "zh-CN",
	         ajax: {
	             url: RD.mainActionUrl+"do?action=user/my_info&start=search_user",
	             dataType: 'json',
	             delay: 250,
	             data: function (params) {
	             	console.dir(params);
	                  return {
	                     q        : params.term, // search term
	                     page     : params.page || 1,
	                     pageCount: 10
	                   };	
	             },
	             processResults: function (data, params) {
	               // parse the results into the format expected by Select2
	               // since we are using custom formatting functions we do not need to
	               // alter the remote JSON data, except to indicate that infinite
	               // scrolling can be used
	               params.page = data.data.page || 1;
	               return {
	                 results: data.data.list,
	                 pagination: {
	                     more: (params.page * 10) < data.data.total
	                   }
	               };
	             },
	             cache: true
	           },
	           theme: "classic",
	           // escapeMarkup: function (markup) { return markup; },
	           minimumInputLength: 0,
	           maximumSelectionLength: 10
	           // templateResult: formatRepo,
	           // templateSelection: formatRepoSelection
	    });
	}
	
	//表单验证：
	var validSetting = {
		"elements":__valid_elements,
		"ajaxSubmit":{
			url:RD.mainActionUrl+"do?action=institution/institution_info&start="+__start,
			data:function(){
				var  inputData = {},
				     $form     = $("#form"),
				     inputText = $form.find("input[type=text],input[type=hidden],input[type=radio]:checked,input[type=checkbox]:checked,textarea,select");
				for(var i=0;i<inputText.size();i++){
					var ivalue = inputText.eq(i).val();
					inputData[inputText.eq(i).attr("name")] = ivalue;
					if(inputText.eq(i).attr("name") === "u_province") {
						inputData["u_province_name"] = $.get_pro_city_name(ivalue);
					}
					if(inputText.eq(i).attr("name") === "u_city") {
						inputData["u_city_name"] = $.get_pro_city_name(ivalue);
					}
				}
				if(inputData["temp_institution_code"]===""){
					if(inputData["u_institution_admin_code"]!==""){
						//修改状态
						inputData["temp_state"]= 1;
					}else{
						inputData["temp_state"]= 0;
					}
				}else{
					if(inputData["temp_institution_code"]===inputData["u_institution_admin_code"]){
						//不作修改
						inputData["temp_state"]= 0;
					}else{
						//修改状态
						inputData["temp_state"]= 1;
					}
				}
				return inputData;
			},
			success : function(data) {
				if(data.code=="200"){
					layer.msg("操作成功",1,{"type":1},function(){
						$("#error_msg").html("").hide();
						reflush_page();
					});
				}else{
					layer.msg(data.msg===""?"操作失败":data.msg);
				}						
			}
			
		},
		"submitEle":"#institution_submit",
		"changeConfirm":false
	};
	function reflush_page(){
		if("applyadd"===__opt){
			window.location.href=RD.mainUrl+"doView?action=v_mg&start=institution_list";
		}else{
			window.location.href=RD.mainUrl+"doView?action=v_mg&start=institution_list";
		}
	}
    //删除机构
	function delete_status_do(id,status){
		var url= RD.mainActionUrl+"do?action=mg/institution_list&start=update_status";
		$.ajax({
			   type: "POST",
			   dataType: "json",
			   data:{institution_id:id,status:status},
			   url: url,
	           success:function(data){
	        	 if(data.code=="200"){
	               layer.msg('操作成功！', 1,{type:1},function(){
	            	   //$("#error_msg").html("").hide();
	            	   window.location.href=RD.mainUrl+"doView?action=v_mg&start=institution_list";
	            	  // layer.closeAll();
	            	   //$(".paginate").find(".active")[0].click();
	               });
	             }else{
	               layer.msg("操作失败");	 
	             }
	           }
	     });
    }
	//上传文件
	$("#form").on("change","input:file",function(){
		_99Plugin.bindUploadImg(this);
	});	
	$("#btn_return").on("click",function(){
		reflush_page();
	});
	$("#btn_delete").on("click",function(){
		layer.confirm("您确定要删除吗？", function () {
			delete_status_do($("#institution_id").val(),"2");
        });
	});
	$("#u_institution_code").blur(function(){
		var home_url=RD.iloveaccUrl+$("#u_institution_code").val()+".edu";
		$("#u_home_url").val(home_url);
	});

	
	$("#form")._99formvalid(validSetting);
})();
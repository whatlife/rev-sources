/*
                        <li class="movieIndexMenuItem movieIndexMenuItemShare wgt-share" name="share_list" >分享到:</li>
						<li class="movieIndexMenuItem" name="share" data-type="tqzone">
							<a class="moviePlayMenuItemLink icon-share share-qzone" href="javascript:void(0)">
							</a>
						</li>
						<li class="movieIndexMenuItem" name="share" data-type="tqqfriend">
							<a class="moviePlayMenuItemLink icon-share share-qq" href="javascript:void(0)">
							</a>
						</li>
						<li class="movieIndexMenuItem" name="share" data-type="tsina">
							<a class="moviePlayMenuItemLink icon-share share-weibo" href="javascript:void(0)">
							</a>
						</li>
						<li class="movieIndexMenuItem movieShareWeixin" name="share_weixin" data-type="weixin" >
							<a class="moviePlayMenuItemLink icon-share share-weixin" style="display:block;">
							</a>
							<div id="myWeixinImg" class="shareWeixinImg"></div>
							<img id="img-buffer" style="display:none;" src="http://cdn01.yoya.com/res_movie/static/images/share_yoya_logo.jpg" />
						</li>
						<li class="movieIndexMenuItem wgt-share-qqweibo" name="share" data-type="tqq">
							<a class="moviePlayMenuItemLink icon-share share-qqweibo" style="display:block;" href="javascript:void(0)">
							</a>
						</li>
 */

function copyDo(data,type){
	   if(type=='1'){
		   $('#publicShareAddress').val(getPublicUrl(data.share_id));
		   copyUrl($('#copy_href'),data.share_id);
	   }else{
		   $('#privateShareAddress').html(data.pv_url);
		   $('#pwd_href').html(data.pv_pwd);
		   copyPrivateUrl($('#copy_private_href'),data.pv_url,data.pv_pwd);
	   }
}

var getPrivateAllUrl = function(pv_url,pv_pwd){
	return "链接:"+pv_url+" 密码:"+pv_pwd;
}
var copyPrivateUrl= function(clcikOb,pv_url,pv_pwd){
	clcikOb.zclip({ 
	        path: zeroClipboardPath?zeroClipboardPath:RD.zykUrl+'cdn/static/javascript/ZeroClipboard.swf', 
	        copy:getPrivateAllUrl(pv_url,pv_pwd),
	        afterCopy:function(){
	        	layer.msg('复制成功！', 2,{type:1,"shade":false});
	        }
	});
}




$(document).ready(function(){
		if(type=='mobile'){	
		getSpAuthor($("#movie_title").attr("data-user_id"));	
		
		var tempIframe = document.getElementById("tempIframe");
		tempIframe.src = src_movie;
		}
		
		 var $list = $("#list");	
		 var id=$list.attr("data-id");
		 var isPublic=$list.attr("data-public");
		 var data;
		
		 getCollectproperty(id);
	
		 if(isPublic=='1'){
			 data={"share_id":id,"page":1,"pageCount":10};
			 share();	
		 }else{
			 data={"ref_id":id,"page":1,"pageCount":10};
			 if(type=='pc'){
			     $("li[name^=share]").hide();
			 }else{
				 $("a[name^=share]").hide();
			}
		 }
		//是否已经点过
		var isPra = $.cookie("praise_"+id);
		if(isPra=='1'){//改变样式
			$("#praise_a").css("cursor","default");
			 if(type=='pc'){
			    $("#praise_a").find("i").removeClass("icon-rate").addClass("rd");
			 }else{
				 $("#praise_a").addClass('active');
			 }
		}
		
		//点赞
		 $('#praise_a').click(function(){
			 $(this).css("cursor","default");
			 if(type=='pc'){
			    $(this).find("i").addClass("rd");
			 }else{
				 $("#praise_a").addClass('active');
			 }
			 praise(id);
		 });
	
		 EJS.config( {cache: true, type: '['} );
	 
	    //相关互动电影
       $.ajax({
			url:RD.zykUrl+"do?action=public_all&start=getShareMoviesByRefIdAndClassifyId",
			async:true,
		    dataType:"jsonp",
		    data:data,
			success: function(d){
				if(d.code == 200){
				    var list_ejs = document.getElementById("list_ejs").innerHTML;
				    var html = new EJS({text:list_ejs}).render(d.data);
				    if(type=='mobile'){
				    	$list.append(html);
				    }else{
					    $list.html(html);
					    var div=document.getElementById("list");  
					    $('.scroll-pane').jScrollPane();
				    }
				   	loadImgInfo();
				}
		   }
		});

//生成二维码
var url = $(".moviePlayer").attr("data-purl");
if(typeof(is_me) != "undefined"&&is_me=="true"){
	url=url+"&is_me=true";
}
url=url.replace('/bs','/s');
//pc
$("li[name=share_weixin]").live("click", function(){
	createCode($('#myWeixinImg'),url);
});
$("li[name=movieShareWeixin]").live("click", function(){
	createCode($('#myWeixinImg1'),url);
});
//mobile
$("a[name=share_weixin]").live("click", function(){
	createCode('',url);
});
});


//竖屏当前播放电影作者
function getSpAuthor(user_id){
	$.ajax({
		url:RD.hddyUrl+"do?action=public_all&start=getOnlyOneNickName&user_id="+user_id,
		async:false,
	    dataType:"json",
		success: function(d){
			if(d.code == 200){
				if(d.data[0].nick_name!=""){
                   $("#sp_author").html('作者：'+d.data[0].nick_name);
				}else{
				   $("#sp_author").html('作者：'+d.data[0].user_code);
				}
			}
	 }
	});
}

//初始化收藏字段
function getCollectproperty(rel_id){
  $.ajax({
		url:RD.mainActionUrl + "do?action=api/favorite&start=is_favorite",
		data:{rel_id:rel_id,project_code:'99cj_hddy'},
		async:false,
		dataType:'jsonp',
		success:function(data){
			if(data.code==200){
				if(type=="pc"){
					$("#cl").find("i").removeClass("icon-favor").addClass("fd");
				}else{
					$("#sccolor").addClass('active');
				}
			   $("#sc").html('取消收藏');	
			}
			else{
				if(type=="pc"){
					$("#cl").find("i").addClass("icon-favor").removeClass("fd");
				}else{
					$("#sccolor").removeClass('active');
				}
				$("#sc").html('收藏');
			}
		},
		error:function(){
			//alert("获取数据出错!");
		}
	});
}
 
var share = function(){
	var url,title,picShare;
	var shareTitle = $('#movie_title').attr('title');
	url='';
    title = "优芽网互动电影「" + shareTitle + "」";
    picShare = hddyCdnImageUrl+"/share_show.jpg";
    picMovieSmall = imgUrl; //hddyCdnImageUrl+"/qzone.png";
    //picShare="http://ww4.sinaimg.cn/thumbnail/45c236a8gw1ertegloupdj20qa0czdjj.jpg"
	var share = { tsina:{
        url : url,
        title: title,
        pic: picShare+"||"+picMovieSmall
    },
    tqq:{
        url : url,
        title: title,
        pic: encodeURIComponent(picShare)+"|"+encodeURIComponent(picMovieSmall) 
    },
    tqzone:{
        url : url,
        title: title,            
        pic: encodeURIComponent(picShare)+"|"+encodeURIComponent(picMovieSmall),
        summary:"优芽互动电影，轻松做动画，让知识传递简单有趣",
        desc:"优芽互动电影，轻松做动画，让知识传递简单有趣"
    },
    tqqfriend:{
        url : url,
        title: title,            
        pic: picMovieSmall,
        summary:"优芽互动电影，轻松做动画，让知识传递简单有趣",
        desc: "优芽互动电影，轻松做动画，让知识传递简单有趣"
    }
    };

	
	//pc
	$("li[name=share]").live("click",function(){
		var url = $(".moviePlayer").attr("data-purl");
		url = url.replace("/bs", "/s");
        var type=$(this).attr("data-type");
        share[type].url=url;
        $("body").snsShare(share,type);
    });
	
	//mobile
	$("a[name=share]").live("click",function(){
		var url = $(".moviePlayer").attr("data-purl");
		url = url.replace("/bs", "/s");
        var type=$(this).attr("data-type");
        share[type].url=url;
        $("body").snsShare(share,type);
    });
	   
}
/**
 * 点赞 不管结果返回 直接+1
 */
function praise(share_id){
	//是否已经点过
	var isPra = $.cookie("praise_"+share_id);
	if(isPra=='1'){
		return;
	}
	$.ajax({
		url:RD.hddyUrl+"do?action=public_all&start=praise",
		async:true,
	    data:{share_id:share_id},
		success: function(d){
	 }
	});
	var praise_num = $('#praise_num').html();
	if(praise_num==null||praise_num==''){
		 $('#praise_num').html('1');
	}else if(praise_num.indexOf('万')!=-1){//万的不增加显示
		
	}else{
		 $('#praise_num').html((parseInt(praise_num)+1));
	}
	//写入cookie 当前cookie只能有一次点赞
	$.cookie("praise_"+share_id, '1');
}
 /**
 ** 加载所有的缩略图文件
 **/
 function loadImgInfo(){
 	var imgs = $(".movieListImg");
 	var fromak = "99cj_movie";
 	NssFileUtil.showRAImageBatch($('.movieListImg'))
// 	imgs.each(function(){
// 		$(this).attr("src",NssFileUtil.getRAFileUrl($(this).attr("data-path")+"/icon.jpg",fromak));
// 	});
 }
 
 
 function addMovie(){
	 window.open(RD.hddyUrl+'add');
	 return;
}
 
 //二维码
 var createCode = function($obj,nr){
//	 	var options = {
//				render: 'canvas',//渲染模式
//				ecLevel: 'H',//误差校正水平
//				background:'#ffffff',
//				minVersion: 6,
//				text: url,
//				size: 200,//尺寸
//				mode: 4,
//				mSize: 25 * 0.01,
//				image: $("#img-buffer")[0]
//			};

		var options = {  
		        render: 'canvas',//设置渲染方式canvas/table  
		        ecLevel: 'H',//误差校正水平
		        background: '#FFF',  
		        text: nr,//设置二维码内容  
		    	size: 200,//尺寸
				mode: 4,
				image: $("#img-buffer")[0],
				mSize: 25 * 0.01,
		        background:'#ffffff',
				minVersion: 6 
		    }; 
    	var weixin_config = {
    			title:"扫一扫 手机看",
    			close:true,
    			css:{"width":"300px"},
    			html:$('<div style="width:200px"></div>').qrcode(options),
    			btn:[]
    	};
    	_99Plugin.layer(weixin_config);   	
		//$obj.empty().qrcode(options);  
			  
	}
 
 
 //收藏
 function collect(){
	 var _url = $(".moviePlayer").attr("data-purl");
	     _url = _url.replace("/bs", "/s");
	     var index = _url.indexOf("/s");
	     var url = _url.substring(parseInt(index)+1);
	 var rel_id = $("#list").attr("data-id");
	 var favorite_name = $("#movie_title").attr("title");
	 var img_url = $("#movie_title").attr("data-img_url");
	 if($("#sc").html()=='收藏'){
	 _99Plugin.ajax({
			url:RD.hddyActionUrl + "do?action=public_all&start=collect",
			data:{rel_id:rel_id,favorite_name:favorite_name,url:url,img_url:img_url},
			async:false,
			success:function(data){
				if(data.code==200){
					$("#sc").html('取消收藏');
					if(type=="pc"){
						$("#cl").find("i").removeClass("icon-favor").addClass("fd");
					}else{
						 $("#sccolor").addClass('active');
					 }
				}
				else{					
					for(var name in data.data){ 
						if(name=='nologin'){
							 //window.open(RD.hddyUrl+'sc?argUrl='+url);
							 window.location.href=RD.mainUrl+"doView?action=v_public&start=login_go&redirecturl="+encodeURIComponent(_url); 
							 return;
						}
						else{
					       alert(data.data[name]); 
						}
					   } 
					}
			},
			error:function(){
				alert("收藏出错!");
			}
		});
	 }
	 else{	 
		 $.ajax({
				url:RD.mainActionUrl + "do?action=api/favorite&start=del_favorite",
				data:{rel_id:rel_id,project_code:'99cj_hddy'},
				async:false,
				dataType:'jsonp',
				success:function(data){
					$("#sc").html('收藏');
					if(type=="pc"){
						$("#cl").find("i").addClass("icon-favor").removeClass("fd");
					}else{
						$("#sccolor").removeClass('active');
					}
				},
				error:function(){
					alert("取消收藏出错!");
				}
			});
	 }
	 
 }

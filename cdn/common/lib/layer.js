/**
 * 弹出层
 */
;(function($,win){
	if(!win._99Plugin){
		win._99Plugin = {};
	}
	var defaultConfig = {
		title:"标题",
		close:true,
		css:{},
		html:"",
		btn:[{title:"确定",css:"btn-primary",fun:function(){}},
		     {title:"取消",css:"",fun:function(e,index){_99Plugin.layerClose(index);}}
		],
		callback:function(e,btns){}//e为整个弹出层对象,btns为与上面btn对应的dom对象
	};
	win._99PluginLayerMaxIndex = 0;
	win._99Plugin.layer = layer;
	var doms = ["_99plugin_layer","_99plugin_layer_bg"];
	
	function layer(config){
		config = $.extend({},defaultConfig,config);
		var index = (_99PluginLayerMaxIndex=_99PluginLayerMaxIndex+1) ;
		var z_index = 2010114+index*10;
		//1、生成弹出层的html
		var layerTemp = ['<div id="'+doms[0]+'" class="'+doms[0]+' _99layer_'+index+'" layIndex="'+index+'" style="z-index:'+(z_index+1)+'"><div class="tips-bd"></div><div class="tips-hd"><span>'+config.title+'</span>'+(config.close?'<a href="javascript:;" id="btn-close" layIndex="'+index+'" class="modal-close btn-close" title="关闭">×</a>':'')+'</div><div class="tips-tool"></div></div>',
		                 '<div id="'+doms[1]+'" class="'+doms[1]+' _99layer_bg_'+index+'" style="z-index:'+z_index+'"></div>'];
		var layerObj = $(layerTemp[0]);
		
		//绑定各个按钮事件
		var btnFun = function(a,b){
			return function(c){
				b(c,a);
			}
		};
		var btns = [],tool = layerObj.find(".tips-tool");
		for(var i=0;config.btn[i];i=i+1){//确定、取消按钮
			var btn = $('<a href="javascript:;" id="_99layer_btn_'+index+'_'+i+'" title="'+config.btn[i].title+'" class="btn '+config.btn[i].css+'">'+config.btn[i].title+'</a>');
			typeof config.btn[i].fun ==="function" && btn.bind("click",btnFun(index,config.btn[i].fun));
			tool.append(btn);
			btns.push('_99layer_btn_'+index+'_'+i);
		}	
		if(config.dom){
			layerObj.attr("data-is_warp","1");
			$(config.dom).addClass("_99layer_content").show().wrap(layerObj);
		}else{
			layerObj.find(".tips-bd").html(config.html);
			$("body").append(layerObj);
		}
		$("body").append(layerTemp[1]);
		(function(i,c){
			$("#"+doms[0]).find(".btn-close").bind("click",function(){
				if(typeof c.beforeClose==="function" && !c.beforeClose())return false;
				_99Plugin.layerClose(i);
				if(typeof c.afterClose==="function")c.afterClose();
			});
		})(index,config)
		
		
		//2、弹出层样式
		var tips = $('#'+doms[0]+'._99layer_'+index);
		tips.css(config.css);
			
		if(!config.css["top"]){
			var top = getScrollTop() + $(window).height()/2 - tips.height()/2;
			tips.css({"top":top+"px"});
		}
		if(!config.css["left"]){
			var left = $(window).width()/2 - tips.width()/2;
			tips.css({"left":left+"px"});
		}
		if(typeof config.callback==="function"){
			for(var i=0;btns[i];i=i+1){
				btns[i] = tips.find("#"+btns[i])[0]
			}
			config.callback(tips[0],btns);
		}
	}
	win._99Plugin.layerClose = (function(doms){
		return function layerClose(index){
			$('#'+doms[0] + (typeof index ==="number"?'._99layer_'+index:'.'+doms[0])).each(function(){
				index = $(this).attr("layIndex");
				if($(this).attr("data-is_warp")==="1"){
					$(this).find(".tips-hd,.tips-tool").remove();
					$(this).find('._99layer_content').removeClass("_99layer_content").unwrap().unwrap().hide();
				}else{
					$(this).remove()
				}
				$('#'+doms[1]+'._99layer_bg_'+index).remove();
			});
		}
	})(doms);
	
	function getScrollTop()
	{
	    var scrollTop=0;
	    if(document.documentElement&&document.documentElement.scrollTop)
	    {
	        scrollTop=document.documentElement.scrollTop;
	    }
	    else if(document.body)
	    {
	        scrollTop=document.body.scrollTop;
	    }
	    return scrollTop;
	}
})(jQuery,window);
EJS.Helpers.prototype.date_tag = function(name, value , html_options) {
    if(! (value instanceof Date))
		value = new Date()
	
	var month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var years = [], months = [], days =[];
	var year = value.getFullYear();
	var month = value.getMonth();
	var day = value.getDate();
	for(var y = year - 15; y < year+15 ; y++)
	{
		years.push({value: y, text: y})
	}
	for(var m = 0; m < 12; m++)
	{
		months.push({value: (m), text: month_names[m]})
	}
	for(var d = 0; d < 31; d++)
	{
		days.push({value: (d+1), text: (d+1)})
	}
	var year_select = this.select_tag(name+'[year]', year, years, {id: name+'[year]'} )
	var month_select = this.select_tag(name+'[month]', month, months, {id: name+'[month]'})
	var day_select = this.select_tag(name+'[day]', day, days, {id: name+'[day]'})
	
    return year_select+month_select+day_select;
}

EJS.Helpers.prototype.form_tag = function(action, html_options) {
                 
    
    html_options     = html_options                     || {};
	html_options.action = action
    if(html_options.multipart == true) {
        html_options.method = 'post';
        html_options.enctype = 'multipart/form-data';
    }
    
    return this.start_tag_for('form', html_options)
}

EJS.Helpers.prototype.form_tag_end = function() { return this.tag_end('form'); }

EJS.Helpers.prototype.hidden_field_tag   = function(name, value, html_options) { 
    return this.input_field_tag(name, value, 'hidden', html_options); 
}

EJS.Helpers.prototype.input_field_tag = function(name, value , inputType, html_options) {
    
    html_options = html_options || {};
    html_options.id  = html_options.id  || name;
    html_options.value = value || '';
    html_options.type = inputType || 'text';
    html_options.name = name;
    
    return this.single_tag_for('input', html_options)
}

EJS.Helpers.prototype.is_current_page = function(url) {
	return (window.location.href == url || window.location.pathname == url ? true : false);
}

EJS.Helpers.prototype.link_to = function(name, url, html_options) {
    if(!name) var name = 'null';
    if(!html_options) var html_options = {}
	
	if(html_options.confirm){
		html_options.onclick = 
		" var ret_confirm = confirm(\""+html_options.confirm+"\"); if(!ret_confirm){ return false;} "
		html_options.confirm = null;
	}
    html_options.href=url
    return this.start_tag_for('a', html_options)+name+ this.tag_end('a');
}

EJS.Helpers.prototype.submit_link_to = function(name, url, html_options){
	if(!name) var name = 'null';
    if(!html_options) var html_options = {}
    html_options.onclick = html_options.onclick  || '' ;
	
	if(html_options.confirm){
		html_options.onclick = 
		" var ret_confirm = confirm(\""+html_options.confirm+"\"); if(!ret_confirm){ return false;} "
		html_options.confirm = null;
	}
	
    html_options.value = name;
	html_options.type = 'submit'
    html_options.onclick=html_options.onclick+
		(url ? this.url_for(url) : '')+'return false;';
    //html_options.href='#'+(options ? Routes.url_for(options) : '')
	return this.start_tag_for('input', html_options)
}

EJS.Helpers.prototype.link_to_if = function(condition, name, url, html_options, post, block) {
	return this.link_to_unless((condition == false), name, url, html_options, post, block);
}

EJS.Helpers.prototype.link_to_unless = function(condition, name, url, html_options, block) {
	html_options = html_options || {};
	if(condition) {
		if(block && typeof block == 'function') {
			return block(name, url, html_options, block);
		} else {
			return name;
		}
	} else
		return this.link_to(name, url, html_options);
}

EJS.Helpers.prototype.link_to_unless_current = function(name, url, html_options, block) {
	html_options = html_options || {};
	return this.link_to_unless(this.is_current_page(url), name, url, html_options, block)
}


EJS.Helpers.prototype.password_field_tag = function(name, value, html_options) { return this.input_field_tag(name, value, 'password', html_options); }

EJS.Helpers.prototype.select_tag = function(name, value, choices, html_options) {     
    html_options = html_options || {};
    html_options.id  = html_options.id  || name;
    html_options.value = value;
	html_options.name = name;
    
    var txt = ''
    txt += this.start_tag_for('select', html_options)
    
    for(var i = 0; i < choices.length; i++)
    {
        var choice = choices[i];
        var optionOptions = {value: choice.value}
        if(choice.value == value)
            optionOptions.selected ='selected'
        txt += this.start_tag_for('option', optionOptions )+choice.text+this.tag_end('option')
    }
    txt += this.tag_end('select');
    return txt;
}

EJS.Helpers.prototype.single_tag_for = function(tag, html_options) { return this.tag(tag, html_options, '/>');}

EJS.Helpers.prototype.start_tag_for = function(tag, html_options)  { return this.tag(tag, html_options); }

EJS.Helpers.prototype.submit_tag = function(name, html_options) {  
    html_options = html_options || {};
    //html_options.name  = html_options.id  || 'commit';
    html_options.type = html_options.type  || 'submit';
    html_options.value = name || 'Submit';
    return this.single_tag_for('input', html_options);
}

EJS.Helpers.prototype.tag = function(tag, html_options, end) {
    if(!end) var end = '>'
    var txt = ' '
    for(var attr in html_options) { 
	   if(html_options[attr] != null)
        var value = html_options[attr].toString();
       else
        var value=''
       if(attr == "Class") // special case because "class" is a reserved word in IE
        attr = "class";
       if( value.indexOf("'") != -1 )
            txt += attr+'=\"'+value+'\" ' 
       else
            txt += attr+"='"+value+"' " 
    }
    return '<'+tag+txt+end;
}

EJS.Helpers.prototype.tag_end = function(tag)             { return '</'+tag+'>'; }

EJS.Helpers.prototype.text_area_tag = function(name, value, html_options) { 
    html_options = html_options || {};
    html_options.id  = html_options.id  || name;
    html_options.name  = html_options.name  || name;
	value = value || ''
    if(html_options.size) {
        html_options.cols = html_options.size.split('x')[0]
        html_options.rows = html_options.size.split('x')[1];
        delete html_options.size
    }
    
    html_options.cols = html_options.cols  || 50;
    html_options.rows = html_options.rows  || 4;
    
    return  this.start_tag_for('textarea', html_options)+value+this.tag_end('textarea')
}
EJS.Helpers.prototype.text_tag = EJS.Helpers.prototype.text_area_tag

EJS.Helpers.prototype.text_field_tag     = function(name, value, html_options) { return this.input_field_tag(name, value, 'text', html_options); }

EJS.Helpers.prototype.url_for = function(url) {
        return 'window.location="'+url+'";'
}
EJS.Helpers.prototype.img_tag = function(image_location, alt, options){
	options = options || {};
	options.src = image_location
	options.alt = alt
	return this.single_tag_for('img', options)
}
EJS.Helpers.prototype.dateformat = function(date,format){
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

EJS.Helpers.prototype.subword = function(data, num){
	if(data && data.length>0){
		if(num<data.length){
			return data.substring(0,(num-5))+"..."
		}
		return data;
	}
}

EJS.Helpers.prototype.pagingFun = function(total, page, pageCount, pageFun){
	
	var page = page || 1;
	var pageFun = pageFun || "getList";
	
	page = parseInt(page,10);
	
	var nextpage = parseInt(page,10) + 1;
	var prepage = parseInt(page,10) - 1;
	
	var lastpage = Math.ceil(parseInt(total,10)/parseInt(pageCount,10));
	
	var info = "第"+page+"页/共"+lastpage+"页&nbsp;&nbsp;&nbsp;共"+total+"行/每页"+pageCount+"行";
	
	var link1 = "[首页]&nbsp;[前一页]&nbsp;";
	
	if(page>1){
		link1 = "<a href=\"javascript:"+pageFun+"("+"1"+","+"'"+pageFun+"'"+")\">[首页]&nbsp;</a>";
		link1 +="<a href=\"javascript:"+pageFun+"("+prepage+","+"'"+pageFun+"'"+")\">[前一页]&nbsp;</a>";
	}
	
	var link2 ="[后一页]&nbsp;[尾页]&nbsp;";
	
	if(lastpage>1 && lastpage>page){
		link2 = "<a href=\"javascript:"+pageFun+"("+nextpage+","+"'"+pageFun+"'"+")\">[后一页]&nbsp;</a>";
		link2 += "<a href=\"javascript:"+pageFun+"("+lastpage+","+"'"+pageFun+"'"+")\">[尾页]&nbsp;</a>";
		
	}
	
	var selectEl = "<select onchange=\""+pageFun+"(this.value,"+"'"+pageFun+"'"+")\">";
	for(var i=1; i<=lastpage; i++){
		var selectFlag = "";
		if(page==i) selectFlag = "selected";
		selectEl += "<option "+selectFlag+" value=\""+i+"\">第"+i+"页</option>";
	}
	selectEl += "</select>";
	
	return info+"&nbsp;&nbsp;&nbsp;"+link1+link2+selectEl;
}

EJS.Helpers.prototype.pagination = function(total, page, pageCount, pageFun){
	
	var page = page || 1;
	var pageFun = pageFun || "getList";
	page = parseInt(page,10);
	var lastpage = Math.ceil(parseInt(total,10)/parseInt(pageCount,10));
	page>lastpage && (page=lastpage);
	
	var getShowPage = function (curPage,totalPage){
		var pageArr = [],start=0;
		if(curPage<=4)
			start = 1;
		else if(totalPage-curPage<3)
			start = (totalPage-6)>0?(totalPage-6):1;
		else
			start = curPage-3;
		for(var i=0;i<7;i++){
			if((start+i)<=totalPage)
				pageArr.push(start+i);
			else break;
		}
		return pageArr;
	}
	var links = "";
	function addLink(str,page,cssclass){
		links = links + '<a href="javascript:'+pageFun+'('+page+',\''+pageFun+'\')" class="'+(cssclass || "")+'">'+str+'</a>';
	}

	var pages = getShowPage(page,lastpage);
	if(page!=1){
		addLink("首页",1,"first");
		addLink("&lt;&lt;",page-1,"prev");
	}
	for(var i=0;i<pages.length;i++){
		addLink(pages[i],pages[i],pages[i]==page?"active":"");
	}
	if(page!=lastpage){
		addLink("&gt;&gt;",page-(-1),"next");
		addLink("尾页 ",lastpage,"first");
	}
	var counter = '<span class="lastpage">共'+lastpage+'页，</span><span class="pageCount">每页'+pageCount+'行，</span><span>到第</span>\
				    <input name="_pagination_index" id="_pagination_index" value="'+page+'" type="text" class="shuru">\
				    <span>页</span> \
				    <a class="qund" href="javascript:void(0);" onclick="var curpage = document.getElementById(\'_pagination_index\') ;var page=curpage.value;if(isNaN(page) || parseInt(page,10)!=page || parseInt(page,10)<=0){alert(\'页码只能是正整数\');curpage.value=\''+page+'\';}else{page = page>'+lastpage+'?'+lastpage+':page;'+pageFun+'(page,\''+pageFun+'\');}">确定</a>';
	
	return '<div class="paginate" data-total="'+total+'" data-pageCount="'+pageCount+'">'+links+counter+'</div>';
}
EJS.Helpers.prototype.escapeHTML = function (text) {  
	var replacements =  {"<": "&lt;", ">": "&gt;","&": "&amp;", "\"": "&quot;"};
	return text.replace(/[<>&"]/g, function(character) {  
	return replacements[character];  
	    }); 
	}
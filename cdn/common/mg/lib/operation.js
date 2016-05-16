/*
***************************copy right of netinnet.cn ***************************
                           ver 20050826
*/
/*将listBox_a中选中的记录移到listBox_b*/
function moveSelected(listbox_a,listbox_b)  
{ //test in win ie6 ok 
   for(var i=listbox_a.options.length - 1; i>=0; i--)  
   {
     if(listbox_a.options[i].selected && listbox_a.options[i].value != "")  
	 {
        var v_row = new Option();
        v_row.value = listbox_a.options[i].value
        v_row.text = listbox_a.options[i].text
        listbox_b.options[listbox_b.options.length] = v_row;
        listbox_a.options[i] = null;
     }
   }
   //BumpUp(fbox);
   //SortD(tbox);
}
/*清除listbox 中 value="" 的行 */
function clearNullValueRow(box)  
{//test in win ie6 ok 
   var temp_opts = new Array();
   var v_count=0;
   for(var i=0; i<box.options.length; i++)  
   { //将非空的options缓存到 temp_opts数组
      if(box.options[i].value == ""  ) continue;  
      temp_opts[v_count] = box.options[i];
      v_count++;
   }
   for(var i=box.options.length-1;i>=0; i--)  
      box.options[i]=null;  
   for(var i=0;i<v_count; i++)
      box.options[i]=temp_opts[i];
 }
/*根据option.text 对listbox 进行排序 */
function sortByText(arg_listbox)  
{//test in win ie6 ok
  var temp_opts = new Array()
  var temp = new Object()
  for(var i=0; i<arg_listbox.options.length; i++)  
     temp_opts[i] = arg_listbox.options[i]
  //冒泡法排序
  for(var x=0; x<temp_opts.length-1; x++)  
  {
    for(var y=(x+1); y<temp_opts.length; y++)  
    {
      if(temp_opts[x].text > temp_opts[y].text)  
      {
        temp_text = temp_opts[x].text;
		    temp_value= temp_opts[x].value;
        temp_opts[x].text = temp_opts[y].text;
		    temp_opts[x].value = temp_opts[y].value;
        temp_opts[y].text = temp_text;
		    temp_opts[y].value = temp_value;
      }
    }
  }
  for(var i=0; i<arg_listbox.options.length; i++)  
  {
     arg_listbox.options[i].value = temp_opts[i].value
     arg_listbox.options[i].text  = temp_opts[i].text
  }
}
/*选中 listbox中所有行*/
function selectAll(arg_listBox)
{//test in win ie6 ok
    for(var i=0; i<arg_listBox.options.length; i++)
        arg_listBox.options[i].selected = true;
}
/*取消 listbox中所有已选中的行 */
function unSelectAll(arg_listBox)
{//test in win ie6 ok
    for(var i=0; i<arg_listBox.options.length; i++)
        arg_listBox.options[i].selected = false;
}
/*获取第一条选中记录的 options.text 值*/
function getFirstSelectedValue(arg_listbox)
{//test in win ie6 ok 
	var v_ret="";
	for(var i=0;i<arg_listbox.options.length;i++)
	{
		if(arg_listbox.options[i].selected)
		{
			v_ret=arg_listbox.options[i].value;
      return v_ret;
		}
	}
	return "";
}
/*获取第一条选中记录的 options.value 值*/
function getFirstSelectedText(arg_listbox)
{//test in win ie6 ok 
	var v_ret="";
	for(var i=0;i<arg_listbox.options.length;i++)
	{
		if(arg_listbox.options[i].selected)
		{
			v_ret=arg_listbox.options[i].text;
      return v_ret;
		}
	}
	return "";
}
/*增加一条记录并选中*/
function addOneOption(listbox,value,text)
{//test in win ie6 ok 
	  var v_o = new Option();
    v_o.value =value;
    v_o.text = text;
	  v_o.selected=true;
    listbox.options[listbox.options.length] = v_o;
}

/*删除listbox 中 某value 值的所有行(一次可能多行) */
function dropByValue(listbox,val)
{//test in win ie6 ok 
	var ops = 0;
	var flag = false;
	for(var i=listbox.options.length-1;i>=0;i--)
	{
		if(listbox.options[i].value == val)
	   {
			ops = i;
			flag = true;
			listbox.options[i]=null;
		}
	}
	if((flag)&(ops<listbox.options.length))
	{
		listbox.options[ops].selected = true;
	}
}
/*删除listbox 中 某text 值的所有行(一次可能多行) */
function dropByText(listbox,arg_text)
{
	var ops = 0;
	var flag = false;
	for(var i=listbox.options.length-1;i>=0;i--)
	{
		if(listbox.options[i].text == arg_text)
	   {
			ops = i;
			flag = true;
			listbox.options[i]=null;
		}
	}
	if((flag)&(ops<listbox.options.length))
	{
		listbox.options[ops].selected = true;
	}
}


/*删除 listbox 中所有的 options */
function deleteAllOption(listbox)
{ //test in win ie6 ok 
	for(var i=listbox.options.length-1;i>=0;i--)
	{
		listbox.options[i]=null;
	}
}
function hasValue(arg_listbox,arg_value)
{ //test in win ie6 ok 
	for(var i=0;i<arg_listbox.options.length;i++)
    if (arg_listbox.options[i].value==arg_value) return true;
  return false;
}
function hasText(arg_listbox,arg_text)
{ //test in win ie6 ok 
	for(var i=0;i<arg_listbox.options.length;i++)
    if (arg_listbox.options[i].text==arg_text) return true;
  return false;
}
/*根据值选中某行，其他行取消选中 */
function selectRow(listbox,arg_value)
{ //test ok in win ie6 ok 
	for(var i=0;i<listbox.options.length;i++)
	{
		if(listbox.options[i].value == arg_value)
			listbox.options[i].selected = true;
    else
			listbox.options[i].selected = false;
	}
}
/*删除listbox 中value 复复的行 */
function dropIterance(listbox)
{ //test in win ie6 ok 
	var len1=listbox.options.length;
	for(var i=0;i<len1;i++)
	{
		var value=listbox.options[i].value;
		for(var j=i+1;j<len1;)
		{
			if(listbox.options[j].value==value)
			{
				listbox.options[j]=null;
				len1--;
			}
			else
			{
				j++;
			}
		}
	}
}
/*删除listbox_drop 中的行（该行的值包括在listbox_compare中）*/
function dropRowsInOtherListbox(listbox_drop,listbox_compare)
{//test in win ie6 ok 
	if(!listbox_compare) return;
	if(!listbox_drop) return;
	var len1 = listbox_compare.options.length;
	var len2 = listbox_drop.options.length;
	var val1;
	var val2;
	for(var i=0;i<len1;i++){
		val1 = listbox_compare.options[i].value;
		for(var j=0;j<len2;){
			val2 = listbox_drop.options[j].value;
			if(val1 == val2){
				listbox_drop.options[j] = null;
				len2 --;
			}
			else{
				j++;
			}
		}
	}
}

/*将所有value为指定值的记录行的text 置成新值 
  同时选中这些行
*/
function modifyOptionByValue(listbox,value,text)
{
	for(var i=listbox.length-1;i>=0;i--)
	{
		if(listbox.options[i].value == value)
    {
			listbox.options[i].text = text;
			listbox.options[i].selected = true;
		}
    else
      	listbox.options[i].selected = false;
	}
}
/*将所有text为指定值的记录行的value 置成新值 
  同时选中这些行
*/
function modifyOptionByValue(listbox,value,text)
{
	for(var i=listbox.length-1;i>=0;i--)
	{
		if(listbox.options[i].value == value)
    {
			listbox.options[i].text = text;
			listbox.options[i].selected = true;
		}
    else
      	listbox.options[i].selected = false;
	}
}

//=====================以下为 checkbox 处理函数==================================

/*将所有 名字为 指定名 的checkbox 全部选中(checked) */
function selectedAllCheckBox(arg_chkboxname)
{
	//var inputbox = document.all.tags("input");  //谷歌浏览器复选框不能全选
	var inputbox = document.getElementsByTagName("input");
	for(var i=0;i<inputbox.length;i++)
  {
		var chkbox = inputbox[i];
		if((chkbox.type == "checkbox")&&(chkbox.name == arg_chkboxname))
    {
    		if(chkbox.disabled) continue;
			chkbox.checked = true;
		}
	}//for
}
/*将所有 名字为 指定名 的checkbox 全部置为未选中(checked=false) */
function deselectAllCheckBox(arg_chkboxname)
{
	//var inputbox = document.all.tags("input"); //谷歌浏览器复选框不能全部置为未选中
	var inputbox = document.getElementsByTagName("input");
	for(var i=0;i<inputbox.length;i++)
  {
		var chkbox = inputbox[i];
		if((chkbox.type == "checkbox")&&(chkbox.name == arg_chkboxname))
    {
    		if(chkbox.disabled) continue;
			chkbox.checked = false;
		}
	}//for
}
/*返回 取某名 的checkbox 且被选中的 个数*/
function checkboxCount(arg_chkboxname)
{
	var v_count=0;    
	inputbox=document.all.tags("input"); 
	for(var i=0;i<inputbox.length;i++)
	{
		var chkbox = inputbox[i];
		if((chkbox.type == "checkbox")&&(chkbox.name == arg_chkboxname))
		{
			if(chkbox.disabled) continue;
			if(chkbox.checked == true)
			{
				v_count ++;
			}
		}
	}
	return v_count;
}
/*返回 某名 checkbox 的值 
  checkbox不存在 或 没被选中(checked=false)返回 "" 
 */
function getCheckboxValue(arg_chkboxname)
{
	var inputbox=document.all.tags("input");
	var v_ret = "";
	for(var i=0;i<inputbox.length;i++)
	{
		var chkbox = inputbox[i];
		if((chkbox.type == "checkbox")&&(chkbox.name == arg_chkboxname))
		{
			if(chkbox.disabled) continue;
			if(chkbox.checked == true)
			{
				v_ret = chkbox.value;
				break;
			}
		}
	}
	return v_ret;
}

//返回指定checkbox名字的被选中的值，返回数组，如果没有一个被选中，则返回null
function getCheckboxValues(arg_chkboxname)
{
	var boxs = document.getElementsByName(arg_chkboxname);
	if(!boxs || !boxs.length || boxs.length <= 0) return null;
	var retuArray = new Array();
	var index = 0;
	for(var i=0,len=boxs.length;i<len;i++){
		if(!boxs[i] || boxs[i].type != 'checkbox' || !boxs[i].checked) continue;
		if(boxs[i].disabled) continue;
		retuArray[index] = boxs[i].value;
		index ++;
	}
	if(index <= 0) return null;
	return retuArray;
}



/* 如果某名的checkbox至少有一个 checked=true 则返回 true */
function hasOneChecked(arg_chkboxname)
{
	var flag=false;    
	inputbox = document.all.tags("input"); 
	for(var i=0;i<inputbox.length;i++)
	{
		var chkbox = inputbox[i];
		if((chkbox.type == "checkbox")&&(chkbox.name == arg_chkboxname))
		{
			if(chkbox.disabled) continue;
			if(chkbox.checked == true)  return true;
		}
	}
	return false;
}

//===========================以下为处理 radio 的函数==============================
/*将checkbox名=arg_radboxname, value = arg_value 的radio 设为选中 */
function setRadioChecked(arg_radboxname,arg_value)
{
	var box = null;
	var radlist=document.getElementsByName(arg_radboxname);   
	for(i=0;i<radlist.length;i++){
		if((radlist[i].type=="radio") & radlist[i].value == arg_value){
			radlist[i].checked = true;
			box = radlist[i];
			break;
		}
	}
	return box;
}

/*如果 名为arg_radboxname 的radio 有一个checked=true 则返回 true */
function judge_radio(arg_radboxname)    
{    
	radlist=document.all.tags("input");    
	for (i=0; i<radlist.length; i++)    
	{
		
		if((radlist[i].type=="radio")&(radlist[i].name==arg_radboxname)&(radlist[i].checked==true))    
    return true;
  }    
	return false;    
}

/*获取 名为arg_radboxname 的 radio 的值（第1个）*/
function getRadioValue(arg_radboxname)    
{    
	var v_ret=null;    
	var radlist=document.getElementsByName(arg_radboxname);    
	for (i=0; i<radlist.length; i++)    
	{    
		if((radlist[i].type=="radio")&(radlist[i].checked==true))    
		{    
			v_ret=radlist[i].value;    
		}    
	}    
	return v_ret;    
}

/////////////////////////////////////////////////////////////////////////////////////////////
/*
* 设置某个表单域的值，表单域可以是textbox,textarea,radio,checkbox,select
*/
function setFormFieldValue(formField,value)
{
    if(!formField) return;
    if(formField.type == 'select-one' || formField.type == 'select-multiple'){
        var len1=formField.options.length;
        var isSelected = false;//用于判断是否需要增加项
        for(var i=0;i<len1;i++){
            var opvalue = formField.options[i].value;
            if(opvalue == value){
                isSelected=true;//存在被选中的项
                formField.options[i].selected = true;
                try{formField.fireEvent("onchange");}catch(ex){;}
                break;
            }
        }
        if(!isSelected){//此值在下拉中不存在,则判断是否需要增加此项
            try{
	            if(formField.append != null){//如果select中含有append属性,则追加
	                var newOption = new Option();
	                newOption.value = value;
	                newOption.text = value
	                formField.options[len1]=newOption;
	                formField.options[len1].selected = true;
	            }
            }catch(appendex){}
        }
    }
    else if(formField.type == 'checkbox'){
        if(formField.value == value){
        	formField.checked = true;
        	try{formField.fireEvent("onclick");}catch(ex){;}
        }
        else formField.checked = false;
    }
    else if(formField.type == 'radio'){
        var radlist = document.getElementsByName(formField.name);
        for(i=0;i<radlist.length;i++){
            if(radlist[i].type == 'radio' &&
            		radlist[i].form.name == formField.form.name &&
            		radlist[i].value == value){
                radlist[i].checked = true;
                try{radlist[i].fireEvent("onclick");}catch(ex){;}
                break;
            }
        }
    }
    else if(formField.type == 'image'){
        formField.src = value;
    }
    else{
        formField.value = value;
    }
}

//用于处理初始化表单中表单内容
function initFormByRowSet(formName)
{
    //********调用初始化表单********/
    try{
        var fbox = eval(formName);
        if(!fbox) return;
        var xml = document.getElementById('Form_'+formName);
        if(!xml) return;
        var formElements = fbox.elements;
        for(var i=0;i<formElements.length;i++){
            var fieldName = formElements[i].name;
            if(!fieldName) continue;
            var obj = xml.selectSingleNode("/data/fields/field[@name='"+fieldName.toUpperCase()+"']");
            if(obj){
                setFormFieldValue(formElements[i],obj.text);
            }
        }
    }
    catch(ex){window.status=ex.message;}
}
///////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////简易下拉框联动///////////////////////edit by xiejs at 2008-11-20////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
var __MM_VAR_SELECTRELATION_ARRAY = new Array();
function SelectRelation(relation_select)
{
	this.relation_select_options=__MM_FUNC_SELECTRELATION_init(relation_select);
	this.relation_select=relation_select;
	
	/////////////////////////////////////////////////////
	//需要在onChange类似于：onChange="var sr=new SelectRelation(listbox2);sr.chg(#1.value==#2.value.substr(0,2),true);"
	//chg参数说明：表达式，符合的显示在listbox2中，true是否显示提示信息<option value="">请选择...</option>
	//表达式中的#1表第1个selectbox的option，#2同理
	this.chg=function(expression,captionFlag){
		var box1=event.srcElement;
		var box2=this.relation_select;
		//清除原有数据
		for(var i=box2.options.length-1;i>=0;i--){
			box2.options[i] = null;
		}
		//////////////////////////
		expression = expression.replace(/#1/ig,"box1.options[box1.options.selectedIndex]");
		for(var i=0,len=this.relation_select_options.length;i<len;i++){
			var tmp_expression = expression.replace(/#2/ig,"this.relation_select_options["+i+"]");
			if(eval(tmp_expression) || 
					(captionFlag && this.relation_select_options[i].value == "")){//显示提示项
			    var src_opt = this.relation_select_options[i];
				var opt = new Option();
				for(var k=0;k<src_opt.attributes.lenght;k++){
					opt.setAttribute(src_opt.attributes[k],src_opt.getAttribute(src_opt.attributes[k]));
				}
				opt.value = src_opt.value;
				opt.text = src_opt.text;
				box2.options[box2.options.length] = opt;
			}
		}
	}
	
}

function __MM_FUNC_SELECTRELATION_init(relation_select)
{
	var select_name = relation_select.name;
	if(__MM_VAR_SELECTRELATION_ARRAY[select_name]){
		return __MM_VAR_SELECTRELATION_ARRAY[select_name];
	}
	
	var options_array = new Array();
	for(var i=0,len=relation_select.options.length;i<len;i++){
		var src_opt = relation_select.options[i];
		var opt = new Option();
		for(var k=0;k<src_opt.attributes.lenght;k++){
			opt.setAttribute(src_opt.attributes[k],src_opt.getAttribute(src_opt.attributes[k]));
		}
		opt.value = src_opt.value;
		opt.text = src_opt.text;
		options_array[i] = opt;
	}
	__MM_VAR_SELECTRELATION_ARRAY[select_name] = options_array;
	
	//删除他们
	for(var i=relation_select.options.length-1;i>=0;i--){
		relation_select.options[i] = null;
	}
	////////////////////////////////////////////////////
	return __MM_VAR_SELECTRELATION_ARRAY[select_name];
}
/////////////////////////////////////////////////////////////////////////////////


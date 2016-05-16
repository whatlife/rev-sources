// input 焦点
$(function(){
$('.loginIpt').bind({
		focus:function(){
			if (this.value == this.defaultValue){
				this.value="";
			}
		},
		blur:function(){
			if (this.value == ""){
				this.value = this.defaultValue;
			}
		}
	});
})

// 二级菜单
function initMenu() {
  $('#navBar ul').hide();
  $('#navBar ul:first').show();
  $('#navBar li a').click(
    function() {
      var checkElement = $(this).next();
      if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
        return false;
        }
      if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
        $('#navBar ul:visible').slideUp('normal');
        checkElement.slideDown('normal');
        return false;
        }
      }
    );
  }
$(document).ready(function() {initMenu();});


// 隔行换色
 /* 当鼠标移到表格上是，当前一行背景变色 */
      $(document).ready(function(){
            $(".tableGrid tr td").mouseover(function(){
                $(this).parent().find("td:not(.noClass)").css("background-color","#d5f4fe");
            });
      })
      /* 当鼠标在表格上移动时，离开的那一行背景恢复 */
      $(document).ready(function(){
            $(".tableGrid tr td").mouseout(function(){
                var bgc = $(this).parent().attr("bg");
                $(this).parent().find("td:not(.noClass)").css("background-color",bgc);
            });
      })
      
      $(document).ready(function(){
            var color="#f3f3f3"
            $(".tableGrid tr:odd td").css("background-color",color);  //改变偶数行背景色
            /* 把背景色保存到属性中 */
            $(".tableGrid tr:odd").attr("bg",color);
            $(".tableGrid tr:even").attr("bg","#fff");
      })
	  
// 自适应高度
function autoHeight() {
var h = $(window).height() - 59;
var h1 = $(window).height();
var h_old = 300;
if (h > h_old) {
$(".autoH").css('height', h);
$(".wrapper").css('height', h1);
} else {
return false;
}
}
$(function() {
autoHeight()
$(window).resize(autoHeight);
})

function autoWidth() {
var w = $(window).width() - 230;
var w_old = 300;
if (w > w_old) {
$(".BoxW").css('width', w);
} else {
return false;
}
}
$(function() {
autoWidth()
$(window).resize(autoWidth);
})
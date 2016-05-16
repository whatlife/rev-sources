(function($,win){
	if(!win._99Plugin){
		win._99Plugin = {};
	}
	_99Plugin.DateSelect=function(){
		var c=[31,28,31,30,31,30,31,31,30,31,30,31];
		return{
			changeDate:function(o){
				var n = o.data;
				var y=$("#"+n.y)[0];
				var g=$("#"+n.m)[0];
				var p=$("#"+n.d)[0];
				var yval = $(y).val();
				var gval = $(g).val();
				var pval = $(p).val();
				if(yval%4==0){
					c[1]=29
				}else{
					c[1]=28
				}
				if(pval>c[gval-1]){
					p.selectedIndex=c[gval-1]
				}
				var h=p.options.length;
				var f=c[gval-1];
				if(h<=f){
					for(var k=h;k<=f;k=k+1){
						j=k-1+n.inSel;
						if(!p.options[j]&&j<=c[gval-1]){
							p.options[j]=new Option(k,k)
						}
					}
				}
				if(h>f){
					for(var k=32;k>=f;k=k-1){
						j=k-1+n.inSel;
						if(p.options[j]&&p.options[j].value>c[gval-1]){
							p.options[j]=null
						}
					}
				}
			},
			init:function(d){
				d.inSel = 1;
				$("#"+d.y+",#"+d.m+",#"+d.d).bind("change",d,this.changeDate)
				var a = {};
				a.data = d;
				this.changeDate(a);
			}
		}
	}();
	_99Plugin.getDifferDays = function(strDateStart,strDateEnd){
	   var strSeparator = "-"; //日期分隔符
	   var oDate1;
	   var oDate2;
	   var iDays;
	   oDate1= strDateStart.split(strSeparator);
	   oDate2= strDateEnd.split(strSeparator);
	   var strDateS = new Date(oDate1[0], oDate1[1]-1, oDate1[2]);
	   var strDateE = new Date(oDate2[0], oDate2[1]-1, oDate2[2]);
	   iDays = parseInt((strDateS - strDateE ) / 1000 / 60 / 60 /24) 
	   return iDays ;
	}
})(jQuery,window);

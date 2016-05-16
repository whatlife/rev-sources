/**
 * 个性化生成页面
 * @return
 */
function showModalDialogFrame(data,width,height,left,top){
	var object = new Object();
	object.title = "阶段个性化";
	object.url = 'doView?action=forward&start='+
		'&projectId='+data.projectId+
		'&teachingClassId='+data.teachingClassId+
		'&stageName='+encodeURI(encodeURI(data.stageName))+
		'&projectName='+encodeURI(encodeURI(data.projectName))+
		'&startTime='+data.startTime+
		'&endTime='+data.endTime+
		'&stageId='+data.stageId+
		'&stageType='+data.stageType+
		'&evJobId=' + data.evJobId+
		'&opt='+data.opt;
	if(width==undefined) width="620";
	if(height==undefined) height="440";
	if(left==undefined) left=(window.screen.availWidth - 10 - width) / 2;
	if(top==undefined) top=(window.screen.availHeight - 30 - height) / 2;
	var params = "dialogHeight:"+height+"px;dialogWidth:"+width+"px;";
	openWindow = window.open(object.url, object.title, "width=" + width + ", height=" + height + ",top=" + top + ",left=" + left + ",toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, status=no,alwaysRaised=yes,depended=yes");
};
/**
 * 关闭弹出窗
 * @return
 */
function closeWindow(){
	openWindow.close();
}

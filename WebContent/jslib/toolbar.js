// 页面工具栏
function showJTopoToobar(stage){
	var toobarDiv = $('<div class="btn-toolbar">').html(''
//		+'<input type="radio" name="modeRadio" value="normal" checked id="r1"> 默认</input>'
//		+'&nbsp;<input type="radio" name="modeRadio" value="select" id="r2"> 框选</input>'
//		+'&nbsp;<input type="radio" name="modeRadio" value="drag" id="r3"> 平移</input>'
//		+'&nbsp;<input type="radio" name="modeRadio" value="edit" id="r4"> 编辑</input>'
		+'<button class="btn"  id="centerButton"><i class="icon-plus"></i>居中显示</button>'
		+'<button class="btn" id="fullScreenButton">全屏显示</button>'
		+'<button class="btn" id="zoomOutButton">放大</button>'
		+'<button class="btn" id="zoomInButton">缩小</button>'
		+'<button class="btn" id="refreshButton">刷新</button>'
		+'<select name="DropDownTimezone" id="DropDownTimezone"  class="input-xlarge">'
		+'<option value="AgileGre">AgileGre视图</option>'
		+'<option value="All">混合视图</option></select>'
//		+'&nbsp;&nbsp;<input type="checkbox" id="zoomCheckbox"> 鼠标缩放</input>'
//		+'&nbsp;&nbsp;<input type="text" id="findText" value="" onkeydown="findButton.click()">'
//		+'<input type="button" id="findButton" value=" 查 询 ">'
//		+'&nbsp;&nbsp;<input type="button" id="exportButton" value="导出PNG">'
		);
	$('#content').prepend(toobarDiv);

	// 工具栏按钮处理
	$("input[name='modeRadio']").click(function(){			
		stage.mode = $("input[name='modeRadio']:checked").val();
	});
	$('#centerButton').click(function(){
		stage.centerAndZoom(); //缩放并居中显示
	});
	$('#zoomOutButton').click(function(){
		
		stage.zoomOut();
	});
	$('#zoomInButton').click(function(){
		stage.zoomIn();
	});
	$('#refreshButton').click(function(){
		stage.clear();
//		stage.remove(scene);
		//window.location.reload();
		gettopo(url);
		
		scene = new JTopo.Scene(stage);	
		scene.background = './img/bg.png';
		
		
	
	});
	$('#exportButton').click(function(){
		stage.saveImageInfo();
	});
	$('#zoomCheckbox').click(function(){
		if($('#zoomCheckbox').attr('checked')){
			stage.wheelZoom = 0.85; // 设置鼠标缩放比例
		}else{
			stage.wheelZoom = null; // 取消鼠标缩放比例
		}
	});
	$('#fullScreenButton').click(function(){
		runPrefixMethod(stage.canvas, "RequestFullScreen")
	});

	// 查询
	$('#findButton').click(function(){
		var text = $('#findText').val().trim();
		var nodes = stage.find('node[text="'+text+'"]');
		if(nodes.length > 0){
			var node = nodes[0];
			node.selected = true;
			var location = node.getCenterLocation();
			// 查询到的节点居中显示
			stage.setCenter(location.x, location.y);
			
			function nodeFlash(node, n){
				if(n == 0) {
					node.selected = false;
					return;
				};
				node.selected = !node.selected;
				setTimeout(function(){
					nodeFlash(node, n-1);
				}, 300);
			}
			
			// 闪烁几下
			nodeFlash(node, 6);
		}
	});
}

var runPrefixMethod = function(element, method) {
	var usablePrefixMethod;
	["webkit", "moz", "ms", "o", ""].forEach(function(prefix) {
		if (usablePrefixMethod) return;
		if (prefix === "") {
			// 无前缀，方法首字母小写
			method = method.slice(0,1).toLowerCase() + method.slice(1);
		}
		var typePrefixMethod = typeof element[prefix + method];
		if (typePrefixMethod + "" !== "undefined") {
			if (typePrefixMethod === "function") {
				usablePrefixMethod = element[prefix + method]();
			} else {
				usablePrefixMethod = element[prefix + method];
			}
		}
	}
);

return usablePrefixMethod;
};
/*
runPrefixMethod(this, "RequestFullScreen");
if (typeof window.screenX === "number") {
var eleFull = canvas;
eleFull.addEventListener("click", function() {
	if (runPrefixMethod(document, "FullScreen") || runPrefixMethod(document, "IsFullScreen")) {
		runPrefixMethod(document, "CancelFullScreen");
		this.title = this.title.replace("退出", "");
	} else if (runPrefixMethod(this, "RequestFullScreen")) {
		this.title = this.title.replace("点击", "点击退出");
	}
});
} else {
alert("浏览器不支持");
}*/

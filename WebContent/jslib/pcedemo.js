/**
 * create by fwx307478 on 2016/6/12
 */

//提交输入框输入的数据
function submitOne(){
	var value = $("#textId").val();
	
	$.ajax({
		type:"POST",
		aysnc:false,
		url:"TestServlet",
		data:{
			"value":value
		},
	    dataType:'text',
	    success:function(msg){
	    	/*var message = eval(msg);*/
	    	//alert(msg);
	    	
	    	var text = document.getElementById("returnValue");
	    	text.value = msg;
	    }
		
	});
	document.getElementById("returnValue").rows = "14";
}

//清空输入框
function emptyTextarea(){
	$("#textId").val("");
	$("#returnValue").val("");
}

//下拉列表获取可选模型
function getValFromSelectModel(){
	var selectVal = $("#selectModel").find("option:selected").val();
	
	$.ajax({
		type:"POST",
		aysnc:false,
		url:"SelectModelServlet",
		data:{
			"selectVal":selectVal
		},
	    dataType:'text',
	    success:function(msg){
	    	$("#textId").val("");
	    	$("#returnValue").val("");
	    	//alert(msg);
	    	var text = document.getElementById("textId");
	    	text.value = msg;
	    }
		
	});
	
}

//样例下发获取
/*function submitSample(){
var sBandWidVal = $("#SampleBandWidth").val();
var sTunVal = $("#SampleTunnel").val();
var sGolOptVal = $("#SampleGlobalOptimize").val();


	
	$.ajax({
		type:"POST",
		aysnc:false,
		url:"Servlet",
		data:{
			"selectVal":selectVal
		},
	    dataType:'text',
	    success:function(msg){
	    	$("#textId").val("");
	    	$("#returnValue").val("");
	    	alert(msg);
	    	var text = document.getElementById("textId");
	    	text.value = msg;
	    }
		
	});
}*/

//提示语隐藏
function hideCueWords(ele){
	if(ele.getAttribute("data-id") == "LinkBandWidth"){
		$("#requirementLBW").hide();
	}else if(ele.getAttribute("data-id") == "TunnelBandwidth"){
		$("#requirementTBW").hide();
	}
}

function submitLinkBandWidth(){
	
	var linkBandWidth = $("#LinkBandWidth").val();
	var linkBandWidNum = parseInt(linkBandWidth);
	var upperLimit = parseInt("4000000000");
	var lowLimit = parseInt("0");
	var cueWords = $("#requirementLBW");
	var linkVal = $("#selectLink").find("option:selected").val();
	
    if((linkBandWidNum>upperLimit) || (linkBandWidNum<lowLimit)){
    	cueWords.show();
    }else {
    	
    	$.ajax({
    		type:"POST",
    		aysnc:false,
    		url:"LinkConstraintsServlet",
    		data:{
    			"selectVal":linkBandWidth,
    			"linkVal":linkVal
    		},
    		dataType:'text',
    		success:function(msg){
    			$("#textId").val("");
    			$("#returnValue").val("");
    			alert(msg);
    			var text = document.getElementById("textId");
    			text.value = msg;
    			
    			cueWords.hide();
    		}
    		
    	});
    }
}


function submitTunnelBandwidth(){
	var tunnelBandwidth = $("#TunnelBandwidth").val();
	var tunnelBandwidthNum = parseInt(tunnelBandwidth);
	var upperLimit = parseInt("1000000");
	var lowLimit = parseInt("0");
	var cueWords = $("#requirementTBW");
	var tunnelVal = $("#selectTunnel").find("option:selected").val();
	var title = "";
	
	
	var messageTun = eval(flowsRes);
	$.each(messageTun,function(index,elementOut){
		$.each(elementOut,function(index,elementInner){
			var label = elementInner.label;
			if(tunnelVal == label){
				title = elementInner.title;
			}
			
		})
	});
	
	if((tunnelBandwidthNum>upperLimit) || (tunnelBandwidthNum<lowLimit)){
		cueWords.show();
	}else{
		$.ajax({
			type:"POST",
			aysnc:false,
			url:"TunnelBandwidthServlet",
			data:{
				"selectVal":tunnelBandwidth,
				"tunnelVal":tunnelVal,
				"title":title
			},
			dataType:'text',
			success:function(msg){
				$("#textId").val("");
				$("#returnValue").val("");
				alert(msg);
				var text = document.getElementById("textId");
				text.value = msg;
				
				cueWords.hide();
			}
			
		});
	}
	
}


function submitPceReoptimization(){
	
	$.ajax({
		type:"POST",
		aysnc:false,
		url:"PceReoptimizationServlet",
		
		dataType:'text',
		success:function(msg){
			$("#textId").val("");
			$("#returnValue").val("");
			alert(msg);
			var text = document.getElementById("textId");
			text.value = msg;
		}
		
	});
}

//点击全量重优化时页面下拉框填入option
function getTunnelAndLinkFun(){
	$("#selectTunnel").empty();
	$("#selectLink").empty();
	
	var selectTunnel = $("#selectTunnel");
	var selectLink = $("#selectLink");
	var tunnelArr = [];
	var linkArr = [];
	
	var messageTun = eval(flowsRes);
	$.each(messageTun,function(index,elementOut){
		$.each(elementOut,function(index,elementInner){
			var lable = elementInner.label;
			tunnelArr.push(lable);
			
		})
	});
	
	var messageLink = eval(topologyArr);
	var element1 = messageLink.links;
	$.each(element1,function(indexOne,elementOne){
		var name = elementOne.name;
		var option  = "<option value='"+name+"'>"+name+"</option>";
		selectLink.append(option);
	});
	
	tunnelArr.unique();
	for(var i=0;i<tunnelArr.length;i++){
		var option  = "<option value='"+tunnelArr[i]+"'>"+tunnelArr[i]+"</option>";
		selectTunnel.append(option);
	}
	
	
	
}

//去处数组里的重复元素
Array.prototype.unique = array_unique;  
function array_unique() {  
	var o = new Object();  
	for (var i=0,j=0; i<this.length; i++){  
		if (typeof o[this[i]] == 'undefined') {  
			o[this[i]] = j++;  
		}  
	}  
	
	this.length = 0;  
	for (var key in o) {  
		this[o[key]] = key;  
	}  
	return this;  
}   

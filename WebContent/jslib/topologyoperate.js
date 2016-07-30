var vis_callback=null;
var vis_data=null;
var vis_autogenNodeId=0;

/**
 * 
 */
function clearNodeForm() {
	$("#nodeModalView input").each(function(item) {
		$(this).val("");
		$("#operatenode").html("now add node");
		num = 0;
		$("#nodeidgroup").hide();
	});
}
 
function clearLinkForm() {
	$("#linkModalView input").each(function(item) {
		$(this).val("");
		$("#operatelink").html("now add link");
		dat = 0;
		$("#linkidgroup").hide();
	});
}
 
function clearViewNodeForm() {
	$("#viewnodeModal input").each(function(item) {
		$(this).val("");
	});
}
 
function clearViewLinkForm() {
	$("#addLine input").each(function(item) {
		$(this).val("");
	});
}

/*function loadAddNode() {
	$('#modifyNodeModalLabel').hide();
	$('#addNodeModalLabel').show();
	$('#deviceidgroup').hide();
}

function loadModifyNode(deviceid) {

	$('#addNodeModalLabel').hide();
	$('#modifyNodeModalLabel').show();
	$('#deviceidgroup').show();
	$.ajax({
		url : "rest/nodes/" + deviceid,
		type : 'GET',
		dataType : "json",
		contentType : "application/json",
		success : function(result) {
		 
			var id = result.id;
			var name = result.deviceName;
			var ipAddress = result.ipAddress;
			var port = result.port;
			var userName = result.userName;
			var password = result.password;
			var version = result.version;
			var type = result.type;
			var protocol = result.protocol;
			var status = result.state;
			 
			$("input[name='devicename']").val(name);
			$("input[name='ip']").val(ipAddress);
			$("input[name='username']").val(userName);
			$("input[name='passwd']").val(password);
			$("input[name='version']").val(version);
			$("input[name='port']").val(port);
			$("input[name='productType']").val(type);
			$("input[name='status']").val(status);
			$("input[name='protocol']").val(protocol);
			$("input[name='deviceid']").val(id);
			 
		},
		error : function(result) {
		  
		}
	});
}*/
var num = 0;
function editNode(id) {
	/*var isadd = $('#addDeviceModalLabel').is(':visible');
	var ismodify =  $('#modifyDeviceModalLabel').is(':visible');*/
	if (id != null) {
		getNode(id);
	}else if (num != 0) {
		modifyNode(num);
		num = 0;
	}else{
		submitNode();
	}
}

var dat = 0;
function editLink(id){
	if (id != null) {
		getLink(id);
	}else if (dat != 0) {
		modifyLink(dat);
		dat = 0;
	}else{
		submitLink();
	}
}

function modifyNode(num){
	//$("#nodeModalView span").hide();
	name = $("input[name=" + "nodename" + "]").val();
	description = $("input[name=" + "nodedescription" + "]").val();
	//diagramType = $("input[name=" + "nodediagramType" + "]").val();
	nodeType = $("input[name=" + "nodeType" + "]").val();
	nodeId = $("input[name=" + "nodeId" + "]").val();
	adminState = $("input[name=" + "nodeadminState" + "]").val();
	
	var namereg = /^[a-zA-Z][a-zA-Z0-9_-]*$/;
	var reg =/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
	var bool=reg.test(nodeId);
	var boolname=namereg.test(name);
	
	if (name == "") {
		$.messager.popup("name cannot be null");
		return false;
	}else if(boolname == false){
		$.messager.popup("name is a combination of letters and numbers,and starts with a letter");
		return false;
	}
	if (nodeType == "") {
		$.messager.popup("node type cannot be null");
		return false;
	}
	if (nodeId == "") {
		$.messager.popup("node ip cannot be null");
		return false;
	}else if(bool == false){
		$.messager.popup("node ip format error");
		return false;
	}
	if (adminState == "") {
		$.messager.popup("state can not be null");
		return false;
	}
	
	var content = {};
	content.id=num;
	content.name=name;
    content.description=description;
    
    content.diagramType="";
    content.nodeType=nodeType;
    content.nodeId=nodeId;
    content.adminState=adminState;
	$.ajax({
		url : 'rest/nodes',
		type : 'PUT',
		dataType : "json",
        contentType : "application/json",
		data : JSON.stringify(content),
		success : function(result) {
			alert("success to modify node");
			clearNodeForm();
			reloadNodeDataTable();
		},
		error : function(result) {
			$.messager.popup("fail to modify node");
		}
	});
}

function modifyLink(dat){
	//$("#linkModalView span").hide();
	var name = $("input[name=" + "linkname" + "]").val();
	var description = $("input[name=" + "linkdescription" + "]").val();
	var leftNodeType = $("input[name="+"leftNodeType"+"]").val();
	var leftNodeId = $("input[name=" + "leftNodeId" + "]").val();
	var leftTpType = $("input[name="+"leftTpType"+"]").val();
	var leftTpId = $("input[name=" + "leftTpId" + "]").val();
	var leftTpDesc = $("input[name="+"leftTpDesc"+"]").val();
	var rightNodeType = $("input[name="+"rightNodeType"+"]").val();
	var rightNodeId = $("input[name=" + "rightNodeId" + "]").val();
	var rightTpType = $("input[name="+"rightTpType"+"]").val();
	var rightTpId = $("input[name=" + "rightTpId" + "]").val();
	var rightTpDesc = $("input[name="+"rightTpDesc"+"]").val();
	
	var namereg = /^[a-zA-Z][a-zA-Z0-9_-]*$/;
	var reg =/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
	var boolleft=reg.test(leftTpId);
	var boolright=reg.test(rightTpId);
	var boolname=namereg.test(name);
	
	if (name == "") {
		$.messager.popup("name can not be null");
		return false;
	}else if (boolname == false){
		$.messager.popup("name is a combination of letters and numbers,and starts with a letter");
		return false;
	}
	if (leftNodeId == "") {
		$.messager.popup("left node name can not be null");
		return false;
	}
	if (leftTpId == "") {
		$.messager.popup("left node ip can not be null");
		return false;
	}else if (boolleft == false){
		$.messager.popup("left node ip format error");
		return false;
	}
	if (rightNodeId == "") {
		$.messager.popup("right node name can not be null");
		return false;
	}
	if (rightTpId == "") {
		$.messager.popup("right node ip can not be null");
		return false;
	}else if (boolright == false){
		$.messager.popup("right node ip format error");
		return false;
	}

	var content = {};
	content.id=dat;
	content.name=name;
    content.description=description;
    
    content.leftNodeId=leftNodeId;
    content.leftTpId=leftTpId;
    content.leftNodeType=leftNodeType;
    content.leftTpType=leftTpType;
    content.leftTpDesc=leftTpDesc;
    
    content.rightNodeId=rightNodeId;
    content.rightTpId=rightTpId;
    content.rightNodeType=rightNodeType;
    content.rightTpType=rightTpType;
    content.rightTpDesc=rightTpDesc;
			
	$.ajax({
		url : 'rest/links',
		type : 'PUT',
		dataType : "json",
        contentType : "application/json",
		data : JSON.stringify(content),
		success : function(result) {
			alert("success to modify link");
			clearLinkForm();
			reloadLinkDataTable();
		},
		error : function(result) {
			
			$.messager.popup("failed to modify link");
			 
			/*setCodeInfo("Boolean ret = link.update()", "PUT", base
					+ "rest/serviceflow", xmlCreatFlow[0].outerHTML, result);*/
		}
	});
}

function getNode(id){
 
	$("#operatenode").html("now modify node");
	$("#nodeidgroup").show();
	$.ajax({
		url : "rest/nodes/" + id,
		type : 'GET',
		dataType : "json",
		contentType : "application/json",
		success : function(result) {
			var id=result.id;
			var name = result.name;
			var description = result.description;
			//var diagramType = result.diagramType;
			var nodeType = result.nodeType;
			var nodeId = result.nodeId;
			var adminState = result.adminState;
			
			$("input[name="+"nodeid"+"]").val(id);
			$("input[name=" + "nodename" + "]").val(name);
			$("input[name=" + "nodedescription" + "]").val(description);
			//$("input[name=" + "nodediagramType" + "]").val(diagramType);
			$("input[name=" + "nodeType" + "]").val(nodeType);
			$("input[name=" + "nodeId" + "]").val(nodeId);
			$("input[name=" + "nodeadminState" + "]").val(adminState);
		},
		error : function(result) {
			$.messager.popup("load modify node failed : " + result.responseText);
		}
	});
}

function getLink(id){
	dat = id ;
	$("#operatelink").html("now modify link");
	$("#linkidgroup").show();
	$.ajax({
		url : "rest/links/" + id,
		type : 'GET',
		dataType : "json",
		contentType : "application/json",
		success : function(result) {
			var id = result.id;
			var name = result.name;
			var description = result.description;
			var leftNodeType = result.leftNodeType;
			var leftNodeId = result.leftNodeId;
			var leftTpType = result.leftTpType;
			var leftTpId = result.leftTpId;
			var leftTpDesc = result.leftTpDesc;
			var rightNodeType = result.rightNodeType;
			var rightNodeId = result.rightNodeId;
			var rightTpType = result.rightTpType;
			var rightTpId = result.rightTpId;
			var rightTpDesc = result.rightTpDesc;
			
			$("input[name=" + "linkid" + "]").val(id);
			$("input[name=" + "linkname" + "]").val(name);
			$("input[name=" + "linkdescription" + "]").val(description);
			$("input[name="+"leftNodeType"+"]").val(leftNodeType);
			$("input[name=" + "leftNodeId" + "]").val(leftNodeId);
			$("input[name="+"leftTpType"+"]").val(leftTpType);
			$("input[name=" + "leftTpId" + "]").val(leftTpId);
			$("input[name="+"leftTpDesc"+"]").val(leftTpDesc);
			$("input[name="+"rightNodeType"+"]").val(rightNodeType);
			$("input[name=" + "rightNodeId" + "]").val(rightNodeId);
			$("input[name="+"rightTpType"+"]").val(rightTpType);
			$("input[name=" + "rightTpId" + "]").val(rightTpId);
			$("input[name="+"rightTpDesc"+"]").val(rightTpDesc);
			
		},
		error : function(result) {
			
			$.messager.popup("load link failed : " + result.responseText);
	 
		}
	});
}
 
function modifyDev()
{
	var name = $("input[name='devicename']").val();
	var ip = $("input[name='ip']").val();
	var username = $("input[name='username']").val();
	var passwd = $("input[name='passwd']").val();
	var version = $("input[name='version']").val();
	var port = $("input[name='port']").val();
	var productType = $("input[name='productType']").val();
	var state = $("input[name='status']").val();
	var protocol = $("input[name='protocol']").val();
	var deviceid = $("input[name='deviceid']").val();
	
	var content = {};
	content.deviceName = name;
	content.ipAddress = ip;
	content.port = port;
	content.userName = username;
	content.password = passwd;
	content.version = version;
	content.type = productType;
	content.protocol = protocol;
	content.state = state;
	content.id = deviceid;
 
	$.ajax({
		"dataType" : 'json',
		url : "rest/nodes",
		type : 'PUT',
		dataType : "json",
        contentType : "application/json",
		data : JSON.stringify(content),
		success : function(result) {
			
			// reloadData
			reloadNodeDataTable();
 
			$("#deviceModal").modal('hide');
			$("#deviceModal input").each(function(item) {
				$(this).val("");
			});
		},
		error : function(result) {
			$.messager.popup("modify device failed : " + result.responseText);
			 
		}
	});	
}
 


function deleteNode(id) {
 
    $.messager.confirm('Confirm', 'Are you sure to delete node ' + id + ' ? ', function() { 
    	$.ajax({
			url :  'rest/nodes/' + id,
			type : 'DELETE', 
			success : function(response) {
				
	        	if(vis_callback != null)
	        	{
	        		vis_callback(vis_data);
	        		vis_callback = null;
	        	}
	        	  
				if (response.status == "ok") {
					//clearViewNodeForm();
					reloadNodeDataTable();
				}
			},
			error : function(response) {
				if(vis_callback != null)
	        	{
	        		vis_callback(null);
	        		vis_callback = null;
	        	}
				setCodeInfo(
					"Boolean ret = delete nodes.delete()",
					"DELETE", url, "",
					response.responseText);
			}
		});
      });
}
 

function deleteLink(id) {
	
    $.messager.confirm("Confirm", 'Are you sure to delete node ' + id + ' ? ', function() { 
		 
    	$.ajax({
			url : 'rest/links/' + id,
			type : 'DELETE', 
			success : function(response) {
				if(vis_callback != null)
	        	{
	        		vis_callback(vis_data);
	        		vis_callback = null;
	        	}
				
				if (response.status == "ok") {
                                                url=null;
					reloadLinkDataTable();
				}
			},
			error : function(response) {
				if(vis_callback != null)
	        	{
	        		vis_callback(null);
	        		vis_callback = null;
	        	}
				setCodeInfo(
						
						"Boolean ret = delete links.delete()",
						"DELETE", url, "",
						response.responseText);
			}
		});
    });
    
}

var nodesColumns = new Array( 
		{
			"mData" : "name",
			"sClass" : "center"
		},
		{
			"mData" : "nodeType",
			"sClass" : "center"
		},
		{
			"mData" : "nodeId",
			"sClass" : "center"
		}/*,
		{
			"mData" : "diagramType",
			"sClass" : "center"
		}*/,
		{
			"mData" : "adminState",
			"sClass" : "center"
		},
		{
			'mData' : 'id',
			'sClass' : 'center',
			"fnRender" : function(data, type, full) {
				var id = type;
				id = data.aData[4];
				var result = ' &nbsp<a href="javascript:void(0)" data-toggle="modal" class="btn btn-primary" onclick="editNode('
						+ id
						+ ')" >'
						+ '<i class="icon-edit icon-white"></i></a> &nbsp'
						+ '<a class="btn btn-danger" href="javascript:void(0)" onclick="deleteNode('
						+ id
						+ ')" >'
						+ '<i class="icon-trash icon-white"></i></a>';
				return result;
			}
		});



var linksColumns = new Array( 
		{
			"mData" : "name",
			"sClass" : "center"
		},
		{
			"mData" : "leftNodeId",
			"sClass" : "center"
		},
		{
			"mData" : "leftTpId",
			"sClass" : "center"
		},
		{
			"mData" : "rightNodeId",
			"sClass" : "center"
		},
		{
			"mData" : "rightTpId",
			"sClass" : "center"
		},
		{
			'mData' : 'id',
			'sClass' : 'center',
			"fnRender" : function(data, type, full) {
				var id = type;
				id = data.aData[5];

				var result = ' &nbsp<a href="javascript:void(0)" data-toggle="modal" class="btn btn-primary" onclick="editLink('
						+ id
						+ ')" >'
						+ '<i class="icon-edit icon-white"></i></a> &nbsp'
						+ '<a class="btn btn-danger" href="javascript:void(0)" onclick="deleteLink('
						+ id
						+ ')" >'
						+ '<i class="icon-trash icon-white"></i></a>';
				return result;
			}
		});
 
// reload data table
var sortdata ;
var aaData;

function reloadNodeDataTable() {
	$("#nodeModalView table").dataTable().fnClearTable();
	$.get("rest/nodes", function(data) {
		var ndData = packagingnodesdatatabledata(data);
		$("#nodeModalView table").dataTable().fnAddData(ndData, true); // data must be json
	});
	aaData=[];
	sortdata=[];
}

function reloadLinkDataTable() {
	$("#linkModalView table").dataTable().fnClearTable();
	$.get("rest/links", function(data) {
		var  lkData = packaginglinksdatatabledata(data);
		$("#linkModalView table").dataTable().fnAddData(lkData, true); // data must be json
	});
	aaData=[];
	sortdata=[];
}



// nodes data table install
function packagingnodesdatatabledata(resp, statusData) {
	aaData=[];
	data = resp.nodes;
	if (data == null) {
		return aaData;
	}
	for (var i = 0; i < data.length; i++) {
		sortdata=[];
		sortdata.push(data[i].name);
		sortdata.push(data[i].nodeType);
		sortdata.push(data[i].nodeId);
		//sortdata.push(data[i].diagramType);
		sortdata.push(data[i].adminState);
		sortdata.push(data[i].id);
		aaData.push(sortdata);
	}
	return aaData;
}

//nodes data table install
function packaginglinksdatatabledata(resp, statusData) {
    var data = resp.links;
	var aaData = [];
	if (data == null) {
		return aaData;
	}
	for (var i = 0; i < data.length; i++) {
		var sortdata = [];
		sortdata.push(data[i].name);
		sortdata.push(data[i].leftNodeId);
		sortdata.push(data[i].leftTpId);
		sortdata.push(data[i].rightNodeId);
		sortdata.push(data[i].rightTpId);
		sortdata.push(data[i].id);
		aaData.push(sortdata);
	}
	return aaData;
}

function initNodeAndLinkList(){
	initNodeList();
	initLinkList();
}

// init device table data
function initNodeList() {

	$("#nodeModalView table").dataTable({
		"bPaginate" : false,
		"bLengthChange" : false,
		"bFilter" : false,
		"bInfo" : false,
		"bRetrieve" : true,
		"bProcessing" : true,
		"aoColumns" : nodesColumns,
		"sAjaxSource" : "rest/nodes",
		"fnServerData" : function(sSource, aDataSet, fnCallback) {
			$.ajax({
				"dataType" : 'json',
				"type" : "GET",
				"url" : sSource,
				"success" : function(resp) {
					aaData = packagingnodesdatatabledata(resp);
					fnCallback({
						"aaData" : aaData
					});
				}
			});
		}
	});
}
 

//init device table data
function initLinkList() {

	$("#linkModalView table").dataTable({
		"bPaginate" : false,
		"bLengthChange" : false,
		"bFilter" : false,
		"bInfo" : false,
		"bRetrieve" : true,
		"bProcessing" : true,
		"aoColumns" : linksColumns,
		"sAjaxSource" : "rest/links",
		"fnServerData" : function(sSource, aDataSet, fnCallback) {
			$.ajax({
				"dataType" : 'json',
				"type" : "GET",
				"url" : sSource,
				"success" : function(resp) {
					aaData = packaginglinksdatatabledata(resp);
					fnCallback({
						"aaData" : aaData
					});
				}
			});
		}
	});
}
 
 
 
function submitNode() {
	//$("#nodeModalView span").html("");
	name = $("input[name=" + "nodename" + "]").val();
	description = $("input[name=" + "nodedescription" + "]").val();
	//diagramType = $("input[name=" + "nodediagramType" + "]").val();
	nodeType = $("input[name=" + "nodeType" + "]").val();
	nodeId = $("input[name=" + "nodeId" + "]").val();
	adminState = $("input[name=" + "nodeadminState" + "]").val();
	
	var namereg = /^[a-zA-Z][a-zA-Z0-9_-]*$/;
	var reg =/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
	var bool=reg.test(nodeId);
	var boolname=namereg.test(name);
	
	if (name == "") {
		$.messager.popup("name can not be null");
		return false;
	}else if(boolname == false){
		$.messager.popup("name can not be null");
		return false;
	}
	if (nodeType == "") {
		$.messager.popup("node type cannot be null");
		return false;
	}
	if (nodeId == "") {
		$.messager.popup("node ip cannot be null");
		return false;
	}else if(bool == false){
		$.messager.popup("node ip format error");
		return false;
	}
	if (adminState == "") {
		$.messager.popup("state cannot be null");
		return false;
	}
	
	var content = {};
	content.name=name;
    content.description=description;
    
    content.diagramType="";
    content.nodeType=nodeType;
    content.nodeId=nodeId;
    content.adminState=adminState;
     
	$.ajax({
		url : 'rest/nodes',
		type : 'POST',
		dataType : "json",
        contentType : "application/json",
		data : JSON.stringify(content),
		success : function(result) {
			alert("success to add node");
			clearNodeForm();
			reloadNodeDataTable();
		},
		error : function(result) {
			$.messager.popup("failed to add node" + result.responseText);
		}
	});
	// resetFlow();
} 

function submitLink() {
	//$("#linkModalView span").html("");
	var name = $("input[name=" + "linkname" + "]").val();
	var description = $("input[name=" + "linkdescription" + "]").val();
	var leftNodeType = $("input[name="+"leftNodeType"+"]").val();
	var leftNodeId = $("input[name=" + "leftNodeId" + "]").val();
	var leftTpType = $("input[name="+"leftTpType"+"]").val();
	var leftTpId = $("input[name=" + "leftTpId" + "]").val();
	var leftTpDesc = $("input[name="+"leftTpDesc"+"]").val();
	var rightNodeType = $("input[name="+"rightNodeType"+"]").val();
	var rightNodeId = $("input[name=" + "rightNodeId" + "]").val();
	var rightTpType = $("input[name="+"rightTpType"+"]").val();
	var rightTpId = $("input[name=" + "rightTpId" + "]").val();
	var rightTpDesc = $("input[name="+"rightTpDesc"+"]").val();
	
	var namereg = /^[a-zA-Z][a-zA-Z0-9_-]*$/;
	var reg =/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
	var boolleft=reg.test(leftTpId);
	var boolright=reg.test(rightTpId);
	var boolname=namereg.test(name);
	
	if (name == "") {
		$.messager.popup("name can not be null");
		return false;
	}else if (boolname == false){
		$.messager.popup("name is a combination of letters and numbers,and starts with a letter");
		return false;
	}
	if (leftNodeId == "") {
		$.messager.popup("left node name can not be null");
		return false;
	}
	if (leftTpId == "") {
		$.messager.popup("left node ip can not be null");
		return false;
	}else if (boolleft == false){
		$.messager.popup("left node ip format error");
		return false;
	}
	if (rightNodeId == "") {
		$.messager.popup("right node name cannot be null");
		return false;
	}
	if (rightTpId == "") {
		$.messager.popup("right node ip cannot be null");
		return false;
	}else if (boolright == false){
		$.messager.popup("right node ip format error");
		return false;
	}

	var content = {};
	content.name=name;
    content.description=description;
    
    content.leftNodeId=leftNodeId;
    content.leftTpId=leftTpId;
    content.leftNodeType=leftNodeType;
    content.leftTpType=leftTpType;
    content.leftTpDesc=leftTpDesc;
    
    content.rightNodeId=rightNodeId;
    content.rightTpId=rightTpId;
    content.rightNodeType=rightNodeType;
    content.rightTpType=rightTpType;
    content.rightTpDesc=rightTpDesc;
			
	$.ajax({
		url : 'rest/links',
		type : 'POST',
		dataType : "json",
        contentType : "application/json",
		data : JSON.stringify(content),
		success : function(result) {
			alert("success to add link");
			clearLinkForm();
			reloadLinkDataTable();
		},
		error : function(result) {
			
			$.messager.popup("failed to create link" + result.responseText);
		 
		}
	});
	// resetFlow();
}
 
function addTopologyNode( ){
	
	//$("#viewnodeModal span").html("");
	viewname = $("input[name=" + "viewnodename" + "]").val();
	viewdescription = $("input[name=" + "viewnodedescription" + "]").val();
	//viewdiagramType = $("input[name=" + "viewnodediagramType" + "]").val();
	viewnodeType = $("input[name=" + "viewnodeType" + "]").val();
	viewnodeId = $("input[name=" + "viewnodeId" + "]").val();
	viewadminState = $("input[name=" + "viewnodeadminState" + "]").val();
	
	var namereg = /^[a-zA-Z][a-zA-Z0-9_-]*$/;
	var reg =/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
	var bool=reg.test(viewnodeId);
	var boolname=namereg.test(viewname);
	
	if (viewname == "") {
		$.messager.popup("name cannot be null");
		return false;
	}else if(boolname == false){
		$.messager.popup("name is a combination of letters and numbers,and starts with a letter");
		return false;
	}
	if (viewnodeType == "") {
		$.messager.popup("node type cannot be null");
		return false;
	}
	if (viewnodeId == "") {
		$.messager.popup("node ip cannot be null");
		return false;
	}else if(bool == false){
		$.messager.popup("node ip format error");
		return false;
	}
	if (viewadminState == "") {
		$.messager.popup("state cannot be null");
		return false;
	}
	
	var content = {};
	content.name=viewname;
    content.description=viewdescription;
    
    content.diagramType="";
    content.nodeType=viewnodeType;
    content.nodeId=viewnodeId;
    content.adminState=viewadminState;
     
	$.ajax({
		url : 'rest/nodes',
		type : 'POST',
		dataType : "json",
        contentType : "application/json",
		data : JSON.stringify(content),
		success : function(result) {
			$('#viewnodeModal').modal('hide');
			alert("success to add node");
			if (vis_callback  != null)
			{
				vis_data.id = vis_autogenNodeId++;
				vis_data.title= "name:" + content.name + "<br/>ip:" + content.nodeId + "<br/>state:" + content.adminState +  "<br/>desc:" + content.description;
				vis_data.nodeType= content.nodeType;
				vis_data.nodeId = content.nodeId;
				vis_data.name = content.name;
				vis_data.label = content.name;
				vis_callback(vis_data);
				vis_callback=null;
			}
			reloadNodeDataTable();
		},
		error : function(result) {
			 
			if (vis_callback  != null)
			{
				vis_callback(null);
				vis_callback=null;
			}
			
			//json = eval("(" + result.responseText + ")");
			
			$.messager.popup("failed to add node"+ result.responseText);
		}
	});
}

function addViewLink(){
	//$("#addLine span").html("");
	var viewname = $("input[name=" + "viewlinkname" + "]").val();
	var viewdescription = $("input[name=" + "viewlinkdescription" + "]").val();
	var viewleftNodeType = $("input[name="+"viewleftNodeType"+"]").val();
	var viewleftNodeId = $("input[name=" + "viewleftNodeId" + "]").val();
	var viewleftTpType = $("input[name="+"viewleftTpType"+"]").val();
	var viewleftTpId = $("input[name=" + "viewleftTpId" + "]").val();
	var viewleftTpDesc = $("input[name="+"viewleftTpDesc"+"]").val();
	var viewrightNodeType = $("input[name="+"viewrightNodeType"+"]").val();
	var viewrightNodeId = $("input[name=" + "viewrightNodeId" + "]").val();
	var viewrightTpType = $("input[name="+"viewrightTpType"+"]").val();
	var viewrightTpId = $("input[name=" + "viewrightTpId" + "]").val();
	var viewrightTpDesc = $("input[name="+"viewrightTpDesc"+"]").val();
	
	var namereg = /^[a-zA-Z][a-zA-Z0-9_-]*$/;
	var reg =/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
	var boolleft=reg.test(viewleftTpId);
	var boolright=reg.test(viewrightTpId);
	var boolname=namereg.test(viewname);
	
	if (viewname == "") {
		$.messager.popup("name cannot be null");
		return false;
	}else if (boolname == false){
		$.messager.popup("name is a combination of letters and numbers,and starts with a letter");
		return false;
	}
	if (viewleftNodeId == "") {
		$.messager.popup("left node name cannot be null");
		return false;
	}
	if (viewleftTpId == "") {
		$.messager.popup("left node ip cannot be null");
		return false;
	}else if (boolleft == false){
		$.messager.popup("left node ip format error");
		return false;
	}
	if (viewrightNodeId == "") {
		$.messager.popup("right node name cannot be null");
		return false;
	}
	if (viewrightTpId == "") {
		$.messager.popup("right node ip cannot be null");
		return false;
	}else if (boolright == false){
		$.messager.popup("right node ip format error");
		return false;
	}

	var content = {};
	content.name=viewname;
    content.description=viewdescription;
    
    content.leftNodeId=viewleftNodeId;
    content.leftTpId=viewleftTpId;
    content.leftNodeType=viewleftNodeType;
    content.leftTpType=viewleftTpType;
    content.leftTpDesc=viewleftTpDesc;
    
    content.rightNodeId=viewrightNodeId;
    content.rightTpId=viewrightTpId;
    content.rightNodeType=viewrightNodeType;
    content.rightTpType=viewrightTpType;
    content.rightTpDesc=viewrightTpDesc;
			
	$.ajax({
		url : 'rest/links',
		type : 'POST',
		dataType : "json",
        contentType : "application/json",
		data : JSON.stringify(content),
		success : function(result) {
			$('#addLine').modal('hide');
			alert("success to add link");
			if (vis_callback  != null)
			{
				vis_data.title = "leftTpId:" + content.leftTpId+"<br/>rightTpId:" +content.rightTpId;
				vis_data.label = content.name;
				vis_callback(vis_data);
				vis_callback=null;
			}
			reloadLinkDataTable();
		},
		error : function(result) {
			if (vis_callback  != null)
			{
				vis_callback(null);
				vis_callback=null;
			}
			
			$.messager.popup("failed to create link" + result.responseText);
		}
	});
}
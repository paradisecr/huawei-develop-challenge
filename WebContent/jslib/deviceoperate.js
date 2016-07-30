/**
 * 
 */
function clearDeviceForm() {
	$("#deviceModal input").each(function(item) {
		$(this).val("");
/*		var node = findNodeByName("addDevice", "Type");
		autoLayoutDemo.box.remove(node);
		autoLayoutDemo.network.setDefaultInteractions();*/
	});
}
function showview() {
	$("#viewDemo").css({
		"display" : "block"
	});
}
function closeViewDemo() {
	$("#viewDemo").css({
		"display" : "none"
	});
}

var columns = new Array(
		 { "mData" : "id", "sClass" : "center" },
		 {
			"mData" : "deviceName",
			"sClass" : "center"
		},
		{
			"mData" : "ipAddress",
			"sClass" : "center"
		},
		{
			"mData" : "port",
			"sClass" : "center"
		},
		{
			"mData" : "userName",
			"sClass" : "center"
		},
		{
			"mData" : "type",
			"sClass" : "center"
		},
		{
			"mData" : "version",
			"sClass" : "center"
		},
		{
			"mData" : "protocol",
			"sClass" : "center"
		},
		{
			"mData" : "state",
			"sClass" : "center",
			"fnRender" : function(data, type, full) {
				adminState = data.aData[8];
				if (adminState == 0) {
					result = '<span class="label label-success">normal</span>';
				} else {
					result = '<span class="label label-warning">sick</span>';
				}
				return result;
			}
		},
		{
			'mData' : 'id',
			'sClass' : 'center',
			"fnRender" : function(data, type, full) {
				var id = type;
				id = data.aData[0];
				
				var result = ' &nbsp<a href="#deviceModal"  data-toggle="modal" class="btn btn-primary"  onclick="loadModifyDevice('
				        + id
				     	+ ')" >'
						+ '<i class="icon-edit icon-white"></i>Edit</a> &nbsp'
						+ '<a class="btn btn-danger" href="javascript:void(0)" onclick="deleteDevice('
						+ id
						+ ')" >'
						+ '<i class="icon-trash icon-white"></i>Delete</a>';
				return result;
			}
		});


function loadAddDevice() {
	$('#modifyDeviceModalLabel').hide();
	$('#addDeviceModalLabel').show();
	$('#deviceidgroup').hide();
}

function loadModifyDevice(deviceid) {

	$('#addDeviceModalLabel').hide();
	$('#modifyDeviceModalLabel').show();
	$('#deviceidgroup').show();
	$.ajax({
		url : "rest/devices/" + deviceid,
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
		 
			$.messager.popup("load modify domain failed : " + result.responseText);
			 
		}
	});
}

function summitDevice() {
	
	var isadd = $('#addDeviceModalLabel').is(':visible');
	var ismodify =  $('#modifyDeviceModalLabel').is(':visible');
	if (isadd) {
		addDevice();
	} else {
		modifyDevice();
	}
	
}

function findNodeByName(NodeName, flag) {
	var nameFinder = new twaver.QuickFinder(this.autoLayoutDemo.box, flag,
			"client");
	var node = nameFinder.findFirst(NodeName);
	return node;
}

function modifyDevice()
{
	//$("deviceModal span").html("");
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
	
	var namereg = /^[a-zA-Z][a-zA-Z0-9_-]*$/;
//	var passwordreg = /^[a-zA-Z0-9]{6,20}$/;
	var reg =/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
	var portreg=/^[0-9]*$/;
	var bool=reg.test(ip);
	var boolname=namereg.test(name);
	var boolusername=namereg.test(username);
//	var boolpasswrd=passwordreg.test(passwd);
	var boolport=portreg.test(port);
	
	if (name == "") {
		$.messager.popup("name can not be null");
		 
		return false;
	}else if (boolname == false){
		$.messager.popup("name is a combination of letters and numbers,and starts with a letter");
		return false;
	}
	if (ip == "") {
		$.messager.popup("ip can not be null");
		return false;
	}else if (bool == false){
		$.messager.popup("ip format error");
		return false;
	}
	if (port == "") {
		$.messager.popup("port cannot be null");
		return false;
	}else if(boolport == false){
		$.messager.popup("port must be numbers");
		return false;
	}
	if (username == "") {
		$.messager.popup("username can not be null");
		return false;
	}else if (boolusername == false){
		$.messager.popup("username is a combination of letters and numbers,and starts with a letter");
		return false;
	}
	if (passwd == "") {
		$.messager.popup("password can not be null");
		return false;
	}
 
	if (version == "") {
		$.messager.popup("version can not be null");
		return false;
	}
	if (productType == "") {
		$.messager.popup("product type ca nnot be null");
		return false;
	}
	if (state == "") {
		$.messager.popup("state can not be null");
		return false;
	}
	if (protocol == "") {
		$.messager.popup("protocol can not be null");
		return false;
	}
	
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
		url : "rest/devices",
		type : 'PUT',
		dataType : "json",
        contentType : "application/json",
		data : JSON.stringify(content),
		success : function(result) {
			
			// 重新加载数据
			reloadDataTable();
 
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

function addDevice() {
	//$("deviceModal span").html("");
	var name = $("input[name='devicename']").val();
	var ip = $("input[name='ip']").val();
	var username = $("input[name='username']").val();
	var passwd = $("input[name='passwd']").val();
	var version = $("input[name='version']").val();
	var port = $("input[name='port']").val();
	var productType = $("input[name='productType']").val();
	var state = $("input[name='status']").val();
	var protocol = $("input[name='protocol']").val();
	
	var namereg = /^[a-zA-Z][a-zA-Z0-9_-]*$/;
//	var passwordreg = /^[a-zA-Z0-9]{6,20}$/;
	var reg =/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
	var portreg=/^[0-9]*$/;
	var bool=reg.test(ip);
	var boolname=namereg.test(name);
	var boolusername=namereg.test(username);
//	var boolpasswrd=passwordreg.test(passwd);
	var boolport=portreg.test(port);
	
	if (name == "") {
		$.messager.popup("name can not be null");
		return false;
	}else if (boolname == false){
		$.messager.popup("name is a combination of letters and numbers,and starts with a letter");
		return false;
	}
	if (ip == "") {
		$.messager.popup("ip can not be null");
		return false;
	}else if (bool == false){
		$.messager.popup("ip format error");
		return false;
	}
	if (port == "") {
		$.messager.popup("port can not be null");
		return false;
	}else if(boolport == false){
		$.messager.popup("port must be numbers");
		return false;
	}
	if (username == "") {
		$.messager.popup("username can not be null");
		return false;
	}else if (boolusername == false){
		$.messager.popup("username is a combination of letters and numbers,and starts with a letter");
		return false;
	}
	if (passwd == "") {
		$.messager.popup("password can not be null");
		return false;
	}
 
	if (version == "") {
		$.messager.popup("version can not be null");
		return false;
	}
	if (productType == "") {
		$.messager.popup("product type can not be null");
		return false;
	}
	if (state == "") {
		$.messager.popup("state can not be null");
		return false;
	}
	if (protocol == "") {
		$.messager.popup("protocol can not be null");
		return false;
	}
	
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
 
 
	$.ajax({
		"dataType" : 'json',
		url : "rest/devices",
		type : 'POST',
		dataType : "json",
        contentType : "application/json",
		data : JSON.stringify(content),
		success : function(result) {
			// 重新加载数据
			reloadDataTable();
	/*		var node = findNodeByName("addDevice", "Type");
			node.setName(name);
			node.setClient("name", name);
			node.setClient("nodeId", ipAddress);
			node.setClient("username", username);
			node.setClient("passwd", passwd);
			node.setClient("version", version);
			node.setClient("productType", productType);
			node.setClient("Type", "init");
			autoLayoutDemo.network.setDefaultInteractions();
			autoLayoutDemo.box.removeDataBoxChangeListener();
			$("#addDevice").modal('hide');
			$("#addDevice input").each(function(item) {
				$(this).val("");
			});*/
			
			$("#deviceModal").modal('hide');
			$("#deviceModal input").each(function(item) {
				$(this).val("");
			});
		},
		error : function(result) {
			/*$("#addDevice input").each(function(item) {
				$(this).val("");
			});*/
			
			$.messager.popup("add device failed : " + result.responseText);
			 
		}
	});
}
 
function deleteDevice(id) {
 
    $.messager.confirm('Confirm', 'Are you sure to delete device ' + id + ' ? ', function() { 
   	 
    	$.ajax({
			url : 'rest/devices/' + id,
			type : 'DELETE', 
			success : function(response) {
				if (response.status == "ok") {
					reloadDataTable();
				}
			},
			error : function(response) {
				
				setCodeInfo(
						
						"Boolean ret = deleteDevice.delete()",
						"DELETE", url, "",
						response.responseText);
			}
		});
		 
    });
    
}

function getDevices() {
	initDevicesList();
}

// reload data table
function reloadDataTable() {
	$("#deviceManage table").dataTable().fnClearTable();
	$.get("rest/devices", function(data) {
		aaData = packagingdevicedatatabledata(data);
		$("#deviceManage table").dataTable().fnAddData(aaData, true); // 数据必须是json对象或json对象数组
	});
}

// data table install
function packagingdevicedatatabledata(resp, statusData) {
	var data = resp.devices;
	var aaData = [];
	if (data == null) {
		return aaData;
	}
	for (var i = 0; i < data.length; i++) {
		var sortdata = [];
		sortdata.push(data[i].id);
		sortdata.push(data[i].deviceName);
		sortdata.push(data[i].ipAddress);
		sortdata.push(data[i].port);
		sortdata.push(data[i].userName);
		sortdata.push(data[i].type);
		sortdata.push(data[i].version);
		sortdata.push(data[i].protocol);

		if (data[i].state == 'true') {
			sortdata.push(0);
		} else {

			sortdata.push(1);
		}  
		sortdata.push(data[i].id);
		aaData.push(sortdata);
	}
	return aaData;
}

 

$('#deviceModal').on('show', function() {
	$('#deviceManage').modal('hide');
})

$('#deviceModal').on('hide', function() {
	$('#deviceManage').modal('show');
})

// init device table data
function initDevicesList() {

	$("#deviceManage table").dataTable({
		"bPaginate" : false,
		"bLengthChange" : false,
		"bFilter" : false,
		"bInfo" : false,
		"bRetrieve" : true,
		"bProcessing" : true,
		"aoColumns" : columns,
		"sAjaxSource" : "rest/devices",
		"fnServerData" : function(sSource, aDataSet, fnCallback) {
			$.ajax({
				"dataType" : 'json',
				"type" : "GET",
				"url" : sSource,
				"success" : function(resp) {
					aaData = packagingdevicedatatabledata(resp);
					fnCallback({
						"aaData" : aaData
					});
				}
			});
		}
	});
}
 
// 代码示例
setCodeInfo = function(api, method, url, requestBody, responseBody) {
	$(".api").empty();
	$(".method").empty();
	$(".url").val("");
	$(".req").val("");
	$(".rep").val("");

	$(".api").append(api);
	$(".method").append(method);
	$(".url").val(url);
	$(".req").val(requestBody);
	$(".rep").val(responseBody);
}

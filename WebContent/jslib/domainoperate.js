/**
 * topology operate javascript
 */
var current_topology = '1';

$(document).ready(function(){

	current_topology = $.cookie('current_topology')==null ? '1' :$.cookie('current_topology');
	resetTopologymenu();
	//loadTopologyReady();
	switch_topology(current_topology);
});

function resetTopologymenu()
{
	var language = $("#lang").val();
	var currenturl = "index.jsp?lang=" + current_language;
	$('#topologymenu').empty();
	loadTopologyReady();
	//$('#topologymenu').append('<li><a data-value="default" href="' + currenturl + '"><i class="icon-blank"></i> Default</a></li>');
}

function select_topologymenu()
{
	$('#topologymenu i').removeClass('icon-ok');
	$('#topologymenu a[data-value="'+ current_topology +'"]').find('i').addClass('icon-ok');
	
	$.ajax({
		dataType : 'json',
		type : "GET",
		url : 'rest/domains/'+ current_topology,
		success : function(result) {
			if (result != null) {
				var data = result.name;
				$("#topoconfigspan").html("-" + data);
			}
		}, 
		error : function(result) {
		}
	});
}

function switch_topology(topologyid)
{
	 
}

function loadTopologyReady() {
	
	/*$.ajax({
		dataType : 'json',
		type : "GET",
		url : 'rest/domains',
		success : function(resp) {
			var data = resp.domains;
			var language = $("#lang").val();
			var currenturl = "index.jsp?lang=" + current_language;
			if (data != null) {
				for (var i = 0; i < data.length; i++) {
					$('#topologymenu').append('<li><a data-value="' + data[i].id + '" href="'+ currenturl + '"><i class="icon-blank"></i> ' + data[i].name + '</a></li>');
				}
				select_topologymenu();
				$('#topologymenu a').click(function(e){
					//e.preventDefault();
					current_topology=$(this).attr('data-value');
					$.cookie('current_topology',current_topology,{expires:365});
					select_topologymenu(current_topology);
					switch_topology(current_topology);
				});
				 
			}
		}, 
		error : function(result) {
			// todo log
			switch_topology("default")
		}
	});*/
}

function clearDomainForm() {
	$("#domainModal input").each(function(item) {
		$(this).val("");
	});
}

var domainsColumns = new Array(
		{
			"mData" : "id",
			"sClass" : "center"
		},
		{
			"mData" : "name",
			"sClass" : "center"
		},
		{
			"mData" : "type",
			"sClass" : "center"
		},
		{
			"mData" : "server",
			"sClass" : "center"
		},
		{
			"mData" : "devices",
			"sClass" : "center"
		},
		{
			'mData' : 'id',
			'sClass' : 'center',
			"fnRender" : function(data, type, full) {
				var id = type;
				id = data.aData[0];

				var result = ' &nbsp<a href="#domainModal" data-toggle="modal" class="btn btn-primary" onclick="loadModifyDomain('
						+ id
						+ ')" >'
						+ '<i class="icon-edit icon-white"></i>Edit</a> &nbsp'
						+ '<a class="btn btn-danger" href="javascript:void(0)" onclick="deleteDomain('
						+ id
						+ ')" >'
						+ '<i class="icon-trash icon-white"></i>Delete</a>';
				return result;
			}
		});

function loadAddDomain() {
	$('#modifyDomainModalLabel').hide();
	$('#addDomainModalLabel').show();
	$('#domainidgroup').hide();
	$('#domaintype').empty();
	
	/*$.ajax({
		dataType : 'json',
		type : "GET",
		url : 'rest/components',
		success : function(resp) {
			var data = resp;
			if (data != null) {
				for (var i = 0; i < data.length; i++) {
					$('#domaintype').append('<option value="'+data[i].name+'">'+data[i].name+'</option>');
				}
			}
		}, 
		error : function(result) {
			// todo log
			//switch_topology("default")
		}
	});*/
	
	var dataArr = ["manual","networkte","ospf"];
	for (var i = 0; i < dataArr.length; i++) {
		$('#domaintype').append('<option value="'+dataArr[i]+'">'+dataArr[i]+'</option>');
	}
	
	
	
}

function loadModifyDomain(domainid) {

	$('#addDomainModalLabel').hide();
	$('#modifyDomainModalLabel').show();
	$('#domainidgroup').show();
	$('#domaintype').empty();
	$.ajax({
		url : "rest/domains/" + domainid,
		type : 'GET',
		dataType : "json",
		contentType : "application/json",
		success : function(result) {
		 
			var id = result.id;
			var name = result.name;
			var description = result.description;
			var type = result.type;
			var devices = result.devices;
			var server = result.server;
			var configure = result.configure;
			$("input[name='domainname']").val(name);
			$('#domaintype').append('<option value="'+type+'">'+type+'</option>');
			$("input[name='servertype']").val(server);
			$("input[name='devicestype']").val(devices);
			$('#topoconfigure').val(configure);
			$("input[name='domaindescription']").val(description);
			$("input[name='domainid']").val(id);
		},
		error : function(result) {
			/*
			 * $("#addDevice input").each(function(item) { $(this).val(""); });
			 */
			 $.messager.popup("load modify domain failed : " + result.responseText);
			 
		}
	});
}

function summitDomain() {
	
	var isadd = $('#addDomainModalLabel').is(':visible');
	var ismodify =  $('#modifyDomainModalLabel').is(':visible');
	if (isadd) {
		addDomain();
	} else {
		modifyDomain();
	}
	
}

function modifyDomain() {
	//$("#domainModal span").html("");
	var name = $("input[name='domainname']").val();
	var type = $('#domaintype').val();
	var server = $("input[name='servertype']").val();
	var devices = $("input[name='devicestype']").val();
	var configure = $('#topoconfigure').val();
	var description = $("input[name='domaindescription']").val();
	var domainid = $("input[name='domainid']").val();

	var namereg = /^[a-zA-Z][a-zA-Z0-9_-]*$/;
	var boolname=namereg.test(name);
	
	if (name == "") {
		 $.messager.popup("name cannot be null");
		return false;
	}else if (boolname == false){
		$.messager.popup("name is a combination of letters and numbers,and starts with a letter");
		return false;
	}
	if (server == "" && type != "manual") {
		$.messager.popup("server cannot be null");
		return false;
	}
	if (devices == "" && type != "manual") {
		$.messager.popup("devices cannot be null");
		return false;
	}
	
	var content = {};
	content.name = name;
	content.type = type;
	content.server = server;
	content.devices = devices;
	content.configure = configure;
	content.description = description; 
	content.id = domainid;
 
	$.ajax({
		"dataType" : 'json',
		url : "rest/domains",
		type : 'PUT',
		dataType : "json",
		contentType : "application/json",
		data : JSON.stringify(content),
		success : function(result) {
			
			// 重新加载数据
			reloadDomainDataTable();
			
			$("#domainModal").modal('hide');
			$("#domainModal input").each(function(item) {
				$(this).val("");
			});
			$('#topoconfigure').val("");
			$('#domaintype').val("");
		},
		error : function(result) {
			$.messager.popup("modify domain failed : " + result.responseText);
		}
	});

}


function addDomain() {
	//$("#domainModal span").html("");
	var name = $("input[name='domainname']").val();
	var type = $("select[name='domaintype']").val();
	var server = $("input[name='servertype']").val();
	var devices = $("input[name='devicestype']").val();
	var configure = $("input[name='topoconfigure']").val();
	var description = $("input[name='domaindescription']").val();
	
	var namereg = /^[a-zA-Z][a-zA-Z0-9_-]*$/;
	var boolname=namereg.test(name);
	
	if (name == "") {
		$.messager.popup("name can not be null");
		return false;
	}else if (boolname == false){
		$.messager.popup("name is a combination of letters and numbers,and starts with a letter");
		return false;
	}
	if (server == "" && type != "manual") {
		$.messager.popup("server can not be null");
		return false;
	}
	if (devices == "" && type != "manual" ) {
		$.messager.popup("devices can not be null");
		return false;
	}

	var content = {};
	content.name = name;
	content.type = type;
	content.server = server;
	content.devices = devices;
	content.configure = configure;
	content.description = description;
	
	$.ajax({
		"dataType" : 'json',
		url : "rest/domains",
		type : 'POST',
		dataType : "json",
		contentType : "application/json",
		data : JSON.stringify(content),
		success : function(result) {

			// 重新加载数据
			reloadDomainDataTable();
 
			$("#domainModal").modal('hide');
			$("#domainModal input").each(function(item) {
				$(this).val("");
			});
			$('#topoconfigure').val("");
			$('#domaintype').val("");
		},
		error : function(result) {
	 
			$.messager.popup("add domain failed : " + result.responseText);
		}
	});
}

function deleteDomain(id) {

    $.messager.confirm("Confirm", "are you sure to delete domain " + id + " ?", function() { 
   	 
    	$.ajax({
			url : 'rest/domains/' + id,
			type : 'DELETE',
			success : function(response) {
				if (response.status == "ok") {
					reloadDomainDataTable();
				}
			},
			error : function(response) {

				setCodeInfo(

				"Boolean ret = deleteDomain.delete()",
						"DELETE", url, "",
						response.responseText);
			}
		});
    });
  
}

// reload data table
function reloadDomainDataTable() {
	$("#domainManage table").dataTable().fnClearTable();
	$.get("rest/domains", function(data) {
		aaData = packagingDomainsTable(data);
		$("#domainManage table").dataTable().fnAddData(aaData, true); // 数据必须是json对象或json对象数组
	});
}

// data table install
function packagingDomainsTable(resp, statusData) {

	var data = resp.domains;
	var aaData = [];
	if (data == null) {
		return aaData;
	}
	for (var i = 0; i < data.length; i++) {
		var sortdata = [];
		sortdata.push(data[i].id);
		sortdata.push(data[i].name);
		sortdata.push(data[i].type);
		sortdata.push(data[i].server);
		sortdata.push(data[i].devices);
		sortdata.push(data[i].id);
		aaData.push(sortdata);
	}
	return aaData;
}

$('#domainModal').on('show', function() {
	$('#domainManage').modal('hide');
})

$('#domainModal').on('hide', function() {
	$('#domainManage').modal('show');
})

// init device table data
function initDomainList() {

	$("#domainManage table").dataTable({
		"bPaginate" : false,
		"bLengthChange" : false,
		"bFilter" : false,
		"bInfo" : false,
		"bRetrieve" : true,
		"bProcessing" : true,
		"aoColumns" : domainsColumns,
		"sAjaxSource" : "rest/domains",
		"fnServerData" : function(sSource, aDataSet, fnCallback) {
			$.ajax({
				"dataType" : 'json',
				"type" : "GET",
				"url" : sSource,
				"success" : function(resp) {
					aaData = packagingDomainsTable(resp);
					fnCallback({
						"aaData" : aaData
					});
				}
			});
		}
	});
}
 

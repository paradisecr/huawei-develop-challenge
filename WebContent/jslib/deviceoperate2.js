/**
 * 
 */
/*function clearForm(){
	$("#addDevice input").each(function(item){
		$(this).val("");
		var node=findNodeByName("addDevice","Type");
		autoLayoutDemo.box.remove(node);
		autoLayoutDemo.network.setDefaultInteractions();
	});
}
 function showview(){
	 $("#viewDemo").css({"display":"block"});
 }
 function closeViewDemo(){
	 $("#viewDemo").css({"display":"none"});
 }

 var columns = new Array(
		{
			"mData" : "username",
			"sClass" : "center"
		},{
			"mData" : "devicename",
			"sClass" : "center"
		},
		{
			"mData" : "ip",
			"sClass" : "center"
		},
		{
			"mData" : "version",
			"sClass" : "center"
		},
		{
			"mData" : "productType",
			"sClass" : "center"
		},
		{
			"mData" : "status",
			"sClass" : "center",
			"fnRender" : function(data, type, full) {
				status= data.aData[5];
				if(status==0){
					result = '<span class="label label-success">normal</span>';
				}else{
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
				id= data.aData[6];
				var result = '<a class="btn btn-success" href="javascript:void(0)" onclick="testDevice('+id+')">'
				+'<i class="icon-zoom-in icon-white"></i>Test</a>'
				+'<a class="btn btn-info" href="javascript:void(0)">'
				+'<i class="icon-edit icon-white"></i>Edit</a>'
			    +'<a class="btn btn-danger" href="javascript:void(0)" onclick="deleteDevice('+id+')" >'
				+'<i class="icon-trash icon-white"></i>Delete</a>';
					return result;
				}
			});*/
/*function findNodeByName(NodeName,flag){
	 var nameFinder = new twaver.QuickFinder(this.autoLayoutDemo.box, flag, "client");
	 var node =nameFinder.findFirst(NodeName);
	 return node;
 }*/
/* function addDevice(){
	 var devicename = $("input[name='devicename']").val();
	 var ip = $("input[name='ip']").val();
	 var username= $("input[name='username']").val();
	 var passwd = $("input[name='passwd']").val();
	 var version = $("input[name='version']").val();
	 var productType = $("input[name='productType']").val();
	 var content = '{"device": { "username": "'+username+'", "passwd": "'+passwd+'", "ip": "'+ip+'", "devicename": "'+devicename+'", "version": "'+version+'", "productType": "'+productType+'"}}';
	 $.ajax({"dataType" : 'json',url:"rest/devices",type:'POST',data:content,
		 success:function(result){
			reloadDataTable();
			var node=findNodeByName("addDevice","Type");
			node.setName(devicename);
			node.setClient("devicename",devicename);
			node.setClient("ip",ip);
			node.setClient("username",username);
			node.setClient("passwd",passwd);
			node.setClient("version",version);
			node.setClient("productType",productType);
			node.setClient("Type","init");
			autoLayoutDemo.network.setDefaultInteractions();
			autoLayoutDemo.box.removeDataBoxChangeListener();
			$("#addDevice").modal('hide');
			$("#addDevice input").each(function(item){
				$(this).val("");
			});
		 },
		 error:function(result){
			 $("#addDevice input").each(function(item){
					$(this).val("");
			 });
			 $("#showinfo").showinfo("tooltip",{params:{info:"添加失败"}});
		 }
	 });
 }*/
 /*function testDevice(id){
	 $("#deviceManage table").dataTable().fnClearTable();
	 $.ajax({
         "dataType" : 'json',
		 url:"rest/devices/"+id+"/_restping",
		 type:'GET',
		 timeout:4000,
		 success:function(response){
			 statusData = {};
			 statusData['id']=id;
			 statusData['status']=0;
			 $.get("rest/devices",function(data){
				aaData = packagingdatatabledata(data,statusData);
				$("#deviceManage table").dataTable().fnAddData(aaData,true);  //数据必须是json对象或json对象数组  
			});
		 },
		 error:function(response){
			 statusData = {};
			 statusData['id']=id;
			 statusData['status']=1;
			 $.get("rest/devices",function(data){
				aaData = packagingdatatabledata(data,statusData);
				$("#deviceManage table").dataTable().fnAddData(aaData,true);  //数据必须是json对象或json对象数组  
			 }); 
		 }
	 });
 }*/
 /*function deleteDevice(id){
	 url  = 'rest/devices/'+id;
	 $("#showinfo").showinfo("confirm",{
		 hide:false,
		 params:{
			 showOrhide:{header:false,actions:false},
			 height:"139px",
		 	 width:"200px",
		 	 myinfoLabel:"确认",
		 	 info:"是否要删除?",
		 	 click:function(){
		 		$.ajax({
					 url:url,
					 type:'DELETE',
					 success:function(response){
						if(response.ok){
							reloadDataTable();
						}
					 }
				 });
		 		$("#showinfo").showinfo("confirm",{hide:true});
		 	 }
		 }
	 }
	);
 }*/
/* function getDevices(){
	 initDevicesList();
 }*/
 /*function reloadDataTable(){
	$("#deviceManage table").dataTable().fnClearTable();
	$.get("rest/devices",function(data){
		aaData = packagingdatatabledata(data);
		$("#deviceManage table").dataTable().fnAddData(aaData,true);  //数据必须是json对象或json对象数组  
	});
 }
function packagingdatatabledata(resp,statusData){
 	var data = resp.devices;
	var aaData = [];
	for(var i=0;i<data.length;i++){
		 var sortdata = [];
		 sortdata.push(data[i].device.username);
		 sortdata.push(data[i].device.devicename);
		 sortdata.push(data[i].device.ip);
		 sortdata.push(data[i].device.version);
		 sortdata.push(data[i].device.productType);
		 if(statusData!=null){
			 if(data[i].device.id == statusData.id){
				 sortdata.push(statusData['status']);
			 }else{
				 if(data[i].device.status == "normal"){
					 sortdata.push(0);
				 }else{
					 sortdata.push(1);
				 }
			 }
		 }else{
			 if(data[i].device.status == "normal"){
				 sortdata.push(0);
			 }else{
				 sortdata.push(1);
			 }
		 }
		 
		 sortdata.push(data[i].device.id);
		 aaData.push(sortdata);	
	}
	return aaData;
}
var base = $("base").attr("href");
 $(function(){
	 initDevicesList();
	 
	 $("#delflow select").change(function(){
		 initList();
	 });
	 
	 $('.delFlowTable').dataTable( {    
	        "bProcessing" : false, //DataTables载入数据时，是否显示‘进度’提示    
	        "iDisplayLength" : 5, //默认显示的记录数    
	        "bPaginate" : true, //是否显示（应用）分页器  ,
	        "bLengthChange":false,
	        "bInfo" : false, //是否显示页脚信息，DataTables插件左下角显示记录数    
	        "bSort" : false, //是否启动各个字段的排序功能    
	        "sPaginationType": "bootstrap",
	   	 	"bRetrieve": true,
	        "aaSorting" : [[0, "desc"]], //默认的排序方式，第0列，降序排列    
	        "bFilter" : false, //是否启动过滤、搜索功能    
	         "aoColumns" : [{    
	                "mData" : "beginDevice",    
	                "sTitle" : "源设备",    
	               // "sWidth":"10%",//定义列宽度，以百分比表示    
	                "sDefaultContent" : ""
	            }, {    
	                "mData" : "beginAddress",    
	                "sTitle" : "源地址",    
	                "sDefaultContent" : "" 
	            }, {    
	                "mData" : "endDevice",    
	                "sTitle" : "目的设备",    
	                "sDefaultContent" : ""    
	            },{    
	                "mData" : "endAddress",    
	                "sTitle" : "目的地址",    
	                "sDefaultContent" : ""    
	            },{    
	                "mData" : "",    
	                "sTitle" : "操作",    
	                "sDefaultContent" : "",
	                "fnRender" : function(data, type, full) {
	    				result = '<a class="btn btn-danger" href="javascript:void(0)" id="t'+data.iDataRow+'" onclick="deleteFlow('+data.iDataRow+')" name="'+type+'">Delete</a>';
	    				return result;
	    			}
	            }]
		});
 });
 function initDevicesList(){
	 $("#deviceManage table").dataTable({
	 "bPaginate":false,
	 "bLengthChange": false,
	 "bFilter":false,
	 "bInfo":false,
	 "bRetrieve": true,
	 "bProcessing": true,
	 "aoColumns":columns,
	 "sAjaxSource":"rest/devices",
	 "fnServerData":function(sSource, aDataSet, fnCallback) {    
        $.ajax({    
           "dataType" : 'json',    
           "type" : "GET",    
           "url" : sSource,  
           "success" : function(resp){
        	 aaData = packagingdatatabledata(resp);
             fnCallback({"aaData":aaData});    
               }    
           });    
        }    
	 });
 }*/


//-----初始化-------------------------------------------
/*
 * 初始化设备下拉框
 */
initSourceDeviceCheckbox = function (checkId){
		sourceDeviceCheckbox = $("#"+checkId);
		sourceDeviceCheckbox.empty();
		$.each(nodesList,function(i){
			id = this.getClient("id");
			devicename = this.getClient("devicename");
			option = $("<option></option>").text(devicename).attr("value",id);
			sourceDeviceCheckbox.append(option);
		});
	}
 
//初始加载页面时加载设备
function initService(){
	initSourceDeviceCheckbox("delflow select");
	
	/*$.ajax({
		   type: "POST",
		   async:false,
		   url: "ServiceServlet",
		   data: {
			  
		   },
		   dataType:'text',
		   success: function(msg){
			  var message = eval(msg);
			  var tbody = $("#tunnelList"); 
			  tbody.empty();
			   $.each(message,function(index,element){
				   var id = element.id;
				   var name = element.name;
				   var ip = element.ip;
				   var type = element.type;
				   var ispNumber = element.isp;
				   var showId = "Device"+id+"device";
					var isp = "";
					if(ispNumber == 1){
						isp = "peerISP";
					}else if(ispNumber == 0){
						isp = "localISP";
					}else{
						isp ="";
					}
					
				   var str = "<tr>";
				   str +="<td style='display:none' id='"+id+"'>"+id+"</td>";
				   str += "<td id='"+showId+"'>"+name+"</td>";
				   str += "<td>"+ip+"</td>";
				   str += "<td>"+type+"</td>";
				   str += "<td>"+isp+"</td>";
				   str += "<td id='"+id+"'><input type='button' value='删除' onclick='deleteDevice1(this)'/></td>";
				   str += "<td><input type='button' value='更改' onclick='updateDevice(this)'/></td>";
				   str += "</tr>";
				   tbody.append(str);

			   })
			   
		   },
		   error:function(){
			   
		   }
		});*/
	
} 
 
//---【流操作】---------------------------------------------------------------------------------

//点击时加载连线页面
function initLink(){
	initSourceDeviceCheckbox("delflow select");
	
	
	$.ajax({
		   type: "POST",
		   async:false,
		   url: "LinkServlet",
		   data: {
			   
		   },
		   dataType:'text',
		   success: function(msg){
			  var message = eval(msg);
			  var tbody = $("#linkList"); 
			  tbody.empty();
			   $.each(message,function(index,element){
				   var newid = element.id;
				   var newlinkName = element.linkName;
				   var newleftService = element.leftService;
				   var newleftNode = element.leftNode;
				   var newrightService = element.rightService;
				   var newrightNode = element.rightNode;
				   var newbrandwidth = element.brandwidth;
				   var newthreshold= element.threshold;
				   var newbc0 = element.bc0;
				   var showId = "Link"+newid+"link";
				   var str = "<tr>";
				   str +="<td style='display:none' id='"+newid+"'>"+newid+"</td>";
				   str += "<td id='"+showId+"'>"+newlinkName+"</td>";
				   str += "<td>"+newleftService+"</td>";
				   str += "<td>"+newleftNode+"</td>";
				   str += "<td>"+newrightService+"</td>";
				   str += "<td>"+newrightNode+"</td>";
				   str += "<td>"+newbrandwidth+"</td>";
				   str += "<td>"+newthreshold+"</td>";
				   str += "<td>"+newbc0+"</td>";
				   str += "<td id='"+newid+"'><input type='button' value='删除' onclick='deleteDevice3(this)'/></td>";
				   str += "<td><input type='button' value='更改' onclick='updateLink(this)'/></td>";
				   str += "</tr>";
				   tbody.append(str);
			   })
			   
		   },
		   error:function(){
			   
		   }
		});
	
	$.ajax({
		   type: "POST",
		   async:false,
		   url: "ServiceServlet",
		   data: {
			   
		   },
		   dataType:'text',
		   success: function(msg){
			  var message = eval(msg);
			  
			  var select1 = $("#deviceName1"); 
			  var select2 = $("#deviceName2"); 
			  select1.empty();
			  select2.empty();
			  
			  var option1 = "<option value='"+1+"'>"+"<--- 请  选  择  --->"+"</option>";
			  select1.append(option1);
			  select2.append(option1);
			   $.each(message,function(index,element){
				   var name = element.name;
				   var option2 = "<option value='"+name+"'>"+name+"</option>";
				   select1.append(option2);
				   select2.append(option2);
			   })
			   
		   },
		   error:function(){
			   
		   }
		});
}

/*var dataArrayGre = [];
initList = function(){
	deviceId = $("#delflow select").val();
	dataArrayGre = [];
	//getServiceFlowData(deviceId);
	initTable(dataArrayGre);
}*/

/*getServiceFlowData = function(deleteId){
	$.ajax({
		url:'rest/devices/'+deleteId+'/serviceflow',
		type:'GET',
		dataType:'xml',
		async: false,
		success:function(msg){
      		$(msg).find("flow").each(function(i){
      			//创建flow对象
      			var adata = [];
      			adata.push($(this).children("flowName").text());
      			adata.push($(this).children("flowFilter").children("sourceIP").text());
      			adata.push($(this).children("flowFilter").children("destinationIP").text());
      			actionId = getActionId($(this).children("flowName").text(),msg);
      			adata.push(actionId);
      			dataArrayGre.push(adata);
      		});
		}
	});
}*/

/*getActionId = function(flowName,data){
	var actionId = '';
	$(data).find("flowPolicy").each(function(i){
			//创建flow对象
		if($(this).children("flowName").text() == flowName){
			$(this).find("action").each(function(i){
				if(i != 0){actionId+=','}
				actionId += $(this).children("nodeId").text();
			});
		}
	});
	return actionId;
}

initTable = function(dataArrayGre){
	var delTable = $('.delFlowTable').dataTable();
	delTable.fnClearTable();
	delTable.fnAddData(dataArrayGre,true);
	delTable.fnPageChange(0);
}
deleteFlow = function(iDataRow){
	actionId = $("#t"+iDataRow)[0].name;
	flowName = dataArrayGre[iDataRow][0];
	delUrl = 'rest/serviceflow?flowName='+flowName+'&actions='+actionId;
	$("#showinfo").showinfo("confirm",{
		 hide:false,
		 params:{
			 showOrhide:{header:false,actions:false},
			 height:"139px",
		 	 width:"200px",
		 	 myinfoLabel:"确认",
		 	 info:"是否要删除?",
		 	 click:function(){
		 		$.ajax({
					 url:delUrl,
					 type:'DELETE',
					 success:function(response){
						if(response.ok){
							initList();
						}
						setCodeInfo("Boolean ret = servicflow.delete()","DELETE",base+delUrl,"",response.responseText);
					 },error:function(response){
						 setCodeInfo("Boolean ret = servicflow.delete()","DELETE",base+delUrl,"",response.responseText);
					 }
				 });
		 		$("#showinfo").showinfo("confirm",{hide:true});
		 	 }
		 }
	 }
	);
}*/
//---[创建流]--------------------------------------------------------------

initPort = function(){
	
	initSourceDeviceCheckbox("createServiceFlow");
	
	$.ajax({
		   type: "POST",
		   async:false,
		   url: "PortServlet",
		   data: {
			   
		   },
		   dataType:'text',
		   success: function(msg){
			  var message = eval(msg);
			  var tbody = $("#portList"); 
			  tbody.empty();
			  
			  
			   $.each(message,function(index,element){
				   var newuid = element.uid;
				   var newdeviceName = element.deviceName;
				   var newportName = element.portName;
				   var newip = element.ip;
				   var newfunc_tion = element.func_tion;
				   var showId = "Port"+newuid+"port";
				   var str = "<tr>";
				   str +="<td style='display:none' id='"+newuid+"'>"+newuid+"</td>";
				   str += "<td>"+newdeviceName+"</td>";
				   str += "<td id='"+showId+"'>"+newportName+"</td>";
				   str += "<td>"+newip+"</td>";
				   /*str += "<td>"+newthreshold+"</td>";*/
				  /* str += "<td>"+newfunc_tion+"</td>";*/
				   str += "<td id='"+newuid+"'><input type='button' value='删除' onclick='deleteDevice2(this)'/></td>";
				   str += "<td><input type='button' value='更改' onclick='updatePort(this)'/></td>";
				   str += "</tr>";
				   tbody.append(str);
				   
			   })
			   
		   },
		   error:function(){
			   
		   }
		});
	    
	$.ajax({
		   type: "POST",
		   async:false,
		   url: "ServiceServlet",
		   data: {
			   
		   },
		   dataType:'text',
		   success: function(msg){
			  var message = eval(msg);
			  var select = $("#deviceName"); 
			  select.empty();
			   $.each(message,function(index,element){
				   //var id = element.id;
				   var name = element.name;
                
				   var option = "<option value='"+name+"'>"+name+"</option>";
				   select.append(option);
			   })
			   
		   },
		   error:function(){
			   
		   }
		});
	   
	
};

//点击SNC时加载SNC页面
function initSnc(){
	var showValue = "showValue";
	
	$.ajax({
		type:"POST",
	    async:false,
	    url:"SncServlet",
	    data:{
	    	"showValue":showValue,
	    },
	    dataType:'text',
	    success:function(msg){
	    	var message = eval(msg);
	    	
	    	$.each(message,function(index,element){
	    		var showId = element.id;
	    		var showIp = element.sncIpAddress;
	    		var showPort = element.sncPort;
	    		var showUser = element.sncUser;
	    		var showPassword = element.sncPassword;
	    		
	    		document.getElementById("sncId").innerHTML = showId;
	    		document.getElementById("sncIpAddress").value = showIp;
	    		document.getElementById("sncPort").value = showPort;
	    		document.getElementById("sncUser").value = showUser;
	    		document.getElementById("sncPassword").value = showPassword;
	    	});
	    }
	});
}

//点击Utraffic时加载的页面
function initUtraffic(){
	
	var showValue = "showValue";
		
	$.ajax({
		type:"POST",
		async:false,
		url:"UtrafficServlet",
		data: {
			"showValue":showValue,
		},
		dataType:'text',
		success:function(msg){
			var message = eval(msg);
			
			$.each(message,function(index,element){
				var showId = element.id;
				var showUtrSerAddress = element.utrSerAddress;
				var showUtrUser = element.utrUser;
				var showUtrPassword = element.utrPassword;
				var showSftpAddress = element.sftpAddress;
				var showSftpPort = element.sftpPort;
				var showSftpUser = element.sftpUser;
				var showSftpPassword = element.sftpPassword;
				
				var num = showUtrSerAddress.indexOf("//");
				var num2 = showUtrSerAddress.lastIndexOf(":");
				var strLength = showUtrSerAddress.length; 
				var utrSerIp = showUtrSerAddress.substring(num+2,num2);
				var utrSerPort = showUtrSerAddress.substring(num2+1,strLength+1);
				
				document.getElementById("utrId").innerHTML = showId;
				document.getElementById("utrSerAddressIp").value = utrSerIp;
				document.getElementById("utrSerAddressPort").value = utrSerPort;
				document.getElementById("utrUser").value = showUtrUser;
				document.getElementById("utrPassword").value = showUtrPassword;
				document.getElementById("sftpAddress").value = showSftpAddress;
				document.getElementById("sftpPort").value = showSftpPort;
				document.getElementById("sftpUser").value = showSftpUser;
				document.getElementById("sftpPassword").value = showSftpPassword;
			});
		}
	});
}

//点击自动调优时加载策略页面
function initStrategy(){ 
	
	$.ajax({
		type: "POST",
		async:false,
		url: "StrategyServlet",
	    data: {
	    	
	    },
	    dataType:'text',
	    success:function(msg){
	    	var message = eval(msg);
	    	var tbody = $("#strategyList");
	    	tbody.empty();
	    	
	    	$.each(message,function(index,element){
	    		var showId = element.id;
	    		var showName = element.name;
	    		var getTarget = element.target;
	    		var getRange = element.range;
	    		var show = "Strategy"+showId+"strategy";
	    		var showTarget = "";
				var showRange = "";
				
				if(getTarget=="bandwidth-balance"){
					showTarget = "带宽均衡调整";
				}else if(getTarget=="user-defined-lowest"){
					showTarget = "链路价格最低调整";
				}
				
				if(getRange=="adjust-unconditioned-flows"){
					showRange = "越限流调整";
				}else if(getRange=="adjust-all-flow"){
					showRange = "全局流调整";
				}
	    		var str = "<tr>";
		    		str += "<td style='display:none' id='"+showId+"'>"+showId+"</td>";
		    		str += "<td id=''>"+"<label class='checkbox-inline'><input type='radio' name='"+showId+"' id='"+showId+"' value='"+showId+"'/></label>"+"</td>";
		    		str += "<td id='"+show+"'>"+showName+"</td>";
		    		str += "<td>"+showTarget+"</td>";
		    		str += "<td>"+showRange+"</td>";
		    		str += "<td>"+"<input type='button' value='删除' onclick='deleteStrategy(this)'/>"+"</td>";
		    		str += "<td>"+"<input type='button' value='更改' onclick='updateStrategy(this)'/>"+"</td>";
		    		str +="</tr>";
	    		
	    		tbody.append(str);
	    	});
	    },
	    
	    error:function(){
	    	
	    }
	});
}

//点击手动调优时加载手动调优的页面
function initOptimize(){
	$.ajax({
		type: "POST",
		async:false,
		url: "LinkServlet",
	    data: {
	    	
	    },
	    dataType:'text',
	    success:function(msg){
	    	var message = eval(msg);
	    	var optimizeTarget = $("#fromLinkName");
	    	var optimizeRange = $("#toLinkName");
	    	optimizeTarget.empty();
	    	optimizeRange.empty();
	    	
	    	$.each(message,function(index,element){
	    		var newlinkName = element.linkName;	
	    		var  str = "<option value='"+newlinkName+"'>"+newlinkName+"</option>";
	            
	            optimizeTarget.append(str);
	            optimizeRange.append(str);
	    	});
	    },
	    
	    error:function(){
	    	
	    }
	});
}


/*function initTunnelInfo(){
	var serviceFlow=$("#createServiceFlow").find("option:selected").text();
	$("#selecttunnel").empty().append('<option>--请选择--</option>');
	for(var i=0;i<nodesList.length;i++){
		if(nodesList[i].getName()==serviceFlow){
			for(var j=0;j<nodesList[i].getClient("gre").length;j++){
				var tun=nodesList[i].getClient("gre")[j];
				option = $("<option></option>").text(tun.tunnelName).attr("value",tun.destinationNodeId);
				$("#selecttunnel").append(option);
			}
		}
	}
}

//下一步
var createFlowForm = ["flowName","sourceIP","destinationIP","sourcePrefix","destinationPrefix","sourcePort","destinationPort","protocolId","nodeId","ifName"];
var xmlCreatFlow = $("<servicflow><flows><flow><flowName></flowName><filterType></filterType><filterTemplateType></filterTemplateType><flowFilter><sourceIP></sourceIP><destinationIP></destinationIP><sourcePrefix></sourcePrefix><destinationPrefix></destinationPrefix><sourcePort></sourcePort><destinationPort></destinationPort><sourcemask></sourcemask><destinationmask></destinationmask><protocolId></protocolId><as></as><vlanId></vlanId><vlanPriority></vlanPriority></flowFilter></flow></flows><flowPolicys><flowPolicy><policyName></policyName><flowName></flowName><actions></actions><tpType>tpType</tpType><tpId>0</tpId></flowPolicy></flowPolicys></servicflow>");
var xmlAction = $("<action><nodeId></nodeId><ifName></ifName></action>");
var xmlActions = "";
var pageflow = 0;
nextFlow = function(){
	nodeId = $("select[name="+createFlowForm[8]+"]").val();
	ifName = $("select[name="+createFlowForm[9]+"]").find("option:selected").text();
	destNodeId = $("select[name="+createFlowForm[9]+"]").find("option:selected").val();
	if(ifName == "--请选择--"){
		$("#showinfo").showinfo("tooltip",{params:{info:"请选择管道"}});
		return false;
	}
	flag = isUsedDeviceNode(destNodeId);
	if(flag){
		$("#showinfo").showinfo("tooltip",{params:{info:"产生了闭环"}});
		$("select[name="+createFlowForm[9]+"]").val("--请选择--");
		return false;
	}
	if(pageflow ==$(xmlActions).length){
		xmlAction.find("nodeId").text(nodeId);
		xmlAction.find("ifName").text(ifName);
		xmlActions +=xmlAction[0].outerHTML;
	}
	pageflow++;
	changeNextDevcieAndTunnel(nodeId);
	if(pageflow<$(xmlActions).length){
		actionInfoPrev = $($(xmlActions)[pageflow]);
		nodeidPrev = actionInfoPrev.children("nodeId").text();
		ifnamePrev = actionInfoPrev.children("ifName").text();
		items = $("select[name="+createFlowForm[9]+"]")[0].options;
		$.each(items,function(){
			if(this.text == ifnamePrev){
				$("select[name="+createFlowForm[9]+"]").val(this.value);
				return false;
			}
		});
	}
}*/


/*function isUsedDeviceNode(destNodeIp){
	flag = false;
	var nextNid = "";
	$.each(nodesList,function(){
		ip = this.getClient("ip");
		if(ip == destNodeIp){
			nextNid = this.getClient("id");
			return false;
		}
	});
	$(xmlActions).each(function(i){
		id = $(this).find("nodeId").text();
		if(id == nextNid){
			flag = true;
			return false;
		}
	});
	return flag;
}
changeNextDevcieAndTunnel =function(nodeId){
	destinationNodeId = $("select[name="+createFlowForm[9]+"]").val();
	$.each(nodesList,function(){
		ip = this.getClient("ip");
		if(ip == destinationNodeId){
			id = this.getClient("id");
			$("select[name="+createFlowForm[8]+"]").val(id);
			changeTunnelCheckbox(id);
			return false;
		}
	});
}
changeTunnelCheckbox = function (did){
	ifName = $("select[name="+createFlowForm[9]+"]");
	ifName.empty().append('<option>--请选择--</option>');
	$.ajax({
      	url:'rest/devices/'+did+'/utunnel',
      	type:'GET',
      	dataType:'xml',
		async: false,
      	success:function(msg){
      		$(msg).find("tunnel").each(function(i){
      			//创建tunnel对象
      			tunnelName=$(this).children("tunnelName").text();
      			destinationNodeId=$(this).children("destinationNodeId").text();
    			option = $("<option></option>").text(tunnelName).attr("value",destinationNodeId);
    			ifName.append(option);
      		});
      	}
    });
}
//上一步
function prevFlow(){
	pageflow--;
	if(pageflow<0){
		$("#showinfo").showinfo("tooltip",{params:{info:"当前已是第一步"}});
		pageflow = 0;
		return false;
	}
	actionInfoPrev = $($(xmlActions)[pageflow]);
	nodeidPrev = actionInfoPrev.children("nodeId").text();
	ifnamePrev = actionInfoPrev.children("ifName").text();
	$("select[name="+createFlowForm[8]+"]").val(nodeidPrev);
	changeTunnelCheckbox(nodeidPrev);
	items = $("select[name="+createFlowForm[9]+"]")[0].options;
	$.each(items,function(){
		if(this.text == ifnamePrev){
			$("select[name="+createFlowForm[9]+"]").val(this.value);
			return false;
		}
	});
}

function tunnelInfo(){
	var selecttunnel=$("#selecttunnel").find("option:selected").text();
	$(".autogrow").empty();
	for(var i=0;i<nodesList.length;i++){
		for(var j=0;j<nodesList[i].getClient("gre").length;j++){
			var tun=nodesList[i].getClient("gre")[j];
			if(tun.tunnelName==selecttunnel){
				$(".autogrow").append('隧道名称：'+tun.tunnelName+"\r\n"+'隧道类型：'+tun.tunnelType+'源IP：'+tun.sourceNodeId+'目的IP：'+tun.destinationNodeId);
			}
		}
	}
	if(pageflow<$(xmlActions).length){
		$(xmlActions).each(function(i){
			if(i>=pageflow){
				xmlActionHtml = this.outerHTML;
				xmlActions = xmlActions.replace(xmlActionHtml, "");
			}
		});
	}
}



//应用
submitFlow = function(){
	flowName = $("input[name="+createFlowForm[0]+"]").val();
	sourceIP = $("input[name="+createFlowForm[1]+"]").val();
	destinationIP = $("input[name="+createFlowForm[2]+"]").val();
	sourcePrefix = $("input[name="+createFlowForm[3]+"]").val();
	destinationPrefix = $("input[name="+createFlowForm[4]+"]").val();
	sourcePort = $("input[name="+createFlowForm[5]+"]").val();
	destinationPort = $("input[name="+createFlowForm[6]+"]").val();
	protocolId = $("select[name="+createFlowForm[7]+"]").val();
	if(flowName == ""){
		$("#showinfo").showinfo("tooltip",{params:{info:"策略名称不能为空"}});
		return false;
	}
	if(sourceIP == ""){
		$("#showinfo").showinfo("tooltip",{params:{info:"源地址不能为空"}});
		return false;
	}
	if(destinationIP == ""){
		$("#showinfo").showinfo("tooltip",{params:{info:"目的地址不能为空"}});
		return false;
	}
	if(sourcePrefix == ""){
		$("#showinfo").showinfo("tooltip",{params:{info:"源反掩码不能为空"}});
		return false;
	}
	if(destinationPrefix == ""){
		$("#showinfo").showinfo("tooltip",{params:{info:"目的反掩码不能为空"}});
		return false;
	}
	if(sourcePort == ""){
		$("#showinfo").showinfo("tooltip",{params:{info:"源端口号不能为空"}});
		return false;
	}
	if(destinationPort == ""){
		$("#showinfo").showinfo("tooltip",{params:{info:"目的端口号不能为空"}});
		return false;
	}
	if(protocolId == ""){
		$("#showinfo").showinfo("tooltip",{params:{info:"协议类型不能为空"}});
		return false;
	}
	xmlCreatFlow.find("flow").children("flowName").text(flowName);
	xmlCreatFlow.find("flowFilter").children("sourceIP").text(sourceIP);
	xmlCreatFlow.find("flowFilter").children("destinationIP").text(destinationIP);
	xmlCreatFlow.find("flowFilter").children("sourcePrefix").text(sourcePrefix);
	xmlCreatFlow.find("flowFilter").children("destinationPrefix").text(destinationPrefix);
	xmlCreatFlow.find("flowFilter").children("sourcePort").text(sourcePort);
	xmlCreatFlow.find("flowFilter").children("sourceIP").text(sourceIP);
	xmlCreatFlow.find("flowFilter").children("destinationPort").text(destinationPort);
	xmlCreatFlow.find("flowFilter").children("protocolId").text(protocolId);
	xmlCreatFlow.find("flowPolicy").children("policyName").text(flowName);
	xmlCreatFlow.find("flowPolicy").children("flowName").text(flowName);
	xmlCreatFlow.find("flowPolicy").children("actions").append(xmlActions);
	$.ajax({
		url:"rest/serviceflow",
		type:'POST',
		data:xmlCreatFlow[0].outerHTML,
		 success:function(result){
			 $.ajax({
					url:"view/formatxml.jsp",
					type:'POST',
					dataType:'text',
					data:{"body":xmlCreatFlow[0].outerHTML},
					success:function(result1){
						 $("#showinfo").showinfo("tooltip",{params:{info:"创建成功"}});
						 setCodeInfo("Boolean ret = servicflow.create()","POST",base+"rest/serviceflow",$(result1)[0].outerHTML,result);
					}
			});
		 },
		 error:function(result){
			 $("#showinfo").showinfo("tooltip",{params:{info:"创建失败"}});
			 setCodeInfo("Boolean ret = servicflow.create()","POST",base+"rest/serviceflow",xmlCreatFlow[0].outerHTML,result);
		 }
	});
	resetFlow();
}*/

//提交设备
function submitFlow1(){
	
	var tunnname1 = $("#tunnname1").val(); 
	var tunnname2 = $("#tunnname2").val(); 
	var tunnname3 = $("#tunnname3").val(); 
	var isp = $("#topnumPR").find("option:selected").val(); 
	var ipdevice = $("#ipdevice");
	var nameDeviceTest = $("#nameDeviceTest");
	
	var resTrs = $(".deviceRR tr");
	var nameArr =[];
	for(var i=0;i<resTrs.length;i++){
		var deviceNameArr = resTrs[i].children[1].innerHTML;
		nameArr.push(deviceNameArr);
	}
	
	ipdevice.hide();
	nameDeviceTest.hide();
	var re = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;  
	var boo_lean = false;
	
	for(var i=0; i<nameArr.length; i++){
		if( !( isNull(tunnname1) ) ){
			if(nameArr[i] != tunnname1){
				boo_lean = true;
			}else{
				boo_lean = false;
				break;
			}
		}
	}
		if(boo_lean){
			
			nameDeviceTest.hide();
			if(re.test(tunnname3)){
				$.ajax({
					type: "POST",
					async:false,
					url: "ServiceServlet",
					data: {
						"tunnname1":tunnname1,
						"tunnname2":tunnname2,
						"tunnname3":tunnname3,
						"isp":isp,
					},
					dataType:'text',
					success: function(msg){
						var message = eval(msg);
						var tbody = $("#tunnelList"); 
						tbody.empty();
						
						$.each(message,function(index,element){
							var id = element.id;
							var name = element.name;
							var ip = element.ip;
							var type = element.type;
							var ispNumber = element.isp;
							var isp = "";
							var showId = "Device"+id+"device";
							if(ispNumber == 1){
								isp = "peerISP";
							}else if(ispNumber == 0){
								isp = "localISP";
							}else{
								isp ="";
							}
							var str = "<tr>";
							str +="<td style='display:none' id='"+id+"'>"+id+"</td>";
							str += "<td id='"+showId+"'>"+name+"</td>";
							str += "<td>"+ip+"</td>";
							str += "<td>"+type+"</td>";
							str += "<td>"+isp+"</td>";
							str += "<td id='"+id+"'><input type='button' value='删除' onclick='deleteDevice1(this)'/></td>";
							str += "<td><input type='button' value='更改' onclick='updateDevice(this)'/></td>";
							str += "</tr>";
							tbody.append(str);
							
						});
					},
					error:function(){
						
					}
				});
			}else{
				ipdevice.show();
			}
			
		}else{
			nameDeviceTest.show();
		}
	
}

//设备重置
function resetFlow1(){
	$("#tunnname1").val(""); 
	$("#tunnname2").val(""); 
	$("#tunnname3").val(""); 
	var ipdevice = $("#ipdevice");
	var nameDeviceTest = $("#nameDeviceTest");
	ipdevice.hide();
	nameDeviceTest.hide();
}
//设备删除
function deleteDevice1(obj){
	
	var tr = $(obj).parent().parent();
	var td = tr.children()[0];
	var id = $(td).attr("id");
	var deleteValue = "deleteValue";
	
	$.ajax({
		   type: "POST",
		   async:false,
		   url: "ServiceServlet",
		   data: {
			   "id":id,
			   "deleteValue":deleteValue,
		   },
		   dataType:'text',
		   success: function(msg){
			  $(tr).remove();
			  
		   },
		   error:function(){
			   
		   }
		});
}

//端口删除
function deleteDevice2(obj){
	
	var tr = $(obj).parent().parent();
	var td = tr.children()[0];
	var id = $(td).attr("id");
	var deleteValue = "deleteValue";
	
	$.ajax({
		   type: "POST",
		   async:false,
		   url: "PortServlet",
		   data: {
			   "id":id,
			   "deleteValue":deleteValue,
		   },
		   dataType:'text',
		  
		   success: function(msg){
				  $(tr).remove();
			   },
		   error:function(){
			   
		   }
		});
}

//连线删除
function deleteDevice3(obj){
	
	var tr = $(obj).parent().parent();
	var td = tr.children()[0];
	var id = $(td).attr("id");
	var deleteValue = "deleteValue";

	$.ajax({
		   type: "POST",
		   async:false,
		   url: "LinkServlet",
		   data: {
			   "id":id,
			   "deleteValue":deleteValue,
		   },
		   dataType:'text',
		   success: function(msg){
			  //var message = eval(msg);
			  $(tr).remove();
		   },
		   error:function(){
			   
		   }
		});
}

//端口数据提交与验证
function submitPort(){
	
	var portName = $("#portName").val(); 
	var deviceName = $("#deviceName").find("option:selected").text();  
	var ip = $("#ip").val(); 
	var func_tion = $("#function").val();
	
	var ipPort = $("#ipPort");
	var namePortTest = $("#namePortTest");
	
	var re = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;  
	
	var resTrs = $(".portRR tr");
	var nameArr =[];
	for(var i=0;i<resTrs.length;i++){
		var portNameArr = resTrs[i].children[2].innerHTML;
		nameArr.push(portNameArr);
	}
	
	ipPort.hide();
	namePortTest.hide();
	
    var boo_lean = false;
	for(var i=0; i<nameArr.length; i++){
		if( !( isNull(portName) ) ){
			if(nameArr[i] != portName){
				boo_lean = true;
			}else{
				boo_lean = false;
				break;
			}
		}
	}
	alert(boo_lean);
	if(boo_lean){
		if(re.test(ip)){
			$.ajax({
				type: "POST",
				async:false,
				url: "PortServlet",
				data: {
					"deviceName":deviceName,
					"portName":portName,
					"ip":ip,
					"func_tion":func_tion,
				},
				dataType:'text',
				success: function(msg){
					var message = eval(msg);
					var tbody = $("#portList"); 
					tbody.empty();
					
					$.each(message,function(index,element){
						var newId = element.uid;
						var newdeviceName = element.deviceName;
						var newportName = element.portName;
						var newip = element.ip;
						var newfunc_tion = element.func_tion;
						var portId = "Port"+newId+"port";
						var str = "<tr>";
						str +="<td style='display:none' id='"+newId+"'>"+newId+"</td>";
						str += "<td>"+newdeviceName+"</td>";
						str += "<td id='"+portId+"'>"+newportName+"</td>";
						str += "<td>"+newip+"</td>";
						/*str += "<td>"+newfunc_tion+"</td>";*/
						str += "<td><input type='button' value='删除' onclick='deleteDevice2(this)'/></td>";
						str += "<td><input type='button' value='更改' onclick='updatePort(this)'/></td>";
						str += "</tr>";
						tbody.append(str);
						
					});
					
				},
				error:function(){
					
				}
			});
		}else{
			ipPort.show();
		}
	}else{
		namePortTest.show();
	}
			
	    
	
}

//添加策略
function submitStrategy(){
	var name =$("#strategyName").val();
	var target = $("#target").find("option:selected").val();
	var range = $("#range").find("option:selected").val();
	var nameStrategyTest = $("#nameStrategyTest");
	
	nameStrategyTest.hide();
	var resTrs = $(".strategyRR tr");
	var nameArr =[];
	for(var i=0;i<resTrs.length;i++){
		var deviceNameArr = resTrs[i].children[1].innerHTML;
		nameArr.push(deviceNameArr);
	}
	
	var boo_lean = false;
	for(var i=0;i<nameArr.length;i++){
		if( !(isNull(name)) ){
			if(nameArr[i]!=name){
				boo_lean = true;
			}else{
				boo_lean = false;
				break;
			}
		}
	}
	
	
	if(boo_lean){
		$.ajax({
			type: "POST",
			async:false,
			url: "StrategyServlet",
			data:{
				"name":name,
				"target":target,
				"range":range,
			},
			dateType:'text',
			success:function(msg){
				var message = eval(msg);
				var tbody = $("#strategyList");
				tbody.empty();
				
				$.each(message,function(index,element){
					var showId = element.id;
					var showName = element.name;
					var getTarget = element.target;
					var getRange = element.range;
					var show = "Strategy"+showId+"strategy";
					var showTarget = "";
					var showRange = "";
					
					if(getTarget=="bandwidth-balance"){
						showTarget = "带宽均衡调整";
					}else if(getTarget=="user-defined-lowest"){
						showTarget = "链路价格最低调整";
					}
					
					if(getRange=="adjust-unconditioned-flows"){
						showRange = "越限流调整";
					}else if(getRange=="adjust-all-flow"){
						showRange = "全局流调整";
					}
					
					var str = "<tr>";
					    str +="<td style='display:none' id='"+showId+"'>"+showId+"</td>";
					    str += "<td id=''>"+"<label class='checkbox-inline'><input type='radio' name='"+showId+"' id='"+showId+"' value='"+showId+"'/></label>"+"</td>";
					    str +="<td id='"+show+"'>"+showName+"</td>";
					    str +="<td>"+showTarget+"</td>";
					    str +="<td>"+showRange+"</td>";
					    str +="<td>"+"<input type='button' value='删除' onclick='deleteStrategy(this)' />"+"</td>";
					    str +="<td>"+"<input type='button' value='更新' onclick='updateStrategy(this)' />"+"</td>";
					    tbody.append(str);
				});
				
			},
			error:function(){
				
			}
		});
	}else{
		nameStrategyTest.show();
	}
}

//策略重置
function resetStrategy(){
	$("#strategyName").val("");
	$("#target").val("");
	$("#range").val("");
	
	var nameStrategyTest = $("#nameStrategyTest");
	nameStrategyTest.hide();
}
//策略删除
function deleteStrategy(obj){
	var tr = $(obj).parent().parent();
	var td = tr.children()[0];
	var id = $(td).attr("id");
	var deleteValue = "deleteValue";
	
	$.ajax({
		type: "POST",
	    async:false,
	    url: "StrategyServlet",
	    data:{
	    	"id":id,
	    	"deleteValue":deleteValue,
	    },
	    success:function(msg){
	    	$(tr).remove();
	    },
	    error:function(){
	    	
	    }
	});
	
	
}


//端口重置
function resetFlow2(){
	$("#deviceName").val(""); 
	$("#portName").val(""); 
	$("#ip").val(""); 
	$("#threshold").val(""); 
	$("#function").val(""); 
	
	var ipPort = $("#ipPort");
	var namePortTest = $("#namePortTest");
	ipPort.hide();
	namePortTest.hide();
}

//连线数据提交与验证
function submitLink3(){
	var deviceName1 = $("#deviceName1").find("option:selected").text();
	var deviceName2 = $("#deviceName2").find("option:selected").text();
	var linkName = $("#linkName").val(); 
	//var leftService = $("#leftService").val(); 
	var leftNode = $("#leftnode").find("option:selected").text(); 
	//var rightService = $("#rightService").val(); 
	var rightNode = $("#rightnode").find("option:selected").text(); 
	var brandwidth = $("#brandwidth").val(); 
	var threshold = $("#threshold").val(); 
	var bc0 = $("#bc0").val(); 
	var nameLinkTest = $("#nameLinkTest");
	var validateall = $("#validateall");
	
	nameLinkTest.hide();
	validateall.hide();
	
	var resTrs = $(".linkRR tr");
	var nameArr =[];
	for(var i=0;i<resTrs.length;i++){
		var portNameArr = resTrs[i].children[2].innerHTML;
		nameArr.push(portNameArr);
	}
    var boo_lean = false;
	for(var i=0; i<nameArr.length; i++){
		if( !( isNull(linkName) ) ){
			if(nameArr[i] != linkName){
				boo_lean = true;
			}else{
				boo_lean = false;
				break;
			}
		}
	}
	if(boo_lean){
		
		if( !(isNull(leftNode) || isNull(rightNode) ) && (deviceName1!="<--- 请  选  择  --->")&&(deviceName2!="<--- 请  选  择  --->")){
			
			$.ajax({
				type: "POST",
				async:false,
				url: "LinkServlet",
				data: {
					"linkName":linkName,
					"leftService":deviceName1,
					"leftNode":leftNode,
					"rightService":deviceName2,
					"rightNode":rightNode,
					"brandwidth":brandwidth,
                    "threshold":threshold,
			        "bc0":bc0,
				},
				dataType:'text',
				success: function(msg){
					var message = eval(msg);
					var tbody = $("#linkList"); 
					tbody.empty();
					$.each(message,function(index,element){
						var newid = element.id;
						var newlinkName = element.linkName;
						var newleftService = element.leftService;
						var newleftNode = element.leftNode;
						var newrightService = element.rightService;
						var newrightNode = element.rightNode;
						var newbrandwidth = element.brandwidth;
                        var newthreshold= element.threshold;
				        var newbc0 = element.bc0;
				        var showId = "Link"+newid+"link";
						var str = "<tr>";
						str +="<td style='display:none' id='"+newid+"'>"+newid+"</td>";
						str += "<td id='"+showId+"'>"+newlinkName+"</td>";
						str += "<td>"+newleftService+"</td>";
						str += "<td>"+newleftNode+"</td>";
						str += "<td>"+newrightService+"</td>";
						str += "<td>"+newrightNode+"</td>";
						str += "<td>"+newbrandwidth+"</td>";
                        str += "<td>"+newthreshold+"</td>";
				        str += "<td>"+newbc0+"</td>";
						str += "<td id='"+newid+"'><input type='button' value='删除' onclick='deleteDevice3(this)'/></td>";
						str += "<td><input type='button' value='更改' onclick='updateLink(this)'/></td>";
						str += "</tr>";
						tbody.append(str);
					})
					
				},
				error:function(){
					
				}
			});
		}else{
			validateall.show();
		}
	}else{
		nameLinkTest.show();
	}
}



//连线重置
function resetFlow3(){
	$("#linkName").val(""); 
	$("#deviceName1").val(""); 
	$("#deviceName2").val(""); 
	$("#leftnode").empty(); 
	$("#rightnode").empty(); 
	$("#leftNode").val(""); 
	$("#rightService").val(""); 
	$("#rightNode").val(""); 
	$("#brandwidth").val(""); 
	
	var nameLinkTest = $("#nameLinkTest");
	var validateall = $("#validateall");
	nameLinkTest.hide();
	validateall.hide();
}

//保存utraffic输入值
function submitUtraffic(){
	$("#isSaveSuccess").hide();
	var utrId = document.getElementById("utrId").innerHTML;
	var utrSerAddressIp = $("#utrSerAddressIp").val(); 
	var utrSerAddressPort = $("#utrSerAddressPort").val();
	var utrUser = $("#utrUser").val(); 
	var utrPassword = $("#utrPassword").val(); 
	var sftpAddress = $("#sftpAddress").val(); 
	var sftpPort = $("#sftpPort").val(); 
	var sftpUser = $("#sftpUser").val(); 
	var sftpPassword = $("#sftpPassword").val(); 
	var saveValue = "saveValue";
	
	var regularIp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/; 
	var regularPort = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
	
	
	if(regularIp.test(utrSerAddressIp)){
		
		if(regularPort.test(utrSerAddressPort)){
				var utrSerAddress = "https://"+utrSerAddressIp+":"+utrSerAddressPort;
				
				if(regularIp.test(sftpAddress)){
					
					if(regularPort.test(sftpPort)){
						$.ajax({
							type: "POST",
							async:false,
							url: "UtrafficServlet",
							data: {
								"id":utrId,
								"utrSerAddress":utrSerAddress,
								"utrUser":utrUser,
								"utrPassword":utrPassword,
								"sftpAddress":sftpAddress,
								"sftpPort":sftpPort,
								"sftpUser":sftpUser,
								"sftpPassword":sftpPassword,
								"saveValue":saveValue,
							},
							dataType:'text',
							success: function(msg){
								var message = eval(msg);
								
								$.each(message,function(index,element){
									var showId = element.id;
									var showUtrSerAddress = element.utrSerAddress;
									var showUtrUser = element.utrUser;
									var showUtrPassword = element.utrPassword;
									var showSftpAddress = element.sftpAddress;
									var showSftpPort = element.sftpPort;
									var showSftpUser = element.sftpUser;
									var showSftpPassword = element.sftpPassword;
									
									var num = showUtrSerAddress.indexOf("//");
									var num2 = showUtrSerAddress.lastIndexOf(":");
									var strLength = showUtrSerAddress.length; 
									var utrSerIp = showUtrSerAddress.substring(num+2,num2);
									var utrSerPort = showUtrSerAddress.substring(num2+1,strLength+1);
									
									document.getElementById("utrId").innerHTML = showId;
									document.getElementById("utrSerAddressIp").value = utrSerIp;
									document.getElementById("utrSerAddressPort").value = utrSerPort;
									document.getElementById("utrUser").value = showUtrUser;
									document.getElementById("utrPassword").value = showUtrPassword;
									document.getElementById("sftpAddress").value = showSftpAddress;
									document.getElementById("sftpPort").value = showSftpPort;
									document.getElementById("sftpUser").value = showSftpUser;
									document.getElementById("sftpPassword").value = showSftpPassword;
									
									document.getElementById("isSaveSuccess").innerHTML = "<font>数据保存成功</font>";
									$("#isSaveSuccess").show();
								});
								
							},
							error:function(){
								document.getElementById("isSaveSuccess").innerHTML = "<font>数据保存失败</font>";
								$("#isSaveSuccess").show();
							},
						});
						
					}else {
						$("#sftpPortTest").show();
					}
			   }else {
				   $("#sftpAddressTest").show();
			   }
		}else {
			$("#utrSerAddressPortTest").show();
		}
		
	}else {
		$("#utrSerAddressIpTest").show();
	}
}

//utraffic提示语隐藏
function hidePrompt(){
	$("#isSaveSuccess").hide();
	$("#sftpPortTest").hide();
	$("#sftpAddressTest").hide();
	$("#utrSerAddressPortTest").hide();
	$("#utrSerAddressIpTest").hide();
}

//保存snc输入值
function submitSnc(){
	$("#sncIsSaveSuccess").hide();
	var saveValue = "saveValue";
	var sncId = document.getElementById("sncId").innerHTML;
	var sncIpAddress = $("#sncIpAddress").val();
	var sncPort = $("#sncPort").val();
	var sncUser = $("#sncUser").val();
	var sncPassword = $("#sncPassword").val();
	
	
	var regularIp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/; 
	var regularPort = /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
	
	if(regularIp.test(sncIpAddress)){
		if(regularPort.test(sncPort)){
			$.ajax({
				type:"POST",
				async:false,
				url:"SncServlet",
				data:{
					"sncId":sncId,
					"sncIpAddress":sncIpAddress,
					"sncPort":sncPort,
					"sncUser":sncUser,
					"sncPassword":sncPassword,
					"saveValue":saveValue,
				},
			    dataType:'text',
			    success:function(msg){
			    	var message = eval(msg);
			    	
			    	$.each(message,function(index,element){
			    		var showId = element.id;
			    		var showIpAddress = element.sncIpAddress;
			    		var showPort = element.sncPort;
			    		var showUser = element.sncUser;
			    		var showPassword = element.sncPassword;
			    		
			    		document.getElementById("sncId").innerHTML = showId;
			    		document.getElementById("sncIpAddress").value = showIpAddress;
			    		document.getElementById("sncPort").value = showPort;
			    		document.getElementById("sncUser").value = showUser;
			    		document.getElementById("sncPassword").value = showPassword;
			    		
			    		document.getElementById("sncIsSaveSuccess").innerHTML = "<font>数据保存成功</font>";
			    		$("#sncIsSaveSuccess").show();
			    		
			    	});
			    },
			    error:function(){
			    	document.getElementById("sncIsSaveSuccess").innerHTML = "<font>数据保存失败</font>";
			    	$("#sncIsSaveSuccess").show();
			    }
			});
		}else {
			$("#sncPortTest").show();
		}
	}else {
		$("#sncIpAddressTest").show();
	}
	
}

//snc提示语影藏
function hidePromptSnc(){
	$("#sncIpAddressTest").hide();
	$("#sncPortTest").hide();
	$("#sncIsSaveSuccess").hide();
	
}

/*function resetFlow4(){
	$("#utrSerAddress").val(""); 
	$("#utrCertiPassword").val(""); 
	$("#utrUser").val(""); 
	$("#utrPassword").val(""); 
	$("#sftpAddress").val(""); 
	$("#sftpUser").val(""); 
	$("#sftpPort").val(""); 
	$("#sftpPassword").val(""); 
}*/


function resetFlow5(){
	$("#ipAddress").val(""); 
	$("#port").val(""); 
	$("#user").val(""); 
	$("#password").val(""); 
	
}

//SNC部署自动调优
function deploy(){
	
	/*var strategy = $("#strategy").find("option:selected").val();
	var range = $("#range").find("option:selected").val();*/
	
	var strategy = "";
	var range = "";
	
	var autoId = $("input[type='radio']:checked").val();
	var posturl = "posturl";
	var getTarget ="";
	var getRange = "";
	var resTrs = $(".strategyRR tr");
	for(var i=0;i<resTrs.length;i++){
		var strategyId = resTrs[i].children[0].innerHTML;
		if(strategyId == autoId){
			/*strategyName = reTrs[i].children[1].innerHTML;*/
			getTarget = resTrs[i].children[3].innerHTML;
			getRange = resTrs[i].children[4].innerHTML;
		}
	}
	
	if(getTarget=="带宽均衡调整"){
		strategy = "bandwidth-balance";
	}else if(getTarget=="链路价格最低调整"){
		strategy = "user-defined-lowest";
	}
	
	if(getRange=="越限流调整"){
		range = "adjust-unconditioned-flows";
	}else if(getRange=="全局流调整"){
		range = "adjust-all-flow";
	}
	
	$.ajax({
		   type: "POST",
		   async:false,
		   url: "SendUrlServlet",
		   data: {
			   "posturl":posturl,
			   "strategy":strategy,
			   "range":range,
		   },
		   dataType:'text',
		   success: function(msg){
			 var message = eval("("+msg+")");
//			 
			 var value = message.vale;
//			 /*var tbody = $("#sncList"); 
//			   $.each(message,function(index,element){
//				   var name = element.name;
//				   var ip = element.ip;
//				   var type = element.type;
//				   tbody.append('<tr id="'+ipAddress+'"><td>'+ipAddress+'</td>'+'<td>'+port+'</td>'+'<td>'+user+'</td>'+'<td>'+password+'</td></tr>');
//			   })*/
			 if(null != value){
				 confirm("下发成功");
				 /*$.confrim({
					 title: 'Confirm!',
					 content: 'Confirm! Confirm! Confirm!',
					 confirm: function(){
					 alert('the user clicked confirm');
					 },
					 cancel: function(){
					 alert('the user clicked cancel')
					 }
					 });*/

			 }else{
				 confirm("下发失败"); 
			 }
			   
		   },
		   error:function(){
			   
		   }
		});
}

//手动调优下发
function deployOptimize(){
	var fromLinkName = $("#fromLinkName").find("option:selected").val();
	var toLinkName = $("#toLinkName").find("option:selected").val();
	$.ajax({
		   type: "POST",
		   async:false,
		   url: "OptimizeServlet",
		   data: {
			   "fromLinkName":fromLinkName,
			   "toLinkName":toLinkName,
		   },
		   dataType:'text',
		   success: function(msg){
			 var message = eval("("+msg+")");
//			 
			 var value = message.vale;
//			 /*var tbody = $("#sncList"); 
//			   $.each(message,function(index,element){
//				   var name = element.name;
//				   var ip = element.ip;
//				   var type = element.type;
//				   tbody.append('<tr id="'+ipAddress+'"><td>'+ipAddress+'</td>'+'<td>'+port+'</td>'+'<td>'+user+'</td>'+'<td>'+password+'</td></tr>');
//			   })*/
			 if(null != value){
				 confirm("下发成功");
				 /*$.confrim({
					 title: 'Confirm!',
					 content: 'Confirm! Confirm! Confirm!',
					 confirm: function(){
					 alert('the user clicked confirm');
					 },
					 cancel: function(){
					 alert('the user clicked cancel')
					 }
					 });*/

			 }else{
				 confirm("下发失败"); 
			 }
			   
		   },
		   error:function(){
			   
		   }
		});
}

//调优还原
function recover(){
	$.ajax({
		   type: "POST",
		   async:false,
		   url: "RecoverServlet",
		   data: {
			   
		   },
		   dataType:'text',
		   success: function(msg){
			   var message = eval("("+msg+")");
				 var value = message.vale;

				 if(null != value){
					 confirm("下发成功");
				 }else{
					 confirm("下发失败"); 
				 }
		   },
		   error:function(){
			   
		   }
		});
}

//设置左节点
function setLeftNode(obj){
	
	var tr = $(obj).parent().parent();
	var td = tr.children()[0];
	var id = $(td).attr("id");
	var select = new Object();
	
	var device = "";
	var leftDevice1 = $("#deviceName1").find("option:selected").val();
	var leftDevice2 = $("#leftDeviceNameUpdate").find("option:selected").val();//更新界面的节点变动
	
	//判断是更新界面还是添加界面节点变动
	if( ( isNull(id) ) ){
		device = leftDevice1;
		select = $("#leftnode");
	}else if( !( isNull(id) ) ){
		device = leftDevice2;
		select = $("#leftDeviceNodeUpdate");
	}
	
	
	$.ajax({
		   type: "POST",
		   async:false,
		   url: "GetNodeServlet",
		   data: {
			   "leftDevice":device,
			   
		   },
		   dataType:'text',
		   success: function(msg){
			 var message = eval(msg);
			// var select = $("#leftnode");
			 //var select = $("#leftDeviceNodeUpdate");
			 select.empty();
			 
			   $.each(message,function(index,element){
				   var leftNode = element.ip;
				   if(leftNode !=null){
					   var option = "<option value='"+leftNode+"'>"+leftNode+"</option>";
					   select.append(option);
				   }
			   })
			 
		   },
		   error:function(){
			   
		   }
		});
}

//设置右节点
function setRightNode(obj){
	
	var tr = $(obj).parent().parent();
	var td = tr.children()[0];
	var id = $(td).attr("id");
	var select = new Object();
	
	var device = "";
	var rightDevice1 = $("#deviceName2").find("option:selected").val();
	var rightDevice2 = $("#rightDeviceNameUpdate").find("option:selected").val();//更新界面的节点变动
	
	//判断是更新界面还是添加界面节点变动
	if(isNull(id)){
		device = rightDevice1;
		select = $("#rightnode");
	}else if( !( isNull(id) ) ){
		device = rightDevice2;
		select = $("#rightDeviceNodeUpdate");
	}
	
	$.ajax({
		   type: "POST",
		   async:false,
		   url: "GetNodeServlet",
		   data: {
			   "rightDevice":device,
			   
		   },
		   dataType:'text',
		   success: function(msg){
			 var message = eval(msg);
			 select.empty();
			 
			   $.each(message,function(index,element){
				   var rightNode = element.ip;
				   
				   if(rightNode !=null){
					   var option = "<option value='"+rightNode+"'>"+rightNode+"</option>";
					   select.append(option);
				   }
			   })
			 
		   },
		   error:function(){
			   
		   }
		});
}
/*$(function{
	submitFlow1();
})*/

function resetFlow(){
	xmlActions = "";
	pageflow = 0;
	$("input[name="+createFlowForm[0]+"]").val("");
	$("input[name="+createFlowForm[1]+"]").val("");
	$("input[name="+createFlowForm[2]+"]").val("");
	$("input[name="+createFlowForm[3]+"]").val("");
	$("input[name="+createFlowForm[4]+"]").val("");
	$("input[name="+createFlowForm[5]+"]").val("");
	$("input[name="+createFlowForm[6]+"]").val("");
	$(".autogrow").val("Press select Tunnel");
}

//代码示例
setCodeInfo = function(api,method,url,requestBody,responseBody){
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

//判断是否为空
function isNull(data){ 
	return (data == "" || data == undefined || data == null) ? true : false; 
}

//设备更新

function updateDevice(obj){
	$("#submitReturnDeviceInformation").empty();
	$("#strategyModel").css("z-Index","-1");
	document.getElementById("deviceModel").style.zIndex = "9999";
	document.getElementById("portModel").style.zIndex = "-1";
	document.getElementById("linkModel").style.zIndex = "-1";
	
	$("#submitReturnDeviceInformation").empty();
	var updateDevice = $(".updateDevice");
	updateDevice.empty();
	
	$('#deviceModel').modal('show');
	
	var tr = $(obj).parent().parent();
	var td = tr.children()[0];
	var id = $(td).attr("id");
	
	var deviceName ="";
	var deviceType ="";
	var deviceIp ="";
	var deviceIsp ="";
	var showIsp0 ="";
	var showIsp1 ="";
	var resTrs = $(".deviceRR tr");
	for(var i=0;i<resTrs.length;i++){
		if(id == resTrs[i].children[0].innerHTML){
			deviceName = resTrs[i].children[1].innerHTML;
			deviceType = resTrs[i].children[2].innerHTML;
			deviceIp = resTrs[i].children[3].innerHTML;
			deviceIsp = resTrs[i].children[4].innerHTML;
		}
	}
	
	if(deviceIsp =="peerISP"){
		showIsp0 ="peerISP";
		showIsp1 ="localISP";
		
	}else if(deviceIsp =="localISP"){
		showIsp0 ="localISP";
		showIsp1 ="peerISP";
	}else{
		showIsp0 ="peerISP";
		showIsp1 ="localISP";
	}
	
	var str = "<tr>";
	    str +="<td id='"+id+"' style='display:none'>"+id+"</td>";
        str += "<td>"+"<input type='text' name='name' value='"+deviceName+"'/>"+"</td>";
        str += "<td>"+"<input type='text' name='type' value='"+deviceType+"'/>"+"</td>";
        str += "<td>"+"<input type='text' name='ip' value='"+deviceIp+"'/>"+"</td>";
        str += "<td><select id='ispUpdate'>"; 
        str +="<option value='"+showIsp0+"'>"+showIsp0+"</option>";
        str +="<option value='"+showIsp1+"'>"+showIsp1+"</option>";
        str +="</select></td>";	
        str +="</tr>";
        
        updateDevice.append(str);
	
}

//设备更新提交
function deviceSubmitUpdates(){
	
	$("#submitReturnDeviceInformation").empty();
	var update = "update";
	var deviceName ="";
	var deviceType ="";
	var deviceIp ="";
	var deviceIsp ="";
	var deviceId ="";
	
	var resTrs = $(".updateDevice tr");
	for(var i=0;i<resTrs.length;i++){
		    deviceId = resTrs[i].children[0].innerHTML;
			deviceName = resTrs[i].children[1].children[0].value;
			deviceType = resTrs[i].children[2].children[0].value;
			deviceIp = resTrs[i].children[3].children[0].value;
			deviceIsp = resTrs[i].children[4].children[0].value;
		
	}
	
	var resTrs = $(".deviceRR tr");
	var nameArr =[];
	for(var i=0;i<resTrs.length;i++){
		var deviceNameArr = resTrs[i].children[1].innerHTML;
		nameArr.push(deviceNameArr);
	}
	
	var re = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;  
	var boo_lean = false;
	var showId = "Device"+deviceId+"device";
	var showName = document.getElementById(showId).innerHTML;
	for(var i=0; i<nameArr.length; i++){
			if( !( isNull(tunnname1) ) ){
				if(deviceName==showName){
					boo_lean = true;
					break;
				}else{
					if(nameArr[i] != deviceName){
						boo_lean = true;
					}else{
						boo_lean = false;
						break;
					}
				}
			}
	}
	
	if(boo_lean){
		
		if(re.test(deviceIp)){
			
			$.ajax({
				type: "POST",
				async:false,
				url: "ServiceServlet",
				data: {
					"update":update,
					"id":deviceId,
					"tunnname1":deviceName,
					"tunnname2":deviceType,
					"tunnname3":deviceIp,
					"topnumPR":deviceIsp,
				},
				dataType:'text',
				success: function(msg){
					var message = eval(msg);
					var tbody = $("#tunnelList"); 
					tbody.empty();
					
					$.each(message,function(index,element){
						var id = element.id;
						var name = element.name;
						var ip = element.ip;
						var type = element.type;
						var ispNumber = element.isp;
						var showIdUpd = "Device"+id+"device";
						var isp = "";
						if(ispNumber == 1){
							isp = "peerISP";
						}else if(ispNumber == 0){
							isp = "localISP";
						}else{
							isp = "";
						}
						var str = "<tr>";
						str +="<td style='display:none' id='"+id+"'>"+id+"</td>";
						str += "<td id='"+showIdUpd+"'>"+name+"</td>";
						str += "<td>"+ip+"</td>";
						str += "<td>"+type+"</td>";
						str += "<td>"+isp+"</td>";
						str += "<td><input type='button' value='删除' onclick='deleteDevice1(this)'/></td>";
						str += "<td><input type='button' value='更改' onclick='updateDevice(this)'/></td>";
						str += "</tr>";
						tbody.append(str);
					});
					$("#submitReturnDeviceInformation").append("<div style='margin-left: 170px; color:#EE4000'><font style='font-size:20px;'>"+"添加成功"+"</font></div>");
				},
				error:function(){
					$("#submitReturnDeviceInformation").append("<div style='margin-left: 170px; color:#EE4000'><font style='font-size:20px;'>"+"添加失败"+"</font></div>");
				},
			});
		}else{
			$("#submitReturnDeviceInformation").append("<div style='margin-left: 70px; color:#EE4000'><font style='font-size:20px;'>"+"输入的ip格式错误，请重新输入"+"</font></div>");
		}
	}else{
		$("#submitReturnDeviceInformation").append("<div style='margin-left: 70px; color:#EE4000'><font style='font-size:20px;'>"+"名称不能为null或与非更新展示页面的重复，请重新输入"+"</font></div>");
	}
	
	
}

//接口更新
function updatePort(obj){
	
	$("#strategyModel").css("z-Index","-1");
	document.getElementById("deviceModel").style.zIndex = "-1";
	document.getElementById("portModel").style.zIndex = "9999";
	document.getElementById("linkModel").style.zIndex = "-1";
	
	
	$("#submitReturnPortInformation").empty();
	var updateDevice = $(".updatePort");
	updateDevice.empty();
	
	$('#portModel').modal('show');
	
	var tr = $(obj).parent().parent();
	var td = tr.children()[0];
	var id = $(td).attr("id");
	var optionText = [];
	var deviceName ="";
	var portName ="";
	var portIp ="";
	var portFunction ="";
	var resTrs = $(".portRR tr");
	for(var i=0;i<resTrs.length;i++){
		if(id == resTrs[i].children[0].innerHTML){
			deviceName = resTrs[i].children[1].innerHTML;
			portName = resTrs[i].children[2].innerHTML;
			portIp = resTrs[i].children[3].innerHTML;
			portFunction = resTrs[i].children[4].innerHTML;
		}
	}
	
	var str = "<tr>";
	    str +="<td id='"+id+"' style='display:none'>"+id+"</td>";
	    str += "<td><select id='portDeviceNameUpdate'>"; 
	    str +="</select></td>";	
        str += "<td>"+"<input type='text' name='portName' value='"+portName+"'/>"+"</td>";
        str += "<td>"+"<input type='text' name='portIp' value='"+portIp+"'/>"+"</td>";
       /* str += "<td>"+"<input type='text' name='portFunction' value='"+portFunction+"'/>"+"</td>";*/
        str +="</tr>";
        
        updateDevice.append(str);
        
        $.ajax({
 		   type: "POST",
 		   async:false,
 		   url: "ServiceServlet",
 		   data: {
 			   
 		   },
 		   dataType:'text',
 		   success: function(msg){
 			  var message = eval(msg);
 			   $.each(message,function(index,element){
 				   var name = element.name;
 				   if(deviceName == name){
 					  optionText.unshift(name);
 				   }else{
 					  optionText.push(name);
 				   }
 				   
 			   });
 			   
 		   },
 		   error:function(){
 			   
 		   }
 		});
        var select = $("#portDeviceNameUpdate"); 
		select.empty();
        for(var i=0;i<optionText.length;i++){
        	var option = "<option value='"+optionText[i]+"'>"+optionText[i]+"</option>";
			select.append(option);
        }
	
}

//接口更新提交
function portSubmitUpdates(){
	$("#submitReturnPortInformation").empty();
	
	var update = "update";
	var deviceName ="";
	var portName ="";
	var portIp ="";
	/*var portFunction ="";*/
	var portId ="";
	
	var resTrs = $(".updatePort tr");
	for(var i=0;i<resTrs.length;i++){
		    portId = resTrs[i].children[0].innerHTML;
			deviceName = resTrs[i].children[1].children[0].value;
			portName = resTrs[i].children[2].children[0].value;
			portIp = resTrs[i].children[3].children[0].value;
			/*portFunction = resTrs[i].children[4].children[0].value;*/
	}
	
	var resTrs = $(".portRR tr");
	var nameArr =[];
	for(var i=0;i<resTrs.length;i++){
		var portNameArr = resTrs[i].children[2].innerHTML;
		nameArr.push(portNameArr);
	}
	var showId = "Port"+portId+"port";
	var portNameValue = document.getElementById(showId).innerHTML;
    var boo_lean = false;
	for(var i=0; i<nameArr.length; i++){
			if( !( isNull(portName) ) ){
				if(portNameValue == portName){
					boo_lean = true;
					break;
				}else{
					if(nameArr[i] != portName){
						boo_lean = true;
					}else{
						boo_lean = false;
						break;
					}
				}
			}
	}
	
	var re = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/; 
	
	if(boo_lean){
		if(re.test(portIp)){
			
			$.ajax({
				type: "POST",
				async:false,
				url: "PortServlet",
				data: {
					"update":update,
					"id":portId,
					"deviceName":deviceName,
					"portName":portName,
					"ip":portIp,
					/*"func_tion":portFunction,*/
				},
				dataType:'text',
				success: function(msg){
					var message = eval(msg);
					var tbody = $("#portList"); 
					tbody.empty();
					
					$.each(message,function(index,element){
						var newid = element.uid;
						var newdeviceName = element.deviceName;
						var newportName = element.portName;
						var newip = element.ip;
						var newfunc_tion = element.func_tion;
						var showIdUpd = "Port"+newid+"port";
						var str = "<tr>";
						str +="<td style='display:none' id='"+newid+"'>"+newid+"</td>";
						str += "<td>"+newdeviceName+"</td>";
						str += "<td id='"+showIdUpd+"'>"+newportName+"</td>";
						str += "<td>"+newip+"</td>";
						/*str += "<td>"+newfunc_tion+"</td>";*/
						str += "<td id='"+newid+"'><input type='button' value='删除' onclick='deleteDevice2(this)'/></td>";
						str += "<td><input type='button' value='更改' onclick='updatePort(this)'/></td>";
						str += "</tr>";
						tbody.append(str);
						
					});
					$("#submitReturnPortInformation").append("<div style='margin-left: 170px; color:#EE4000'><font font style='font-size:20px;'>"+"更新成功"+"</font></div>");
				},
				error:function(){
					$("#submitReturnPortInformation").append("<div style='margin-left: 170px; color:#EE4000'><font font style='font-size:20px;'>"+"更新失败"+"</font></div>");
				}
			});
		}else{
			$("#submitReturnPortInformation").append("<div style='margin-left: 70px; color:#EE4000'><font font style='font-size:20px;'>"+"接口ip格式错误，请重新输入"+"</font></div>");
		}
	}else{
		$("#submitReturnPortInformation").append("<div style='margin-left: 70px; color:#EE4000'><font font style='font-size:20px;'>"+"接口名称不能为null或者与非更新的展示名称重复，请重新输入"+"</font></div>");
	}
	
}

//连线更新
function updateLink(obj){
	$("#strategyModel").css("z-Index","-1");
	document.getElementById("deviceModel").style.zIndex = "-1";
	document.getElementById("portModel").style.zIndex = "-1";
	document.getElementById("linkModel").style.zIndex = "99999";
	
	$("#submitReturnLinkInformation").empty();
	var updateDevice = $(".updateLink");
	updateDevice.empty();
	
	$('#linkModel').modal('show');
	
	var tr = $(obj).parent().parent();
	var td = tr.children()[0];
	var id = $(td).attr("id");
	
	var leftOptionText = [];
	var rightOptionText = [];
	var leftOptionNodeText = [];
	var rightOptionNodeText = [];
	
	var linkName ="";
	var leftService ="";
	var leftNode ="";
	var rightService ="";
	var rightNode ="";
	var brandwidth ="";
	var threshold ="";
	var bc0 ="";
	
	var resTrs = $(".linkRR tr");
	for(var i=0;i<resTrs.length;i++){
		if(id == resTrs[i].children[0].innerHTML){
			linkName = resTrs[i].children[1].innerHTML;
			leftService = resTrs[i].children[2].innerHTML;
			leftNode = resTrs[i].children[3].innerHTML;
			rightService = resTrs[i].children[4].innerHTML;
			rightNode = resTrs[i].children[5].innerHTML;
			brandwidth = resTrs[i].children[6].innerHTML;
			threshold = resTrs[i].children[7].innerHTML;
			bc0 = resTrs[i].children[8].innerHTML;
		}
	}
	
	var str = "<tr>";
	    str +="<td id='"+id+"' style='display:none'>"+id+"</td>";
	    str +="<td>"+"<input type='text' name='linkName' value='"+linkName+"'/>"+"</td>";
	    str += "<td><select id='leftDeviceNameUpdate' onchange='setLeftNode(this)'>"; 
	    str +="</select></td>";	
	    str += "<td><select id='leftDeviceNodeUpdate'>"; 
	    str +="</select></td>";	
	    str += "<td><select id='rightDeviceNameUpdate' onchange='setRightNode(this)'>"; 
	    str +="</select></td>";	
	    str += "<td><select id='rightDeviceNodeUpdate'>"; 
	    str +="</select></td>";	
        str += "<td>"+"<input type='text' name='brandwidth' value='"+brandwidth+"'/>"+"</td>";
        str += "<td>"+"<input type='text' name='threshold' value='"+threshold+"'/>"+"</td>";
        str += "<td>"+"<input type='text' name='bc0' value='"+bc0+"'/>"+"</td>";
        str +="</tr>";
        
        updateDevice.append(str);
        
        $.ajax({
 		   type: "POST",
 		   async:false,
 		   url: "ServiceServlet",
 		   data: {
 			   
 		   },
 		   dataType:'text',
 		   success: function(msg){
 			  var message = eval(msg);
 			   $.each(message,function(index,element){
 				   var name = element.name;
 				   if(leftService == name){
 					  leftOptionText.unshift(name);
 				   }else{
 					  leftOptionText.push(name);
 				   }
 				   
 				   if(rightService == name){
 					  rightOptionText.unshift(name);
 				   }else{
 					  rightOptionText.push(name);
 				   }
 				   
 			   });
 			   
 		   },
 		   error:function(){
 			   
 		   }
 		});
        
        
        var leftSelect = $("#leftDeviceNameUpdate"); 
        var rightSelect = $("#rightDeviceNameUpdate"); 
        leftSelect.empty();
        rightSelect.empty();
        
        for(var i=0;i<leftOptionText.length;i++){
        	var option = "<option value='"+leftOptionText[i]+"'>"+leftOptionText[i]+"</option>";
        	
        	leftSelect.append(option);
        }
        
        for(var i=0;i<rightOptionText.length;i++){
        	var option = "<option value='"+rightOptionText[i]+"'>"+rightOptionText[i]+"</option>";
        	
        	rightSelect.append(option);
        }
        
        leftOptionNodeText = getInformationByAjax(leftService,leftNode);
        rightOptionNodeText = getInformationByAjax(rightService,rightNode);
        var leftNodeSelect = $("#leftDeviceNodeUpdate"); 
        var rightNodeSelect = $("#rightDeviceNodeUpdate"); 
        
        leftNodeSelect.empty();
        rightNodeSelect.empty();
        
        for(var i=0;i<leftOptionNodeText.length;i++){
        	var option = "<option value='"+leftOptionNodeText[i]+"'>"+leftOptionNodeText[i]+"</option>";
        	
        	leftNodeSelect.append(option);
        }
        
        for(var i=0;i<rightOptionNodeText.length;i++){
        	var option = "<option value='"+rightOptionNodeText[i]+"'>"+rightOptionNodeText[i]+"</option>";
        	
        	rightNodeSelect.append(option);
        }
}

//link通过ajax获取信息
function getInformationByAjax(parameter,serviceNode){
	var returnValue =[];
	//returnValue.unshift(serviceNode);
	
	 $.ajax({
		   type: "POST",
		   async:false,
		   url: "GetNodeServlet",
		   data: {
			   "leftDevice":parameter,
		   },
		   dataType:'text',
		   success: function(msg){
			 var message = eval(msg);
			 
			   $.each(message,function(index,element){
				   var node = element.ip;
				   if( node!=serviceNode ){
					   returnValue.unshift(serviceNode);
 				   }else{
 					   returnValue.push(node);
 				   }
	 				   
			   });
		   },
		   error:function(){
			   
		   }
		});
	 
	 return returnValue;
}

//连线更新提交
function linkSubmitUpdates(){
	var update = "update";
	var linkId = "";
	var linkName ="";
	var leftService ="";
	var leftNode ="";
	var rightService ="";
	var rightNode ="";
	var brandwidth ="";
	var threshold ="";
	var bc0 ="";
	
	var resTrs = $(".updateLink tr");
	for(var i=0;i<resTrs.length;i++){
		    linkId = resTrs[i].children[0].innerHTML;
			linkName = resTrs[i].children[1].children[0].value;
			leftService = resTrs[i].children[2].children[0].value;
			leftNode = resTrs[i].children[3].children[0].value;
			rightService = resTrs[i].children[4].children[0].value;
			rightNode = resTrs[i].children[5].children[0].value;
			brandwidth = resTrs[i].children[6].children[0].value;
			threshold = resTrs[i].children[7].children[0].value;
			bc0 = resTrs[i].children[8].children[0].value;
	}
	
	var resTrs = $(".linkRR tr");
	var nameArr =[];
	for(var i=0;i<resTrs.length;i++){
		var portNameArr = resTrs[i].children[1].innerHTML;
		nameArr.push(portNameArr);
	}
	
	var linkIdUpd = "Link"+linkId+"link";
	var linkNameUpd = document.getElementById(linkIdUpd).innerHTML; 
    var boo_lean = false;
	for(var i=0; i<nameArr.length; i++){
		if( !(isNull(linkName)) ){
			if(linkName==linkNameUpd){
				boo_lean = true;
				break;
			}else{
				if(nameArr[i] != linkName){
					boo_lean = true;
				}else{
					boo_lean = false;
					break;
				}
			}
		}
	}
	//清空提示语
	$("#submitReturnLinkInformation").empty();
	
	if(boo_lean){
		
		if( !( isNull(leftService) ) && !( isNull(rightService) ) ){
			
			$.ajax({
				type: "POST",
				async:false,
				url: "LinkServlet",
				data: {
				    "update":update,
				    "id":linkId,
					"linkName":linkName,
					"leftService":leftService,
					"leftNode":leftNode,
					"rightService":rightService,
					"rightNode":rightNode,
					"brandwidth":brandwidth,
                    "threshold":threshold,
			        "bc0":bc0,
				},
				dataType:'text',
				success: function(msg){
					var message = eval(msg);
					var tbody = $("#linkList"); 
					tbody.empty();
					
					$.each(message,function(index,element){
						var newid = element.id;
						var newlinkName = element.linkName;
						var newleftService = element.leftService;
						var newleftNode = element.leftNode;
						var newrightService = element.rightService;
						var newrightNode = element.rightNode;
						var newbrandwidth = element.brandwidth;
                        var newthreshold= element.threshold;
				        var newbc0 = element.bc0;
				        var showId = "Link"+newid+"link";
						var str = "<tr>";
							str +="<td style='display:none' id='"+newid+"'>"+newid+"</td>";
							str += "<td id='"+showId+"'>"+newlinkName+"</td>";
							str += "<td>"+newleftService+"</td>";
							str += "<td>"+newleftNode+"</td>";
							str += "<td>"+newrightService+"</td>";
							str += "<td>"+newrightNode+"</td>";
							str += "<td>"+newbrandwidth+"</td>";
	                        str += "<td>"+newthreshold+"</td>";
					        str += "<td>"+newbc0+"</td>";
							str += "<td id='"+newid+"'><input type='button' value='删除' onclick='deleteDevice3(this)'/></td>";
							str += "<td><input type='button' value='更改' onclick='updateLink(this)'/></td>";
							str += "</tr>";
						tbody.append(str);
					});
					
					 $("#submitReturnLinkInformation").append("<div style='margin-left: 170px; color:#EE4000'><font style='font-size:20px;'>"+"更新成功"+"<font></div>");
				},
				error:function(){
					$("#submitReturnLinkInformation").append("<div style='margin-left: 170px; color:#EE4000'><font style='font-size:20px;'>"+"更新失败"+"<font></div>");
				}
			});
		}else{
			$("#submitReturnLinkInformation").append("<div style='margin-left: 70px; color:#EE4000'><font style='font-size:20px;'>"+"输入的左接设备，右接设备不能为空，请重新输入"+"<font></div>");
		}
	}else{
		$("#submitReturnLinkInformation").append("<div style='margin-left: 70px; color:#EE4000'><font style='font-size:20px;'>"+"输入的连线名称不能为null或者与展示页面的重复，请重新输入"+"<font></div>");
	}
}

//策略更新
function updateStrategy(obj){
	$("#strategyModel").css("z-Index","99999");
	document.getElementById("deviceModel").style.zIndex = "-1";
	document.getElementById("portModel").style.zIndex = "-1";
	document.getElementById("linkModel").style.zIndex = "-1";
	$("#submitReturnStrategyformation").empty();
	var updateStrategy = $("#updateStrategyId");
	updateStrategy.empty();
	
	var tr = $(obj).parent().parent();
	var td = tr.children()[0];
	var id = $(td).attr("id");
	
	$("#strategyModel").modal('show');
	var strategyName = "";
	var strategyTarget = "";
	var strategyRange = "";
	
	var reTrs = $(".strategyRR tr");
	for(var i=0;i<reTrs.length;i++){
		var strategyId = reTrs[i].children[0].innerHTML;
		if(strategyId == id){
			strategyName = reTrs[i].children[2].innerHTML;
			strategyTarget = reTrs[i].children[3].innerHTML;
			strategyRange = reTrs[i].children[4].innerHTML;
		}
	}
	
	var targetArr = [];
	var targetArrVal = [];
	if(strategyTarget == "链路价格最低调整"){
		targetArr.push("链路价格最低调整");   
		targetArr.push("带宽均衡调整");
		targetArrVal.push("user-defined-lowest");
		targetArrVal.push("bandwidth-balance");
	}else if(strategyTarget == "带宽均衡调整"){
		targetArr.push("带宽均衡调整");
		targetArr.push("链路价格最低调整");  
		targetArrVal.push("bandwidth-balance");
		targetArrVal.push("user-defined-lowest");
	}
	
	var rangeArr = [];
	var rangeArrVal = [];
	if(strategyRange == "越限流调整"){
		rangeArr.push("越限流调整");
		rangeArr.push("全局流调整");
		rangeArrVal.push("adjust-unconditioned-flows");
		rangeArrVal.push("adjust-all-flow");
	}else if(strategyRange == "全局流调整"){
		rangeArr.push("全局流调整");
		rangeArr.push("越限流调整");
		rangeArrVal.push("adjust-all-flow");
		rangeArrVal.push("adjust-unconditioned-flows");
	}
	
	var str = "<tr>";
	    str += "<td style='display:none' id='"+id+"'>"+id+"</td>";
	    str +="<td>"+"<input value='"+strategyName+"'/>"+"</td>";
	    str +="<td><select id='stgyTarUpdateVal'>";
	    str +="</select></td>";
	    str +="<td><select id='stgyRanUpdateVal'>";
	    str +="</select></td>";
	    str +="</tr>";
	   
	$("#updateStrategyId").append(str);
	
	var insertOption1 = "<option value='"+targetArrVal[0]+"'>"+targetArr[0]+"</option>";
	var insertOption2 = "<option value='"+targetArrVal[1]+"'>"+targetArr[1]+"</option>";
	$("#stgyTarUpdateVal").append(insertOption1);
	$("#stgyTarUpdateVal").append(insertOption2);
	
	
	var insertOption3 = "<option value='"+rangeArrVal[0]+"'>"+rangeArr[0]+"</option>";
	var insertOption4 = "<option value='"+rangeArrVal[1]+"'>"+rangeArr[1]+"</option>";
	$("#stgyRanUpdateVal").append(insertOption3);
	$("#stgyRanUpdateVal").append(insertOption4);


}


//strategy更新提交
function strategySubmitUpdates(){
	
	$("#submitReturnStrategyformation").empty();
	var reTrs = $(".updateStrategy tr");//获取数组
	var strgyId ="";
	var strgyName = "";
	var strgyTarget = "";
	var strgyRange = "";
	for(var i=0;i<reTrs.length;i++){
		strgyId = reTrs[i].children[0].innerHTML;
		strgyName = reTrs[i].children[1].children[0].value;
		strgyTarget = reTrs[i].children[2].children[0].value;
		strgyRange = reTrs[i].children[3].children[0].value;
	}
	var updateValue = "update";
	
	var resTrs = $(".strategyRR tr");
	var nameArr =[];
	for(var i=0;i<resTrs.length;i++){
		var deviceNameArr = resTrs[i].children[1].innerHTML;
		nameArr.push(deviceNameArr);
	}
	var showIdUpd = "Strategy"+strgyId+"strategy";
	var showNameUpd = document.getElementById(showIdUpd).innerHTML;
	var boo_lean = false;
	for(var i=0;i<nameArr.length;i++){
			if(showNameUpd==strgyName){
				boo_lean = true;
				break;
			}else{
				if(nameArr[i]!=strgyName){
					boo_lean = true;
				}else{
					boo_lean = false;
					break;
				}
			}
	}
	if(boo_lean){
		
		if( !(isNull(strgyName)) ){
			
			$.ajax({
				type:"POST",
				async:false,
				url:"StrategyServlet",
				data:{
					"update":updateValue,
					"id":strgyId,
					"name":strgyName,
					"target":strgyTarget,
					"range":strgyRange,
				},
				
				dataType:'text',
				success:function(msg){
					var message = eval(msg);
					var tbody = $("#strategyList");
					tbody.empty();
					
					$.each(message,function(index,element){
						var showId = element.id;
						var showName = element.name;
						var getTarget = element.target;
						var getRange = element.range;
						var show = "Strategy"+showId+"strategy";
						var showTarget = "";
						var showRange = "";
						
						if(getTarget=="bandwidth-balance"){
							showTarget = "带宽均衡调整";
						}else if(getTarget=="user-defined-lowest"){
							showTarget = "链路价格最低调整";
						}
						
						if(getRange=="adjust-unconditioned-flows"){
							showRange = "越限流调整";
						}else if(getRange=="adjust-all-flow"){
							showRange = "全局流调整";
						}
						
						var str = "<tr>";
						str +="<td style='display:none' id='"+showId+"'>"+showId+"</td>";
						str += "<td id=''>"+"<label class='checkbox-inline'><input type='radio' name='"+showId+"' id='"+showId+"' value='"+showId+"'/></label>"+"</td>";
						str +="<td id='"+show+"'>"+showName+"</td>";
						str +="<td>"+showTarget+"</td>";
						str +="<td>"+showRange+"</td>";
						str +="<td>"+"<input type='button' value='删除' onclick='deleteStrategy(this)' />"+"</td>";
						str +="<td>"+"<input type='button' value='更新' onclick='updateStrategy(this)' />"+"</td>";
						str +="</tr>";
						tbody.append(str);
						
						document.getElementById("submitReturnStrategyformation").innerHTML = "<div style='margin-left: 70px; color:#EE4000'><font style='font-size:20px;'>"+"更新成功"+"</font></div>";
					});
				},
				error:function(){
					document.getElementById("submitReturnStrategyformation").innerHTML = "<div style='margin-left: 70px; color:#EE4000'><font font style='font-size:20px;'>"+"更新失败"+"</font></div>";
				}
			});
		}else {
			document.getElementById("submitReturnStrategyformation").innerHTML = "<div style='margin-left: 70px; color:#EE4000'><font font style='font-size:20px;'>"+"名称不能为空，请重新输入"+"</font></div>";
		}
	}else {
		document.getElementById("submitReturnStrategyformation").innerHTML = "<div style='margin-left: 70px; color:#EE4000'><font font style='font-size:20px;'>"+"名称不能与展示的重复，请重新输入"+"</font></div>";
	}
	
}
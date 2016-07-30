var nodes = null;
var edges = null;
var network = null;
var seed = 2;

function destroyTopology() {
	if (network !== null) {
		network.destroy();
		network = null;
	}
}

var NetworkNodeImage = 'images/element/icon_core_ipcore22.png';

// create a network
var container = $("#topologyNetwork")[0];
var nodesList = new Array();
var linkList = new Array();

var vis_callback = null;
var vis_data = null;

function initTopology() {

	destroyTopology();

	// create an array with nodes
	nodes = new vis.DataSet([]);

	// create an array with edges
	edges = new vis.DataSet([]);

	var data = {
		nodes : nodes,
		edges : edges
	};

	var options = {

		nodes : {
			physics : false,
			size : 24,
			shape : 'image',
			image : NetworkNodeImage,
			shadow : {
				enabled : true
			}
		},
		edges : {
			arrows : 'to',
			length : 160,
			font : {
				align : 'top'
			},
			shadow : {
				enabled : true
			}
		},
		layout : {
			randomSeed : seed
		}, // just to make sure the layout is the same when the locale is
		// changed
		locale : 'en',
		manipulation : {
			addNode : false,
			deleteNode : false,
			addEdge : false,
			editEdge : false,
			deleteEdge : false,
			saveTopology : function(data) {
				topology_save(data)
			},
			reloadTopology : function(data) {
				resetTopology();
			}
		},
		interaction : {
			navigationButtons : true,
			keyboard : true
		},
		groups : {
			networknode : {
				shape : 'image',
				image : NetworkNodeImage,
				font : {
					strokeWidth : 4
				}
			}
		}
	};

	network = new vis.Network(container, data, options);

}

function topology_getNodeId(nodesList, myid) {

	for (var i = 0; i < nodesList.length; i++) {
		var srcNodeId = nodesList[i].id;
		if (myid == srcNodeId) {
			return nodesList[i];
		}
	}
	return null;
}

function topology_save(nodesList) {
	var locationContent = [];
	for (var i = 0; i < nodesList.length; i++) {

		var location = {};
		location.name = nodesList[i].name;
		location.x = nodesList[i].x;
		location.y = nodesList[i].y;
		locationContent.push(location);
	}

	// var mylocaltionurl = "rest/domains/" + current_topology + "/location"
	var mylocaltionurl = "savelocation"
	$.ajax({
		url : mylocaltionurl,
		type : 'post',
		dataType : "json",
		contentType : "application/json",
		data : JSON.stringify(locationContent),
		success : function(data) {
			alert("save location of topology success .");
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			alert("failed to save topology location, detail : " + errorThrown);
		}
	});
}

function topology_getNode(nodesList, srcaddr) {

	for (var i = 0; i < nodesList.length; i++) {
		var srcNodeId = nodesList[i].name;
		if (srcaddr == srcNodeId) {
			return nodesList[i];
		}
	}
	return null;
}

function drawTopology(topologyjson) {
	if (topologyjson == null) {
		return;
	}

	if (topologyjson != null) {
		nodes.clear();
	}
	if (topologyjson != null) {
		edges.clear();
	}

	var nodesArray = [];
	var edgesArray = [];

	// 绘画设备节点
	var j = 0;
	for (j = 0; j < topologyjson.nodes.length; j++) {

		var dev = topologyjson.nodes[j];

		// node {id: 1, x: x, y: y, label: 'Node1', title: '1 emails per week'
		// },
		var title = "name:" + dev.name + "<br/>ip:" + dev.nodeId
				+ "<br/>state:" + dev.adminState + "<br/>desc:"
				+ dev.description;
		var node = {
			id : j + 1,
			label : dev.name+"\n " + dev.nodeId,
			title : title
		};
		var a = dev.x;
		var b = dev.y;
		if (a != undefined || b != undefined) {

			node.x = parseInt(a);
			node.y = parseInt(b);
		}
		node.nodeType = dev.nodeType;
		node.nodeId = dev.nodeId;
		node.name = dev.name;
		node.pid = dev.id;
		nodesArray.push(node);
	}
	vis_autogenNodeId = ++j;

	/*var flowsRes = [];*/
	$.ajax({
		url : 'lspinfos',
		type : 'get',
		dataType : 'json',
		async : false,
		success : function(msg) {

			flowsRes = msg;
		}
	});

	for (var j = 0; j < topologyjson.links.length; j++) {

		var lnk = topologyjson.links[j];
		var srcaddr = lnk.leftNodeId;
		var srcNode = topology_getNode(nodesArray, srcaddr);
		var desaddr = lnk.rightNodeId;
		var desNode = topology_getNode(nodesArray, desaddr);

		if (srcNode != null && desNode != null && srcNode.name != desNode.name) {
			// edges {from: 1, to: 3, label: '1=>3', title: '13 emails per
			// week'}
			//var description = "链路名称: " + lnk.name + "<br/>链路带宽: "
			var description = "链路" + lnk.name + "带宽: "
					+ lnk.bandwidthBc0 + "kbps<br/>leftTpId:" + lnk.leftTpId
					+ "<br/>rightTpId:" + lnk.rightTpId;
			/*
			 * var green = { color : '#009600', poacity : 1 }; var yellow = {
			 * color : '#FFD700', poacity : 1 }; var red = { color : '#FF0000',
			 * poacity : 1 }; var tmpflows = 0; var brandwidth = 0; var
			 * threshold = 0; var bc0 = 0;
			 * 
			 * for (var i = 0; i < flowsRes.length; i++) { if (flowsRes[i].name ==
			 * lnk.name) { tmpflows = Number(flowsRes[i].traffic); brandwidth =
			 * Number(flowsRes[i].brandwidth)*1000000; threshold =
			 * Number(flowsRes[i].threshold)*1000000; bc0 =
			 * Number(flowsRes[i].bc0)*1000000; } }
			 */

			var edge = {

				from : srcNode.id,
				to : desNode.id,
				label : "链路: "+lnk.name,
				title : description,
				id : lnk.id,

				color : {
					color : '#aaaaaa',
					poacity : 0.5
				},
				arrows : {
					to : {
						enabled : false,
						scaleFactor : 1
					},
					middle : {
						enabled : false,
						scaleFactor : 1
					},
					from : {
						enabled : false,
						scaleFactor : 1
					}
				}

			};

			var green = {
				color : '#009600',
				poacity : 1
			};
			var yellow = {
				color : '#FFD700',
				poacity : 1
			};
			var red = {
				color : '#FF0000',
				poacity : 1
			};
			
			var blue = {
					color : '#0000FF',
					poacity : 1
				};


			var colorArray = [ red, yellow,green ,blue ];

			for (var i = 0; i < flowsRes.length; i++) {

				for (var k = 0; k < flowsRes[i].length; k++) {
					// alert(j+","+i+","+k);
					if (((flowsRes[i][k].from == lnk.leftTpId) && (flowsRes[i][k].to == lnk.rightTpId))
							|| ((flowsRes[i][k].from == lnk.rightTpId) && (flowsRes[i][k].to == lnk.leftTpId))) {
						// alert("ok");
						
						//if (((flowsRes[i][k].from == lnk.leftTpId) && (flowsRes[i][k].to == lnk.rightTpId))) {
							edge.label = "隧道: " + flowsRes[i][k].label + "\n" + edge.label;
							if (Number(flowsRes[i][k].bandWidthCt0) > Number(lnk.bandwidthBc0)) {
								edge.title = "隧道"+ flowsRes[i][k].label +"带宽: "
										+ flowsRes[i][k].bandWidthCt0
										+ "kbps  <font color=\"red\">大于链路带宽,需要进行调优</font>" + "<br/>"
										+ edge.title;
							} else {
								edge.title = "隧道"+ flowsRes[i][k].label +"带宽: "
										+ flowsRes[i][k].bandWidthCt0 + "kbps<br/>"
										+ edge.title;
							}
						//}
						edge.color = green;
						edge.width = 2;
					}
				}
			}

			edgesArray.push(edge);
		}
	}

	nodes.add(nodesArray);
	edges.add(edgesArray);

}

function resetTopology() {
	var topologyUrl = '';
	if (current_topology != 'default') {
		// topologyUrl = 'rest/domains/' + current_topology + '/view';
		topologyUrl = 'topologyservlet';
		$
				.ajax({
					url : topologyUrl,
					type : 'GET',
					dataType : 'json',
					async : false,
					success : function(msg) {
						topologyArr = msg;
						var str = JSON.stringify(msg);

						var xmlData = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
								+ "<rpc message-id=\"1\" xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\">"
								+ "<get>"
								+ "<filter type=\"subtree\">"
								+ "<networkte xmlns=\"http://www.huawei.com/netconf/vrp\" content-version=\"1.0\" format-version=\"1.0\">"
								+ "<nodeConstraints></nodeConstraints>"
								+ "</networkte>"
								+ "</filter>"
								+ "</get>"
								+ "</rpc>";

						drawTopology(msg)
					},
					error : function(msg) {
						alert("error get topology : " + msg);
					}
				});
	}

}
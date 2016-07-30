<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jstl/fmt"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	String p = request.getParameter("lang");
%>

<%
	if ("en_US".equals(p)) {
%>
<fmt:setLocale value="en_US" />
<%
	} else {
%>
<fmt:setLocale value="zh_CN" />
<%
	}
%>
<fmt:setBundle basename="eco/language/eco" />


<div id="viewnodeModal" class="modal hide fade" 
    style="top: 15%; left: 43%; max-width: 400px; max-height: 450px; margin: 0 auto;" 
    tabindex="0" role="dialog" aria-labelledby="myModalLabel" 
    aria-hidden="true">
    <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"
            onclick="clearDeviceForm()" aria-hidden="true">×</button>
        <h3 id="addNodeModalLabel">
            <i class="icon-add"></i> &nbsp;
            <fmt:message key="node.button.add" />
            <!-- 创建节点 -->
        </h3>
    </div>
    <div class="modal-body">
        <div class="box-content">
            <form class="form-horizontal">
                <fieldset>
                    <div class="control-group" id="viewnodeid" style="display: none;">
                                    <label class="control-label" ><fmt:message key="id" /><!-- 节点id： --></label>
                                    <div class="controls">
                                        <input id="viewnodeid"  
                                            name="viewnodeid" class="input-xlarge"  type="text" readonly="readonly" />
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label" ><span style="color:#b20202;">*</span><fmt:message key="nodename" /><!-- 节点名称： --></label>
                                    <div class="controls">
                                        <input id="viewnodename"  
                                            name="viewnodename" class="input-xlarge"  type="text" />
                                        <span class="validate" id="viewnodenamespan"></span>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label" ><fmt:message key="nodedescription" /><!-- 节点描述： --></label>
                                    <div class="controls">
                                        <input name="viewnodedescription"  type="text" class="input-xlarge"  />
                                        <span class="validate" id="viewnodedescriptionspan"></span>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label" ><span style="color:#b20202;">*</span><fmt:message key="nodeType" /><!-- 节点类型： --></label>
                                    <div class="controls">
                                        <input  name="viewnodeType" class="input-xlarge"  type="text" />
                                        <span class="validate" id="viewnodeTypespan"></span>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label" ><span style="color:#b20202;">*</span><fmt:message key="nodeId" /><!-- 节点IP： --></label>
                                    <div class="controls">
                                        <input name="viewnodeId" class="input-xlarge"  type="text" />
                                        <span class="validate" id="viewnodeIdspan"></span>
                                    </div>
                                </div>
                                <div class="control-group">
                                    <label class="control-label" ><span style="color:#b20202;">*</span><fmt:message key="nodeadminState" /><!-- 节点状态： --></label>
                                    <div class="controls">
                                        <input name="viewnodeadminState" class="input-xlarge"  type="text" />
                                        <span class="validate" id="viewnodeadminStatespan"></span>
                                    </div>
                                </div>
                                 
                                <div class="form-actions" style="width: 200px;">
                                    <a id="saveNodeButton" class="btn btn-primary" onclick="addTopologyNode()"> <fmt:message key="use" /><!-- 应用 --> </a> 
                                    <a id="cancelNodeButton" class="btn" data-dismiss="modal" onclick="clearViewNodeForm()"> <fmt:message key="reset" /><!-- 重置 --> </a>
                                </div>
                </fieldset>
            </form>
        </div>
    </div>
</div>


<!--  button modal-->
<div id="addLine" class="modal hide fade"
	style="top: 15%; left: 35%; margin: 0 auto; width: 550px; height: 600px;"
	tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
	aria-hidden="true">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal"
			aria-hidden="true">×</button>
		<h3 id="myModalLabel">
			<i class="icon-edit"></i> &nbsp;
			<fmt:message key="createLink" />
			<!-- 创建连线 -->
		</h3>
	</div>
	<div class="tab-pane active" style="height: 500px;">
		<div class="box-content">
			<ul class="nav nav-tabs" id="myTab">
				<li class="active"><a href="#deftunnel"><span
						class="icon icon-blue icon-gear"></span> <fmt:message
							key="createLink" /> <!-- 创建连线--> </a></li>
			</ul>
			<div id="myTabContent" class="tab-content"
				style="margin-left: 90px; height: 450px;">
				<div class="tab-pane active" id="deftunnel">
					<form class="form-horizontal">
						<fieldset>
							<div class="control-group" id="viewlinkid" style="display: none;">
								<label class="control-label"><fmt:message key="id" />
									<!-- 连线id： --></label>
								<div class="controls">
									<input id="viewlinkid" name="viewlinkid" class="input-xlarge"
										type="text" readonly="readonly" />
								</div>
							</div>
							<div class="control-group">
								<label class="control-label"><span style="color:#b20202;">*</span><fmt:message
										key="linkname" />
									<!-- 连线名称： --></label>
								<div class="controls">
									<input name="viewlinkname" class="input-xlarge" type="text">
								</div>
							</div>
							<div class="control-group">
								<label class="control-label"><fmt:message
										key="linkdescription" />
									<!-- 连线描述： --></label>
								<div class="controls">
									<input name="viewlinkdescription" type="text">
								</div>
							</div>
							<div class="control-group">
								<label class="control-label"><fmt:message
										key="leftNodeType" />
									<!-- 左节点类型： --></label>
								<div class="controls">
									<input name="viewleftNodeType" class="input-xlarge" type="text">
								</div>
							</div>
							<div class="control-group">
								<label class="control-label"><span style="color:#b20202;">*</span><fmt:message
										key="leftNodeId" />
									<!-- 左节点名称： --></label>
								<div class="controls">
									<input name="viewleftNodeId" class="input-xlarge" type="text">
								</div>
							</div>

							<div class="control-group">
								<label class="control-label"><fmt:message
										key="leftTpType" />
									<!-- 左端口类型： --></label>
								<div class="controls">
									<input name="viewleftTpType" class="input-xlarge" type="text">
								</div>
							</div>
							<div class="control-group">
								<label class="control-label"><span style="color:#b20202;">*</span><fmt:message
										key="leftTpId" />
									<!-- 左端口IP： --></label>
								<div class="controls">
									<input name="viewleftTpId" class="input-xlarge" type="text">
								</div>
							</div>
							<div class="control-group">
								<label class="control-label"><fmt:message
										key="leftTpDesc" />
									<!-- 左节点描述： --></label>
								<div class="controls">
									<input name="viewleftTpDesc" class="input-xlarge" type="text">
								</div>
							</div>
							<div class="control-group">
								<label class="control-label"><fmt:message
										key="rightNodeType" />
									<!-- 右节点类型： --></label>
								<div class="controls">
									<input name="viewrightNodeType" class="input-xlarge"
										type="text">
								</div>
							</div>
							<div class="control-group">
								<label class="control-label"><span style="color:#b20202;">*</span><fmt:message
										key="rightNodeId" />
									<!-- 右节点名称： --></label>
								<div class="controls">
									<input name="viewrightNodeId" class="input-xlarge" type="text">
								</div>
							</div>
							<div class="control-group">
								<label class="control-label"><fmt:message
										key="rightTpType" />
									<!-- 右端口类型： --></label>
								<div class="controls">
									<input name="viewrightTpType" class="input-xlarge" type="text">
								</div>
							</div>
							<div class="control-group">
								<label class="control-label"><span style="color:#b20202;">*</span><fmt:message
										key="rightTpId" />
									<!-- 右端口IP： --></label>
								<div class="controls">
									<input name="viewrightTpId" class="input-xlarge" type="text">
								</div>
							</div>
							<div class="control-group">
								<label class="control-label"><fmt:message
										key="rightTpDesc" />
									<!-- 右节点描述： --></label>
								<div class="controls">
									<input name="viewrightTpDesc" class="input-xlarge" type="text">
								</div>
							</div>
							<div class="form-actions" style="width: 200px;">
								<a class="btn btn-primary" onclick="addViewLink()"> <fmt:message
										key="use" />
									<!-- 应用 -->
								</a> <a class="btn btn-primary" data-dismiss="modal" onclick="clearViewLinkForm()"> <fmt:message
										key="reset" />
									<!-- 重置 -->
								</a>
							</div>
						</fieldset>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
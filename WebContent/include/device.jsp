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
    
<!-- Modal -->
<div id="deviceModal" class="modal hide fade" 
	style="top: 15%; left: 43%; max-width: 400px; max-height: 450px; margin: 0 auto;" 
	tabindex="0" role="dialog" aria-labelledby="myModalLabel" 
	aria-hidden="true">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal"
			onclick="clearDeviceForm()" aria-hidden="true">×</button>
		<h3 id="addDeviceModalLabel">
            <i class="icon-add"></i> &nbsp;
            <fmt:message key="device.button.add" />
            <!-- 域管理 -->
        </h3>
        
        <h3 id="modifyDeviceModalLabel">
            <i class="icon-edit"></i> &nbsp;
            <fmt:message key="device.button.modify" />
            <!-- 域管理 -->
        </h3>
	</div>
	<div class="modal-body">
		<div class="box-content">
			<form class="form-horizontal">
				<fieldset>
               <div class="control-group" id="deviceidgroup">
                        <label class="control-label" for="disableInput">
                            <fmt:message key="device.table.header.id" /> <!--域ID -->
                        </label>
                        <div class="controls">
                            <input id="disableInput" type="text" class="input-xlarge disabled" disabled="" value="" id="deviceid" name="deviceid">
                        </div>
                    </div>
					<div class="control-group">
						<label class="control-label"><span style="color:#b20202;">*</span><fmt:message
								key="device.table.deviceName" /> <!-- 设备名称 --></label>
						<div class="controls">
							<input id="deviceName" class="input-xlarge" name="devicename"
								type="text">
						</div>
					</div>
					<div class="control-group">
						<label class="control-label"><span style="color:#b20202;">*</span><fmt:message
								key="device.table.ipAddress" />: <!-- IP地址 --></label>
						<div class="controls">
							<input class="input-xlarge" name="ip" type="text">
						</div>
					</div>
					<div class="control-group">
						<label class="control-label"><span style="color:#b20202;">*</span><fmt:message
								key="device.table.port" />: <!-- 端口 --></label>
						<div class="controls">
							<input class="input-xlarge" name="port" type="text">
						</div>
					</div>
					<div class="control-group">
						<label class="control-label"><span style="color:#b20202;">*</span><fmt:message
								key="device.table.username" />: <!-- 用户名 --></label>
						<div class="controls">
							<input class="input-xlarge" name="username" type="text">
						</div>
					</div>
					<div class="control-group">
						<label class="control-label"><span style="color:#b20202;">*</span><fmt:message
								key="device.table.password" />: <!-- 密码 --></label>
						<div class="controls">
							<input class="input-xlarge" name="passwd" type="password">
						</div>
					</div>
					<div class="control-group">
						<label class="control-label"><span style="color:#b20202;">*</span><fmt:message
								key="device.table.version" />: <!-- 版本 --></label>
						<div class="controls">
							<input class="input-xlarge" name="version" type="text" value="" />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label"><span style="color:#b20202;">*</span><fmt:message
								key="device.table.productType" />: <!-- 产品类型 -->
						</label>
						<div class="controls">
							<input class="input-xlarge" name="productType" type="text"
								value="">:
						</div>
					</div>
					<div class="control-group">
						<label class="control-label"><span style="color:#b20202;">*</span><fmt:message
								key="device.table.state" />: <!-- 状态 --></label>
						<div class="controls">
							<input class="input-xlarge" name="status" type="text" value="">
						</div>
					</div>
					<div class="control-group">
						<label class="control-label"><span style="color:#b20202;">*</span><fmt:message
								key="device.table.Protocol" />: <!-- 协议 --></label>
						<div class="controls">
							<input class="input-xlarge" name="protocol" type="text" value="">
						</div>
					</div>

					<div class="form-actions">
						<button type="button" class="btn btn-primary"
							onclick="summitDevice()">
							<fmt:message key="ok" />
							<!-- 确定 -->
						</button>
						<button type="button" onclick="clearDeviceForm()" class="btn"
							data-dismiss="modal" aria-hidden="true">
							<fmt:message key="cancel" />
							<!-- 取消 -->
						</button>
					</div>
				</fieldset>
			</form>
		</div>
	</div>
</div>



<!-- Modal -->
<div id="deviceManage" class="modal hide fade" 
	style="top: 30%; left: 10%;  width: 1200px; margin: 0 auto;" 
	tabindex="-1" role="dialog" aria-labelledby="myModalLabel" 
	aria-hidden="true">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal"
			aria-hidden="true">×</button>
		<h3 id="myModalLabel">
		<i class="icon-th-large"></i>  
			<fmt:message key="dropdown.menu.deviceOperate" />
		</h3>
	</div>
	<div class="modal-body" style="height: 70%">
		<div class="box-content">
			<table
				class="table table-bordered table-striped table-condensed bootstrap-datatable">
				<thead>
					<tr>
						<th style="width: 4%;">ID</th>
						<th style="width: 4%;"><fmt:message
								key="device.table.deviceName" /></th>
						<th style="width: 4%;"><fmt:message
								key="device.table.ipAddress" /></th>
						<th style="width: 4%;"><fmt:message key="device.table.port" /></th>
						<th style="width: 5%;"><fmt:message
								key="device.table.username" /></th>
						<th style="width: 5%;"><fmt:message
								key="device.table.productType" /></th>
						<th style="width: 5%;"><fmt:message
								key="device.table.version" /></th>

						<th style="width: 4%;"><fmt:message
								key="device.table.Protocol" /></th>
						<th style="width: 4%;"><fmt:message key="device.table.state" /></th>
						<th style="width: 100px;"><fmt:message key="device.operate" /></th>
					</tr>
				</thead>
			</table>
		</div>
	</div>
	
	<div class="modal-footer">
        <a href="#deviceModal" data-toggle="modal" class="btn btn-primary" onclick="loadAddDevice()">
            <fmt:message key="device.button.add" />
        </a> <a href="#" class="btn" data-dismiss="modal"><fmt:message
                key="button.close" /></a>
    </div>
</div>
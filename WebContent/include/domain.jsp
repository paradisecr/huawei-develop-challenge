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

<!-- add / modify domain  -->
<div id="domainModal" class="modal hide fade"
	style="top: 15%; left: 43%; max-width: 400px; max-height: 450px; margin: 0 auto;"
	tabindex="0" role="dialog" aria-labelledby="myModalLabel"
	aria-hidden="true">

	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal"
			onclick="clearDomainForm()" aria-hidden="true">×</button>
		<h3 id="addDomainModalLabel">
			<i class="icon-add"></i> &nbsp;
			<fmt:message key="domain.button.add" />
			<!-- 域管理 -->
		</h3>
		
		<h3 id="modifyDomainModalLabel">
            <i class="icon-edit"></i> &nbsp;
            <fmt:message key="domain.button.modify" />
            <!-- 域管理 -->
        </h3>
	</div>
	<div class="modal-body">
		<div class="box-content">
			<form class="form-horizontal">
				<fieldset>
				   <div class="control-group" id="domainidgroup">
                        <label class="control-label" for="disableInput">
                            <fmt:message key="domain.table.header.domainid" /> <!--域ID -->
                        </label>
                        <div class="controls">
                            <input id="disableInput" type="text" class="input-xlarge disabled" disabled="" value="" id="domainid" name="domainid">
                        </div>
                    </div>
                    
					<div class="control-group">
						<label class="control-label"><span style="color:#b20202;">*</span>
						   <fmt:message key="domain.table.header.domainname" /> <!-- 管理域名称 -->
						</label>
						<div class="controls" style="width: 10px;">
							<input id="domainname" class="input-xlarge" name="domainname" type="text"> 
						</div>
					</div>
					<div class="control-group">
						<label class="control-label"><span style="color:#b20202;">*</span><fmt:message
								key="domain.table.header.domainType" /> <!-- 管理域类型 --></label>
						<div class="controls">
							<select id="domaintype" name="domaintype" >
								<!-- <option value="networkte">networkte</option>
								<option value="ospf">ospf</option>
								<option value="Manual">Manual</option> -->
							</select>
						</div>
					</div>

					<div class="control-group">
						<label class="control-label"><span style="color:#b20202;">*</span><fmt:message
								key="domain.table.header.domainserver" /> <!-- 服务节点 --></label>
						<div class="controls" style="width: 10px;">
							<input id="servertype" class="input-xlarge" name="servertype"
								type="text">
						</div>
					</div>
					<div class="control-group">
						<label class="control-label"><span style="color:#b20202;">*</span><fmt:message
								key="domain.table.header.domaindevices" /> <!-- 拓扑节点 --></label>
						<div class="controls" style="width: 10px;">
							<input id="devicestype" class="input-xlarge" name="devicestype"
								type="text">
						</div>
					</div>
					<div class="control-group">
						<label class="control-label"> <fmt:message
								key="domain.table.header.domainconfigure" /> <!-- Topo配置信息 --></label>
						<div class="controls">
							<textarea id="topoconfigure" name="topoconfigure" rows="5" cols="17"></textarea>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label"> <fmt:message
								key="domain.table.header.domaindescription" /> <!-- 管理域简介 --></label>
						<div class="controls">
							<input class="input-xlarge" name="domaindescription" type="text"
								value="">
						</div>
					</div>
					<div class="form-actions">
						<button type="button" class="btn btn-primary" onclick="summitDomain()">
							<fmt:message key="ok" />
							<!-- 确定 -->
						</button>
						<button type="button" onclick="clearDomainForm()" class="btn" data-dismiss="modal" aria-hidden="true">
							<fmt:message key="cancel" />
							<!-- 取消 -->
						</button>
					</div>
				</fieldset>
			</form>
		</div>
	</div>
 
</div>
 

<!-- domain manager  -->
<div id="domainManage" class="modal hide"
	style="top: 15%; left: 35%; width: 700px; margin: 0 auto;"
	tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
	aria-hidden="true">
	<div class="modal-header">
		<button type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="resetTopologymenu()" >×</button>
		<h3 id="myModalLabel">
		<i class="icon-th-large"></i> 
			<fmt:message key="domain.table.header.domainmanager" />
			<!-- 管理域 -->
		</h3>
	</div>

	<div class="modal-body">
		<div class="box-content">
			<table
				class="table table-bordered table-striped table-condensed bootstrap-datatable">
				<thead>
					<tr>
						<th style="width: 10px;"><fmt:message
								key="domain.table.header.domainid" /> <!-- 域ID --></th>
						<th style="width: 30px;"><fmt:message
								key="domain.table.header.domainname" /> <!-- 域名称 --></th>
						<th style="width: 20px;"><fmt:message
								key="domain.table.header.domainType" /> <!-- 域类型 --></th>
						<th style="width: 40px;"><fmt:message
								key="domain.table.header.domainserver" /> <!-- 服务节点 --></th>
						<th style="width: 40px;"><fmt:message
								key="domain.table.header.domaindevices" /> <!-- 转发节点--></th>
						<th style="width: 100px;"><fmt:message
								key="domain.table.header.domainoperate" /> <!-- 域操作 --></th>
					</tr>
				</thead>
			</table>
		</div>
	</div>

	<div class="modal-footer">
		<a href="#domainModal" data-toggle="modal" class="btn btn-primary" onclick="loadAddDomain()">
			<fmt:message key="domain.button.add" />
		</a> 
		<a href="#" class="btn" data-dismiss="modal" onclick="resetTopologymenu()" >
		    <fmt:message key="button.close" />
		</a>
	</div>
</div>

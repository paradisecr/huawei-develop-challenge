package com.huawei.sdndev.pce.service;

import org.apache.commons.lang3.StringUtils;

import net.sf.json.JSONObject;

public class TunnelService {

	
	/**
	 * 下发隧道约束条件
	 * @param tunnelName
	 * @param symbolicPathName
	 * @param description
	 * @param tnlSource
	 * @param setupPriority
	 * @param bandwidth
	 * @return
	 */
	public static JSONObject updateTunnelConstrain(String tunnelName, String symbolicPathName, String description, String tnlSource, Integer setupPriority, Long bandwidth) {
		JSONObject resultJo = new JSONObject();
		if (StringUtils.isEmpty(tunnelName)) {
			resultJo.put("isSuccess", false);
			resultJo.put("code", 201);
			resultJo.put("msg", "操作失败！Reason:tunnelName不能为空！");
		}
		String content = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
                + "<rpc message-id=\"1\" xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\">"
				+ "<edit-config>"
                + "<target><running/></target>"
				+ "<default-operation>merge</default-operation>"
				+ "<error-option>rollback-on-error</error-option>"
				+ "<config>"
				+ "<networkte xmlns=\"http://www.huawei.com/netconf/vrp\" content-version=\"1.0\" format-version=\"1.0\">"
				+ "<tunnels>"
				+ "<tunnel operation=\"merge\">"
				+ "<tunnelName>" + tunnelName + "</tunnelName>";
				if (StringUtils.isNotEmpty(description)) {
					content += "<description>" + description + "</description>";
				}
				if (StringUtils.isNotEmpty(tnlSource)) {
					content += "<tnlSource>" + tnlSource + "</tnlSource>";
				}
				if (StringUtils.isNotEmpty(tunnelName)) {
					content += "<symbolicPathName>" +tunnelName  + "</symbolicPathName>";
				}
				if ((setupPriority != null ) || (bandwidth != null)) {
					content = content + "<tunnelConstraint>"
							+ "<setupPriority>" + setupPriority + "</setupPriority>"
							+ "<holdPriority>" + setupPriority + "</holdPriority>"
							+ "<bandwidth>" + bandwidth + "</bandwidth>"
							+ "</tunnelConstraint>";
				}
				content = content +"</tunnel>"
				+ "</tunnels>"
				+ "</networkte>"
				+ "</config>"
                + "</edit-config>"
				+ "</rpc>"
				;
		PceClient myQos = new PceClient("ac.properties");
		String result = myQos.send(content);
		System.out.println(content);
		System.out.println(result);
		
        if(result != null && result.contains("ok")){
    		resultJo.put("isSuccess", true);
    		resultJo.put("code", 200);
    		resultJo.put("msg", "操作成功！");
    		return resultJo;
        }
        resultJo.put("isSuccess", false);
		resultJo.put("code", 201);
		resultJo.put("msg", "操作失败！Reason:\n" + result);
		return resultJo;
	}
}

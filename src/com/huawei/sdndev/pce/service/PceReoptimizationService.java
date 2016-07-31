package com.huawei.sdndev.pce.service;

import com.huawei.sdndev.pce.api.PceServerPceReoptimization;
import com.huawei.sdndev.pce.api.PceServerPceReoptimizationByIp;
import com.huawei.sdndev.pce.api.PceServerPceReoptimizationBytunnel;
import com.huawei.sdndev.pce.api.PceServerPceReoptimizationForMultipleLsp;
import com.huawei.sdndev.pce.common.OperationMethod;
import com.huawei.sdndev.pce.util.TemplateUtil;

import net.sf.json.JSONObject;

public class PceReoptimizationService {

	/**
	 * 全局重优化
	 * @return
	 */
	public static JSONObject reoptimizeGlobal() {

        String content = "";
        PceServerPceReoptimization bean = new PceServerPceReoptimization();
        bean.setReoptimization(true);
        bean.setComputationPriority(100);
        content = TemplateUtil.makeXmlRpcByTemplate(bean, OperationMethod.ACTION);

        String result = PceService.sendMsg(content);
        JSONObject resultJo = new JSONObject();
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
	/**
	 * 通过名字进行单条隧道重优化
	 * @param tunnelName
	 * @return
	 */
	public static JSONObject reoptimizSingleTunelByName(String tunnelName) {
		PceServerPceReoptimizationBytunnel bean = new PceServerPceReoptimizationBytunnel();
        bean.setTunnelName(tunnelName);
        String content = TemplateUtil.makeXmlRpcByTemplate(bean, OperationMethod.ACTION);
		String result = PceService.sendMsg(content);
		JSONObject resultJo = new JSONObject();
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

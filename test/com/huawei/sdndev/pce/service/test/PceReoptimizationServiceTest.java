package com.huawei.sdndev.pce.service.test;

import org.junit.Test;

import com.huawei.sdndev.pce.service.PceReoptimizationService;

import net.sf.json.JSONObject;

public class PceReoptimizationServiceTest {

	@Test
	public void reoptimizeGlobalTest() {
		JSONObject result = PceReoptimizationService.reoptimizeGlobal();
		assert((null != result) && result.getBoolean("isSuccess"));
	}
	@Test
	public void reoptimizSingleTunelByNameTest() {
		JSONObject result = PceReoptimizationService.reoptimizSingleTunelByName("Tunnel0/0/6");
		assert((null != result) && result.getBoolean("isSuccess"));
	}
}

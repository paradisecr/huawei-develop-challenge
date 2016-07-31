package com.huawei.sdndev.pce.service.test;

import org.junit.Test;

import com.huawei.sdndev.pce.service.LinkService;

import net.sf.json.JSONObject;

public class LinkServiceTest {
	
	@Test
	public void getLinkInfoListTest() {
		JSONObject resultJo = LinkService.getLinkInfoList();
		System.out.println(resultJo.toString());
	}
	
	@Test
	public void updateLinkLimitBwTest() {
		Long limitBw = 1000L;
		String linkName = "linkLimitTest";
		JSONObject resultJo = LinkService.updateLinkLimitBw(linkName, limitBw);
		System.out.println(resultJo);
		assert((null != resultJo) && resultJo.getBoolean("isSuccess"));
	}
}

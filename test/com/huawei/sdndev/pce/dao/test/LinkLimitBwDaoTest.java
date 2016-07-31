package com.huawei.sdndev.pce.dao.test;

import org.junit.Test;

import com.huawei.sdndev.pce.dao.LinkLimitBwDao;
import com.huawei.sdndev.pce.service.LinkService;

import net.sf.json.JSONObject;

public class LinkLimitBwDaoTest {
	@Test
	public void updateLinkLimitBwTest() {
		Long limitBw = 1000L;
		String linkName = "linkLimitTest";
		LinkLimitBwDao.updateLinkLimitBw(linkName, limitBw);
		assert(limitBw.equals(LinkLimitBwDao.getLinkLimitBw(linkName)));
	}
}

package com.huawei.sdndev.pce.service.test;

import org.junit.Test;

import com.huawei.sdndev.pce.service.TunnelService;

public class TunnelServiceTest {

	@Test
	public void updateTunnelConstrainTest() {
		String tunnelName = "Tunnel0/0/6"; //隧道约束名称
		String description = "set-tunnel-contraint";
		String tnlSource = "6.6.6.6";
		int setupPriority = 2;
		long bandwidth = 10000;
		TunnelService.updateTunnelConstrain(tunnelName, tunnelName, description,tnlSource,setupPriority,bandwidth);
	}
}

package com.huawei.sdndev.pce.service;

public class PceService {
	
	public static String sendMsg(String content) {
		PceClient myQos = new PceClient("ac.properties");
		String result = myQos.send(content);
		return result;
	}
}

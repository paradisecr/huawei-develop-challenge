package com.huawei.sdndev.pce.dao;

import java.util.HashMap;
import java.util.concurrent.ConcurrentHashMap;

import com.sun.javafx.collections.MappingChange.Map;
import com.sun.org.apache.bcel.internal.generic.NEW;

/**
 * 记录链路门限带宽
 * @author cr
 *
 */
public class LinkLimitBwDao {

	private static ConcurrentHashMap<String, Long> linkLimitBwStore = new ConcurrentHashMap();
	
	public static void updateLinkLimitBw(String linkName, Long limitBw) {
		linkLimitBwStore.put(linkName, limitBw);
	}
	
	public static Long getLinkLimitBw(String linkName) {
		return linkLimitBwStore.get(linkName);
	}
}

package com.huawei.sdndev.pce.service;

import com.huawei.sdndev.pce.dao.LinkLimitBwDao;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class LinkService {

	
	/**
	 * 查询链路信息列表
	 * @return
	 */
	public static JSONObject getLinkInfoList() {
		String content = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
                + "<rpc message-id=\"101\" xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\">"
                + "<get>"
                + "<filter type=\"subtree\">"
                + "<networkte xmlns=\"http://www.huawei.com/netconf/vrp\" content-version=\"1.0\" format-version=\"1.0\">"
                + "<linkInfos>"
                + "<linkInfo>"
                + "<linkName></linkName>"
                + "<reservableBandwidthBc0></reservableBandwidthBc0>"
                + "<latency></latency>"
                + "<administrativeGroup></administrativeGroup>"
                + "<linkStus>"
                + "<linkStu>"
                + "<usedBW></usedBW>"
                + "</linkStu>"
                + "</linkStus>"
                + "</linkInfo>"
                + "</linkInfos>"
                + "</networkte>"
                + "</filter>"
                + "</get>"
                + "</rpc>";
		String result = PceService.sendMsg(content);
		JSONObject outJo = new JSONObject();
		String resultJs = PceClient.xmlToJSON(result);
		JSONObject resultJo = JSONObject.fromObject(resultJs);
		JSONArray networkteArray = resultJo.getJSONArray("networkte");
		JSONArray linkInfoList = networkteArray.getJSONObject(0).getJSONArray("linkInfos");
		JSONArray outLinkList = new JSONArray();
		for (int i = 0; i < linkInfoList.size(); i++) {
			JSONArray linkInfo = linkInfoList.getJSONObject(i).getJSONArray("linkInfo");
			JSONObject outLink = new JSONObject();
			String linkName = linkInfo.getJSONObject(0).getString("linkName");
			String latency = linkInfo.getJSONObject(1).getString("latency");
			String reservableBandwidthBc0 = linkInfo.getJSONObject(2).getString("reservableBandwidthBc0");
			String administrativeGroup = linkInfo.getJSONObject(3).getString("administrativeGroup");
			outLink.put("latency", latency);
			outLink.put("linkName", linkName);
			outLink.put("reservableBandwidthBc0", reservableBandwidthBc0);
			outLink.put("administrativeGroup", administrativeGroup);
			
			JSONArray linkStus = linkInfo.getJSONObject(4).getJSONArray("linkStus");
			long usedBw = 0;
			for (int j = 0; j < linkStus.size(); j++) {
				JSONArray linkStu = linkStus.getJSONObject(j).getJSONArray("linkStu");
				long curUsedBw = Long.valueOf(linkStu.getJSONObject(0).getString("usedBW"));
				usedBw += curUsedBw;
			}
			outLink.put("usedBw", usedBw);
			Long limitBw = LinkLimitBwDao.getLinkLimitBw(linkName);
			outLink.put("limitBw", limitBw == null ? 0 : limitBw);
			outLinkList.add(outLink);
		}
		JSONObject dataJo = new JSONObject();
		dataJo.put("linkInfoList", outLinkList);
		outJo.put("isSuccess", true);
		outJo.put("code", 200);
		outJo.put("msg", "取数据成功！");
		outJo.put("data", dataJo);
		return outJo;
	}
	
	/**
	 * 设置链路门限带宽
	 * @param linkName
	 * @param limitBw
	 * @return
	 */
	public static JSONObject updateLinkLimitBw(String linkName, long limitBw) {
		JSONObject outJo = new JSONObject();
		LinkLimitBwDao.updateLinkLimitBw(linkName, limitBw);
		outJo.put("isSuccess", true);
		outJo.put("code", 200);
		outJo.put("msg", "设置该链路门限带宽成功！");
		return outJo;
	}
}

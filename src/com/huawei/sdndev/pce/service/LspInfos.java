package com.huawei.sdndev.pce.service;

import com.huawei.sdndev.pce.util.JsonElementGetter;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * 此类用于操作隧道信息
 * 
 * @author wangyingying
 * @version 1.0
 * @since 1.6
 */
public class LspInfos {

    /**
     * 查看隧道信息
     * 
     * @return 隧道信息
     */
    public static String getLspInfos() {
        
        JSONArray outja = new JSONArray();

        PceClient myQos = new PceClient("ac.properties");
        String content = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
                + "<rpc message-id=\"101\" xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\">"
                + "<get>"
                + "<filter type=\"subtree\">"
                + "<networkte xmlns=\"http://www.huawei.com/netconf/vrp\" format-version=\"1.0\" content-version=\"1.0\">"
                + "<lspInfos>"
                + "<lspInfo>"
                + "<lspType>primary</lspType>"
                //+ "<lspType>hotStandby</lspType>"
                + "</lspInfo>"
                + "</lspInfos>"
                + "</networkte>"
                + "</filter>"
                + "</get>"
                + "</rpc>";

        String result = myQos.send(content);
        String resultJson = PceClient.xmlToJSON(result);
        System.out.println(result);
        
        JSONObject resjo = JSONObject.fromObject(resultJson);
        if (!resjo.containsKey("networkte"))
        {
        	return outja.toString();
        }
        JSONArray networkteArray = resjo.getJSONArray("networkte");
        
        JSONObject networkteArray0 = networkteArray.getJSONObject(0);
        JSONArray lspInfos = networkteArray0.getJSONArray("lspInfos");
        
        JSONObject jo = null;
        for (int i = 0; i < lspInfos.size(); i++) {
            
            JSONArray lspInfo = lspInfos.getJSONObject(i).getJSONArray("lspInfo");
            String pccClientIpAddress = JsonElementGetter.getValueString(lspInfo, "pccClientIpAddress");
            String symPathName = JsonElementGetter.getValueString(lspInfo, "symPathName"); 
            String lspState = JsonElementGetter.getValueString(lspInfo, "lspState"); 
            String setupPriority = JsonElementGetter.getValueString(lspInfo, "setupPriority","0");
            String affinityIncludeAny = JsonElementGetter.getValueString(lspInfo, "affinityIncludeAny","0x0");
            String bandWidthCt0 = JsonElementGetter.getValueString(lspInfo, "bandWidthCt0","0");
            JSONArray ja = new JSONArray();
            
            JSONArray hops = JsonElementGetter.getValueArray(lspInfo, "hops");
            if(hops != null) {
	            for (int j = 0; j < hops.size(); j++) {
	                JSONArray hop = hops.getJSONObject(j).getJSONArray("hop");
	                String nodeId = JsonElementGetter.getValueString(hop,"nodeId");
	                if(j%2 == 0){
	                    jo = new JSONObject();
	                    jo.put("label", symPathName);
	                    jo.put("title", pccClientIpAddress);
	                    jo.put("lspState", lspState);
	                    jo.put("from", nodeId); 
	                    jo.put("bandWidthCt0", bandWidthCt0);
	                    jo.put("setupPriority", setupPriority); 
	                    jo.put("affinityIncludeAny", affinityIncludeAny);
	                }else{
						jo.put("to", nodeId);
	                    jo.put("bandWidthCt0", bandWidthCt0);
	                    jo.put("setupPriority", setupPriority); 
	                    jo.put("affinityIncludeAny", affinityIncludeAny);
	                    ja.add(jo);
	                }
	            }
            } else {
                jo = new JSONObject();
                jo.put("label", symPathName);
                jo.put("title", pccClientIpAddress);
                jo.put("lspState", lspState);
                jo.put("bandWidthCt0", bandWidthCt0);
                jo.put("setupPriority", Integer.valueOf(setupPriority)); 
                jo.put("affinityIncludeAny", Long.valueOf(affinityIncludeAny));
                ja.add(jo);
            }
            outja.add(ja);
        }
        return outja.toString();
    }


}

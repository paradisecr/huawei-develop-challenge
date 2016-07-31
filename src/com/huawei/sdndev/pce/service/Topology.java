package com.huawei.sdndev.pce.service;

import java.util.List;

import com.huawei.sdndev.pce.bean.Location;
import com.huawei.sdndev.pce.dao.DevicesLocationDao;
import com.huawei.sdndev.pce.util.JsonElementGetter;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * 此类用于查看拓扑信息
 * 
 * @author wangyingying
 * @version 1.0
 * @since 1.6
 */
public class Topology {

    /**
     * 查看拓扑信息
     * 
     * @return 拓扑信息
     */
    public static String getToplogy() {

        JSONObject outjo = new JSONObject();
        outjo.put("id", "1");
        outjo.put("name", "topology");
        outjo.put("alias", "networkte");
        outjo.put("domain", "domain1");
        outjo.put("location", new JSONArray());
        outjo.put("nodes", new JSONArray());
        outjo.put("links", new JSONArray());
        outjo.put("errMsg", new JSONArray());
        List<Location> ll = DevicesLocationDao.selectAll();

        PceClient myQos = new PceClient("ac.properties");
        String content = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
                + "<rpc message-id=\"1\" xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\">"
                + "<get>"
                + "<filter type=\"subtree\">"
                + "<networkte xmlns=\"http://www.huawei.com/netconf/vrp\" content-version=\"1.0\" format-version=\"1.0\">"
                + "<linkConstraints></linkConstraints>"
                + "<nodeConstraints></nodeConstraints>"
                + "</networkte>"
                + "</filter>"
                + "</get>"
                + "</rpc>";

        String result = myQos.send(content);
        String resultJson = PceClient.xmlToJSON(result);
        //System.out.println(result);

        JSONObject resjo = JSONObject.fromObject(resultJson);
        if (!resjo.containsKey("networkte"))
        {
            return outjo.toString();
        }
        JSONArray networkteArray = resjo.getJSONArray("networkte");

        JSONObject networkteArray0 = networkteArray.getJSONObject(0);
        JSONArray linkConstraints = networkteArray0.getJSONArray("linkConstraints");
        JSONArray outLinks = outjo.getJSONArray("links");
        for (int i = 0; i < linkConstraints.size(); i++) {
            JSONArray linkConstraint = linkConstraints.getJSONObject(i).getJSONArray("linkConstraint");

            String linkName = JsonElementGetter.getValueString(linkConstraint, "linkName");
            String leftNodeType = JsonElementGetter.getValueString(linkConstraint, "leftNodeType");
            String leftNodeId = JsonElementGetter.getValueString(linkConstraint, "leftNodeId");
            String leftTpType = JsonElementGetter.getValueString(linkConstraint, "leftTpType");
            String leftTpId = JsonElementGetter.getValueString(linkConstraint, "leftTpId");
            String rightNodeType = JsonElementGetter.getValueString(linkConstraint, "rightNodeType");
            String rightNodeId = JsonElementGetter.getValueString(linkConstraint, "rightNodeId");
            String rightTpType = JsonElementGetter.getValueString(linkConstraint, "rightTpType");
            String rightTpId = JsonElementGetter.getValueString(linkConstraint, "rightTpId");
            String bandwidthBc0 = JsonElementGetter.getValueString(linkConstraint, "bandwidthBc0");
            // System.out.println(linkName+","+leftNodeType+","+leftNodeId+","+leftTpType+","+leftTpId+","+rightNodeType+","+rightNodeId+","+rightTpType+","+rightTpId);

            JSONObject outLink = new JSONObject();
            outLink.put("name", linkName);
            outLink.put("description", "");
            outLink.put("leftNodeType", leftNodeType);
            outLink.put("leftNodeId", leftNodeId);
            outLink.put("leftTpType", leftTpType);
            outLink.put("leftTpId", leftTpId);
            outLink.put("rightNodeType", rightNodeType);
            outLink.put("rightNodeId", rightNodeId);
            outLink.put("rightTpType", rightTpType);
            outLink.put("rightTpId", rightTpId);
            outLink.put("bandwidthBc0", bandwidthBc0);
            outLinks.add(outLink);
        }

        JSONObject networkteArray1 = networkteArray.getJSONObject(1);
        JSONArray nodeConstraints = networkteArray1.getJSONArray("nodeConstraints");
        JSONArray outNodes = outjo.getJSONArray("nodes");
        JSONArray outLocations = outjo.getJSONArray("location");
        for (int j = 0; j < nodeConstraints.size(); j++) {
            JSONArray nodeConstraint = nodeConstraints.getJSONObject(j).getJSONArray("nodeConstraint");

            String nodeName = JsonElementGetter.getValueString(nodeConstraint, "nodeName");
            String adminState = JsonElementGetter.getValueString(nodeConstraint, "adminState");
            JSONArray nodeKeys = JsonElementGetter.getValueArray(nodeConstraint, "nodeKeys");
            JSONArray nodeKey = JsonElementGetter.getValueArray(nodeKeys, "nodeKey");
            String nodeId = JsonElementGetter.getValueString(nodeKey, "nodeId");
            // System.out.println(nodeName+","+adminState+","+nodeId);

            int xloc = 0;
            int yloc = 0;

            Location devLoc = getLocation(ll, nodeName);
            if (devLoc!=null){
                xloc = devLoc.getX();
                yloc = devLoc.getY();
            }

            JSONObject outNode = new JSONObject();
            outNode.put("name", nodeName);
            outNode.put("description", "");
            outNode.put("nodeType", "lsr-id");
            outNode.put("nodeId", nodeId);
            outNode.put("adminState", adminState);
            outNode.put("x", xloc);
            outNode.put("y", yloc);
            outNodes.add(outNode);
            
            JSONObject outLocation = new JSONObject();
            outLocation.put("name", nodeName);
            outLocation.put("x", xloc);
            outLocation.put("y", yloc);
            outLocations.add(outLocation);
        }
        
        
        //linkInfo
        String linkInfoContent = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"
                + "<rpc message-id=\"1\" xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\">"
                + "<get>"
                + "<filter type=\"subtree\">"
                + "<networkte xmlns=\"http://www.huawei.com/netconf/vrp\" content-version=\"1.0\" format-version=\"1.0\">"
                + "<linkInfos>"
                + "<linkInfo>"
                + "<linkName></linkName>"
                + "<reservableBandwidthBc0></reservableBandwidthBc0>"                
                + "</linkInfo>"
                + "</linkInfos>"
                + "</networkte>"
                + "</filter>"
                + "</get>"
                + "</rpc>";

        String linkInfoResult = myQos.send(linkInfoContent);
        String linkInfoResultJson = PceClient.xmlToJSON(linkInfoResult);
        //System.out.println(linkInfoResultJson);

        JSONObject linkinforesjo = JSONObject.fromObject(linkInfoResultJson);
        if (!linkinforesjo.containsKey("networkte"))
        {
            return outjo.toString();
        }
        JSONArray linkinfoNetworkteArray = linkinforesjo.getJSONArray("networkte");
        
        JSONArray linkinfos = JsonElementGetter.getValueArray(linkinfoNetworkteArray, "linkInfos");
        for (int k = 0; k < linkinfos.size(); k++) {
            JSONArray linkinfo = linkinfos.getJSONObject(k).getJSONArray("linkInfo");
            String linkName = JsonElementGetter.getValueString(linkinfo, "linkName");
            String reservableBandwidthBc0 = JsonElementGetter.getValueString(linkinfo, "reservableBandwidthBc0");
            //System.out.println(linkName+","+reservableBandwidthBc0);
            for(int x = 0; x < outLinks.size(); x++){
                JSONObject jo = (JSONObject) outLinks.get(x);
                if(linkName.equals(jo.get("name"))){
                    jo.put("reservableBandwidthBc0", reservableBandwidthBc0);
                }
            }
        }
        return outjo.toString();
    }

    private static Location getLocation(List<Location> locationlist, String deviceName) {
        Location tmpLocation = null;
        
        for (int i = 0; i < locationlist.size(); i++) {
            if (locationlist.get(i).getName().equals(deviceName)) {
                tmpLocation = locationlist.get(i);
                break;
            }
        }
        return tmpLocation;
    }

//    public static void main(String[] args) {
//        System.out.println(Topology.getToplogy());
//    }

}

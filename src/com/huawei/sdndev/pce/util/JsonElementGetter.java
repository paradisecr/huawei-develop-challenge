package com.huawei.sdndev.pce.util;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * Json解析
 * 
 * @author wangyingying
 * @version 1.0
 * @since 1.6
 */
public class JsonElementGetter {

    public static JSONArray getValueArray(JSONArray lspInfo, String key)
    {
        Object object = getObject(lspInfo, key);
        
        return (JSONArray)object;
    }
    
    
    public static String getValueString(JSONArray lspInfo, String key)
    {
        return getValueString(lspInfo, key, null);
    }
    
    
    public static String getValueString(JSONArray lspInfo, String key, String defaultValue)
    {
        Object object = getObject(lspInfo, key);
        if (object == null)
        {
            return defaultValue;
        }
        return object.toString();
    }
    
    public static Object getObject(JSONArray lspInfo, String key)
    {
        if(lspInfo != null)
        {
            for(int i = 0; i < lspInfo.size(); i++)
            {
                Object object = lspInfo.get(i);
                if (object instanceof JSONObject)
                {
                    JSONObject jsonObject = (JSONObject) object;
                    if (jsonObject.containsKey(key))
                    {
                        return jsonObject.get(key);
                    }
                }
            }
            
        }
        
        return null;
        
    }
}

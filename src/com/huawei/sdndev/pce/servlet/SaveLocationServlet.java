package com.huawei.sdndev.pce.servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.huawei.sdndev.pce.dao.DevicesLocationDao;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;


/**
 * 存储位置信息servlet
 * 
 * @author wangyingying
 * @version 1.0
 * @since 1.6
 */
public class SaveLocationServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doPost(request, response);
    }


    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();

        // 读取请求内容
        BufferedReader br = new BufferedReader(new InputStreamReader(request.getInputStream()));
        String line = null;
        StringBuilder sb = new StringBuilder();
        while((line = br.readLine())!=null){
            sb.append(line);
        }

        // 将资料解码
        String reqBody = sb.toString();
        
        JSONArray ja = JSONArray.fromObject(reqBody);
        DevicesLocationDao.deleteAll();
        for(int i = 0; i < ja.size(); i++){
            JSONObject jo = ja.getJSONObject(i);
            String name = jo.getString("name");
            int x = jo.getInt("x");
            int y = jo.getInt("y");
            
            //System.out.println(reqBody);
            DevicesLocationDao.insert(name, x, y);
        }

        
        
        String jsonStr = "";

        out.write(jsonStr);
        out.flush();
        out.close();

    }

}

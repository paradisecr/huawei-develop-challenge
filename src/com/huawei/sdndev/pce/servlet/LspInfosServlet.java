package com.huawei.sdndev.pce.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.huawei.sdndev.pce.service.LspInfos;

/**
 * 获取隧道信息servlet
 * 
 * @author wangyingying
 * @version 1.0
 * @since 1.6
 */
public class LspInfosServlet extends HttpServlet {
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

    
        String jsonStr = LspInfos.getLspInfos();

        out.write(jsonStr);
        out.flush();
        out.close();

    }

}

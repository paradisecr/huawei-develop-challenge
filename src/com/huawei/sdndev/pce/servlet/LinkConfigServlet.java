package com.huawei.sdndev.pce.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.huawei.sdndev.pce.service.LinkService;

import net.sf.json.JSONObject;

/**
 * 配置链路门限带宽Servlet
 * @author cr
 *
 */
@WebServlet("/linkConfig")
public class LinkConfigServlet extends HttpServlet{
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		response.setContentType("text/html;charset=UTF-8");
		PrintWriter out = response.getWriter();
		
		String limitBwValue = request.getParameter("limitBw");
		Long limitBw = Long.valueOf(limitBwValue);
		String linkName = request.getParameter("linkName");
		JSONObject resultJo = LinkService.updateLinkLimitBw(linkName, limitBw);
		out.write(resultJo.toString());
        out.flush();
        out.close();
	}
	
}
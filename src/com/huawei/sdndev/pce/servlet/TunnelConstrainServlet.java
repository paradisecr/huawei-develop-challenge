package com.huawei.sdndev.pce.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;

import com.huawei.sdndev.pce.service.TunnelService;

import net.sf.json.JSONObject;


/**
 * 下发隧道约束条件Servlet
 * @author cr
 *
 */
@WebServlet("/tunnelConstrain")
public class TunnelConstrainServlet extends HttpServlet{
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
		
		String tunnelName = request.getParameter("tunnelName"); //隧道约束名称
		String description = request.getParameter("description");
		String tnlSource = request.getParameter("tnlSource");
		String setupPriorityVal = request.getParameter("setupPriority");
		String tnlSourceVal = request.getParameter("bandwidth");
		Integer setupPriority = null;
		Long bandwidth = null;
		if (StringUtils.isNotEmpty(setupPriorityVal)) {
			setupPriority = Integer.valueOf(setupPriorityVal);
		}
		if (StringUtils.isNotEmpty(tnlSourceVal)) {
			bandwidth = Long.valueOf(tnlSourceVal);
		}
		JSONObject resultJo = TunnelService.updateTunnelConstrain(tunnelName, tunnelName, description,tnlSource,setupPriority,bandwidth);
		out.write(resultJo.toString());
        out.flush();
        out.close();
	}
	
}
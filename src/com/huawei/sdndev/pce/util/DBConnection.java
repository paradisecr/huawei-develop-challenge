package com.huawei.sdndev.pce.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * 数据库配置信息
 * 
 * @author wangyingying
 * @version 1.0
 * @since 1.6
 */
public class DBConnection {

	private static final String DRIVER_CLASSNAME = "org.sqlite.JDBC";

	private static final String TOPOLOGY_URL = "jdbc:sqlite::resource:topology.db";


	static {
		try {
			Class.forName(DRIVER_CLASSNAME);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
	}

	public static Connection getTopoConn() {
		return getConn(TOPOLOGY_URL);
	}


	public static Connection getConn(String url) {
		Connection conn = null;
		try {
			conn = DriverManager.getConnection(url);
		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		}
		return conn;
	}

	public static void closeCon(Connection conn, ResultSet rs, Statement stmt) {
		if (rs != null) {
			try {
				rs.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
			rs = null;
		}
		if (stmt != null) {
			try {
				stmt.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
			stmt = null;
		}
		if (null != conn) {
			try {
				conn.close();
				conn = null;
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
}

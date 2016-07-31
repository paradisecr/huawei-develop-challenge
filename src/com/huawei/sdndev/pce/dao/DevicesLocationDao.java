package com.huawei.sdndev.pce.dao;

/**
 * 此类用于操作设备位置信息数据库
 * 
 * @author wangyingying
 * @version 1.0
 * @since 1.6
 */
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.huawei.sdndev.pce.bean.Location;
import com.huawei.sdndev.pce.util.DBConnection;

public class DevicesLocationDao {

    /**
     * 从数据库获取所有设备位置信息数据
     * 
     * @return 所有设备位置信息
     */
    public static List<Location> selectAll() {

        List<Location> locationList = new ArrayList<Location>();
        String sql = "select id,name,x,y from topology_nodelocation";
        Connection con = null;
        Statement stmt = null;
        ResultSet rs = null;

        try {
            con = DBConnection.getTopoConn();
            stmt = con.createStatement();
            rs = stmt.executeQuery(sql);

            while (rs.next()) {
                Location location = new Location();
                location.setId(rs.getInt(1));
                location.setName(rs.getString(2));
                location.setX(rs.getInt(3));
                location.setY(rs.getInt(4));
                locationList.add(location);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DBConnection.closeCon(con, rs, stmt);
        }

        return locationList;
    }

    /**
     * 向数据库插入一个设备的位置信息
     * 
     * @param name 设备名称
     * @param x 横坐标
     * @param y 纵坐标
     */
    public static void insert(String name, int x, int y) {

        String inssql = "insert into topology_nodelocation(name,x,y) values(?,?,?)";
        Connection con = null;
        ResultSet rs = null;
        PreparedStatement pstmt = null;

        try {
            con = DBConnection.getTopoConn();
            pstmt = con.prepareStatement(inssql);
            pstmt.setString(1, name);
            pstmt.setInt(2, x);
            pstmt.setInt(3, y);

            pstmt.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DBConnection.closeCon(con, rs, pstmt);
        }

    }

    /**
     * 删除所有设备位置信息
     * 
     */
    public static void deleteAll() {
        String sql = "delete from topology_nodelocation";
        Connection con = null;
        ResultSet rs = null;
        PreparedStatement pstmt = null;

        try {
            con = DBConnection.getTopoConn();
            pstmt = con.prepareStatement(sql);
            pstmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DBConnection.closeCon(con, rs, pstmt);
        }
    }

//    public static void main(String args[]) {
//        //DevicesLocationDao.insert("name", 1, 2);
//        
//        DevicesLocationDao.deleteAll();
//    }
}

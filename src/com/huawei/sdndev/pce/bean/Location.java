package com.huawei.sdndev.pce.bean;

/**
 * 此类用于存储设备的位置信息
 * 
 * @author wangyingying
 * @version 1.0
 * @since 1.6
 */
public class Location {
	private int id;
    private String name;
    private int x;
    private int y;
    
    public Location(){
    	
    }
    
    /**
     * 构造方法,存储设备信息
     * 
     * @param id 设备id
     * @param name 设备名称
     * @param x 横坐标
     * @param y 纵坐标
     */
	public Location(int id,String name, int x, int y) {
		super();
		this.id = id;
		this.name = name;
		this.x = x;
		this.y = y;
	}

	/**
	 * 获取设备id
	 * 
	 * @return 设备id
	 */
	public int getId() {
		return id;
	}

	/**
	 * 设置设备id
	 * 
	 * @param id 设备id
	 */
	public void setId(int id) {
		this.id = id;
	}

	/**
	 * 获取设备名称
	 * 
	 * @return 设备名称
	 */
	public String getName() {
		return name;
	}

	/**
	 * 设置设备名称
	 * 
	 * @param name 设备名称
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * 获取横坐标
	 * 
	 * @return 横坐标
	 */
	public int getX() {
		return x;
	}

	/**
	 * 设置横坐标
	 * 
	 * @param x 横坐标
	 */
	public void setX(int x) {
		this.x = x;
	}

	/**
	 * 获取纵坐标
	 * 
	 * @return 纵坐标
	 */
	public int getY() {
		return y;
	}

	/**
	 * 设置纵坐标
	 * 
	 * @param y 纵坐标
	 */
	public void setY(int y) {
		this.y = y;
	}
	
	
}

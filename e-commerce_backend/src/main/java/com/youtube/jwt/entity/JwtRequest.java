package com.youtube.jwt.entity;

public class JwtRequest {
	
	private String userName;
	private String userPassword;
	
	
	
	public String getUserName() {
		return userName;
	}
	public void setUserNmae(String userName) {
		this.userName = userName;
	}
	public String getUserPassword() {
		return userPassword;
	}
	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}
	

}

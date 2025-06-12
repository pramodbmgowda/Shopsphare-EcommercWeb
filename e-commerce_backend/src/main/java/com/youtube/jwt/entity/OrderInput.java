package com.youtube.jwt.entity;

import java.util.List;

public class OrderInput {
	
	
	private String fullName;
	private String contactNumber;
	private String fullAdrress;
	private String alternatNumber;
	private String  transactionId;
	private List<OrderProductQuantity> orderProductQuantityList;
	
	
	
	
	
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	public String getContactNumber() {
		return contactNumber;
	}
	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}
	public String getFullAdrress() {
		return fullAdrress;
	}
	public void setFullAdrress(String fullAdrress) {
		this.fullAdrress = fullAdrress;
	}
	public String getAlternatNumber() {
		return alternatNumber;
	}
	public void setAlternatNumber(String alternatNumber) {
		this.alternatNumber = alternatNumber;
	}
	public List<OrderProductQuantity> getOrderProductQuantityList() {
		return orderProductQuantityList;
	}
	public void setOrderProductQuantityList(List<OrderProductQuantity> orderProductQuantityList) {
		this.orderProductQuantityList = orderProductQuantityList;
	}
	public String getTransactionId() {
		return transactionId;
	}
	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}
	
	
	
	
	

}

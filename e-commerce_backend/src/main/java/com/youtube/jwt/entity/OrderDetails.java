package com.youtube.jwt.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class OrderDetails {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer orderId;
	private String orderFullName;
	private String orderFullAddress;
	private String orderContactNumber;
	private String orderAlternateNumber;

	private String orderStatus;
	private Double orderAmount;
	
	
	
	@OneToOne
	private Product product;
	@OneToOne
	private User user;
	
	private String  transactionId;
	
	
	
	
	public OrderDetails(String orderFullName, String orderFullAddress, String orderContactNumber,
			String orderAlternateNumber, String orderStatus, Double orderAmount, Product product, User user,
			String transactionId) {

		this.orderFullName = orderFullName;
		this.orderFullAddress = orderFullAddress;
		this.orderContactNumber = orderContactNumber;
		this.orderAlternateNumber = orderAlternateNumber;
		this.orderStatus = orderStatus;
		this.orderAmount = orderAmount;
		this.product = product;
		this.user = user;
		this.transactionId = transactionId;
	}

	public Product getProduct() {
		return product;
	}

	public OrderDetails() {
		
	}





	public void setProduct(Product product) {
		this.product = product;
	}






	public User getUser() {
		return user;
	}






	public void setUser(User user) {
		this.user = user;
	}






	public Integer getOrderId() {
		return orderId;
	}
	public void setOrderId(Integer orderId) {
		this.orderId = orderId;
	}
	public String getOrderFullName() {
		return orderFullName;
	}
	public void setOrderFullName(String orderFullName) {
		this.orderFullName = orderFullName;
	}
	public String getOrderFullAddress() {
		return orderFullAddress;
	}
	public void setOrderFullAddress(String orderFullAddress) {
		this.orderFullAddress = orderFullAddress;
	}
	public String getOrderContactNumber() {
		return orderContactNumber;
	}
	public void setOrderContactNumber(String orderContactNumber) {
		this.orderContactNumber = orderContactNumber;
	}
	public String getOrderAlternateNumber() {
		return orderAlternateNumber;
	}
	public void setOrderAlternateNumber(String orderAlternateNumber) {
		this.orderAlternateNumber = orderAlternateNumber;
	}
	public String getOrderStatus() {
		return orderStatus;
	}
	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}
	public Double getOrderAmount() {
		return orderAmount;
	}
	public void setOrderAmount(Double orderAmount) {
		this.orderAmount = orderAmount;
	}






	public String getTransactionId() {
		return transactionId;
	}






	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}
	
	
	
	
	
	

}

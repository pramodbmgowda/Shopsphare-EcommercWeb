package com.youtube.jwt.entity;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

@Entity
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	
	private Integer productId;
	private String productName;
	
	@Column(length = 5000)
	private String productDescription;
	private double productDiscountedPrice;
	private double productActualPrice;
	
	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "product_images",
	           joinColumns= {
	        		   @JoinColumn(name = "product_id")
	        		   
	           },
	           inverseJoinColumns= {
	        		   @JoinColumn(name = "image_id")
	           }
	
			)
	
	private Set<ImageModel> productImages;
	
	public Set<ImageModel> getProductImages() {
		return productImages;
	}
	public void setProductImages(Set<ImageModel> productImages) {
		this.productImages = productImages;
	}
	
	
	
	
	public double getProductDiscountedPrice() {
		return productDiscountedPrice;
	}
	public void setProductDiscountedPrice(double productDiscountedPrice) {
		this.productDiscountedPrice = productDiscountedPrice;
	}
	public Integer getProductId() {

		return productId;
	}
	public void setProductId(Integer productId) {
		this.productId = productId;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getProductDescription() {
		return productDescription;
	}
	public void setProductDescription(String productDescription) {
		this.productDescription = productDescription;
	}
	
	public double getProductActualPrice() {
		return productActualPrice;
	}
	public void setProductActualPrice(double productActualPrice) {
		this.productActualPrice = productActualPrice;
	}
	
	
	
	
}

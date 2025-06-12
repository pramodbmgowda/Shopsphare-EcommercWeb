package com.youtube.jwt.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.youtube.jwt.entity.cart;
import com.youtube.jwt.service.CartService;

@RestController
public class CartController {
	
	
	@Autowired
	private CartService cartService;
	
	
	
	@PreAuthorize("hasRole('User')")
	@GetMapping({"/addToCart/{productId}"})
	public cart addToCart(@PathVariable(name = "productId")Integer productId) {
		return cartService.addToCart(productId);
		
	}
	
	@PreAuthorize("hasRole('User')")
	@DeleteMapping({"/deleteCartItem/{cartId}"})
	public void deleteCartItem(@PathVariable(name ="cartId")Integer cartId) {
		cartService.deleteCartItem(cartId);
		
	}
	
	@PreAuthorize("hasRole('User')")
	@GetMapping({"/getCartDetails"})
	public  List<cart> getCartDetails() {
		
		return cartService.getDetails();
		
		
	}
	
	

}

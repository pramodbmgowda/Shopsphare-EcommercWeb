package com.youtube.jwt.service;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.youtube.jwt.configuration.JwtRequestFilter;
import com.youtube.jwt.dao.CartDao;
import com.youtube.jwt.dao.ProductDao;
import com.youtube.jwt.dao.UserDao;
import com.youtube.jwt.entity.Product;
import com.youtube.jwt.entity.User;
import com.youtube.jwt.entity.cart;

@Service
public class CartService {

	@Autowired
	private CartDao cartDao;
	
	
	
	@Autowired
	private ProductDao productDao;
	
	@Autowired
	private UserDao userDao;
public void deleteCartItem( Integer cartId) {
	cartDao.deleteById(cartId);
		
	}
	
	
	public cart addToCart(Integer productId) {
		
		Product product = productDao.findById(productId).get();
		
		String username = JwtRequestFilter.CURRENT_USER;
		
		User user =null;
		
		if(username != null) {
		
              user = userDao.findById(username).get();
		}
		
		
	List<cart> cartList = 	cartDao.findByUser(user);
	List<cart> filteredList = cartList.stream().filter(x -> x.getProductId().getProductId() == productId).collect(Collectors.toList());
	
	if(filteredList.size() > 0) {
		return null;
		
	}
		
		if(product != null && user != null) {
			
			cart cart = new cart(product , user);
				
				return cartDao.save(cart);
				

  			
		}
		return null;
		
	}
	
	public List<cart> getDetails(){
		String username = JwtRequestFilter.CURRENT_USER;
		User user = userDao.findById(username).get();
		return cartDao.findByUser(user);		
	}
}

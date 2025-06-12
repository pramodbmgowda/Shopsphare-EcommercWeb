package com.youtube.jwt.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.youtube.jwt.configuration.JwtRequestFilter;
import com.youtube.jwt.dao.CartDao;
import com.youtube.jwt.dao.ProductDao;
import com.youtube.jwt.dao.UserDao;
import com.youtube.jwt.entity.Product;
import com.youtube.jwt.entity.User;
import com.youtube.jwt.entity.cart;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@Service
public class ProductService {
    
	@Autowired
	private ProductDao productDao;
	
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private CartDao cartDao;
	
	

	public Product addNewProduct(Product product) {
		
		return productDao.save(product);
	}
	
	
	public List<Product> getAllProducts(int pageNumber,String searchKey){
		
		Pageable pageable =PageRequest.of(pageNumber, 12);
		
		if(searchKey.equals("")) {
			return(List<Product>)productDao.findAll(pageable);
		}else {
			return productDao.findByProductNameContainingIgnoreCaseOrProductDescriptionContainingIgnoreCase(searchKey, searchKey, pageable);
		}
		
		
		
	}
	
	
	public Product getProductDetailsById(Integer productId) {
		
		return productDao.findById(productId).get();
	}
	
	
	public void deleteProductDetails(Integer productId) {
	    if (!productDao.existsById(productId)) {
	        throw new EntityNotFoundException("Product with ID " + productId + " not found");
	    }
	    productDao.deleteById(productId);
	}
	
	
	public List<Product> getProductDetails( boolean isSingleProductCheckOut ,Integer ProductId) {
		
		if(isSingleProductCheckOut  && ProductId !=0) {
			//we are going to checkout single product
			List<Product> list = new ArrayList<>();
			Product product = productDao.findById(ProductId).get();
			list.add(product);
			return list;
			
			
		}else {
			//we are going to checkout entire cart 
			
		String username =	JwtRequestFilter.CURRENT_USER;
		User user = userDao.findById(username).get();
		List<cart> carts = cartDao.findByUser(user);
		
		return carts.stream().map(x -> x.getProductId()).collect(Collectors.toList());
		
		}
		
		
	}
	
	
	
	
	
	
}
 
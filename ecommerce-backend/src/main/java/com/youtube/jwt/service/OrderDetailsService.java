package com.youtube.jwt.service;

import java.util.ArrayList;
import com.razorpay.*;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.youtube.jwt.configuration.JwtRequestFilter;
import com.youtube.jwt.dao.CartDao;
import com.youtube.jwt.dao.OrderDetailsDao;
import com.youtube.jwt.dao.ProductDao;
import com.youtube.jwt.dao.UserDao;
import com.youtube.jwt.entity.OrderDetails;
import com.youtube.jwt.entity.OrderInput;
import com.youtube.jwt.entity.OrderProductQuantity;
import com.youtube.jwt.entity.Product;
import com.youtube.jwt.entity.TransactionDetails;
import com.youtube.jwt.entity.User;
import com.youtube.jwt.entity.cart;
import com.razorpay.RazorpayClient;
import com.razorpay.Order;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
@Service
public class OrderDetailsService {
	
	
	private static final String OrderPlaced = "placed";
	
	private static final String  KEY ="rzp_test_qypfvqW6OiHjx1";
	private static final String  KEY_SECRET ="8Pltb1fxwQdHxJgQBEtNyV3W";
	private static final String  CURRENCY ="INR";
	
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	private CartDao cartDao;
	
	
	
	@Autowired
	private ProductDao productDao;
	
	@Autowired
	private OrderDetailsDao orderDetailDao;
	
	
	
	
	
	public  TransactionDetails createTransition(Double amount) {
        try {
            RazorpayClient razorPayClient = new RazorpayClient(KEY, KEY_SECRET);

            JSONObject jsonObject = new JSONObject();
            jsonObject.put("amount", amount * 100); // Amount in paise
            jsonObject.put("currency", CURRENCY);

            Order order = razorPayClient.orders.create(jsonObject);
            
          TransactionDetails transactionDeatils = prepareTransactionDetails(order);
          return transactionDeatils;

           
        } catch (Exception e) {
            System.out.println("Error creating order: " + e.getMessage());
        }
        return null;
    }
	
	
	private  TransactionDetails prepareTransactionDetails(Order order) {
		String orderId = order.get("id");
		String currency = order.get("currency");
		Integer amount = order.get("amount");
		
		
		TransactionDetails transactionDetails = new TransactionDetails(orderId,currency,amount,KEY) ;
			
		return transactionDetails;
	}
	
	
	public List<OrderDetails> getOrderDetails() {
		String currentUser= JwtRequestFilter.CURRENT_USER;
		User user = userDao.findById(currentUser).get();
		return orderDetailDao.findByUser(user);
		
		
	}
	public List<OrderDetails> getAllOrderDetails(String status) {
		List<OrderDetails> orderDetails =new ArrayList<>();
		
		
		if(status.equals("All")) {
		
	orderDetailDao.findAll().forEach(
				x -> orderDetails.add(x));
		}else {
			orderDetailDao.findByOrderStatus(status).forEach(
					
					x -> orderDetails.add(x));
			
		}
	
	return  orderDetails;
		
		
	}
	
	
	public void placeOrder(OrderInput orderInput, boolean isCartCheckOut) {
		
		List<OrderProductQuantity> productQuantityList = orderInput.getOrderProductQuantityList();
		
		
		for(OrderProductQuantity o : productQuantityList) {
			
			
			Product product = productDao.findById(o.getProductId()).get();
			
			String currentUsername = JwtRequestFilter.CURRENT_USER;
			
			User user = userDao.findById(currentUsername).get();
			
			OrderDetails orderDetail =new OrderDetails(
					
					
					orderInput.getFullName(),
					orderInput.getFullAdrress(),
					orderInput.getContactNumber(),
					orderInput.getAlternatNumber(),
					OrderPlaced,
					product.getProductDiscountedPrice() * o.getQuantity(),
			        product,
					user,
					orderInput.getTransactionId()
					);
			if (!isCartCheckOut) {
			    List<cart> carts = cartDao.findByUser(user);
			    
			    if (!carts.isEmpty()) {  // Check if there are carts to delete
			        cartDao.deleteAll(carts); // Bulk delete for better performance
			    }
			}
			orderDetailDao.save(orderDetail);  
			
		}
		
	}
	
	public void markOrderAsDelivered(Integer orderId) {
		OrderDetails orderDetail = orderDetailDao.findById(orderId).get();
		
		if(orderDetail != null ) {
			orderDetail.setOrderStatus("Delivered");
			orderDetailDao.save(orderDetail);
		}
		
	}
	
}

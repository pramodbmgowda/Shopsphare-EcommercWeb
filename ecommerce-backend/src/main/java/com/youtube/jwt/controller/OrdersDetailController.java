package com.youtube.jwt.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.youtube.jwt.entity.OrderDetails;
import com.youtube.jwt.entity.OrderInput;
import com.youtube.jwt.entity.TransactionDetails;
import com.youtube.jwt.service.OrderDetailsService;


@RestController
public class OrdersDetailController {
	
	private OrderDetailsService orderDetailsService;
	
	public OrdersDetailController(OrderDetailsService orderDetailsService) {
        this.orderDetailsService = orderDetailsService;
    }

	
	@PreAuthorize("hasRole('User')")
	@PostMapping("/placeOrder/{isCartCheckOut}")
	public void placeOrder(@PathVariable(name = "isCartCheckOut") boolean isCartCheckOut,
	        @RequestBody OrderInput orderInput) {
	    System.out.println("Received Order: " + orderInput);
	    orderDetailsService.placeOrder(orderInput, isCartCheckOut);
	}

	
	
	@PreAuthorize("hasRole('User')")
	@GetMapping({"/getOrderDetail"})
	public List<OrderDetails> getOrderDetail() {
		return orderDetailsService.getOrderDetails();
		
	}
	
	@PreAuthorize("hasRole('Admin')")
	@GetMapping({"/getAllOrderDetail/{status}"})
	public List<OrderDetails> getAllOrderDetail(@PathVariable(name = "status")String status) {
		return orderDetailsService.getAllOrderDetails(status);
	
	}
	
	
	@PreAuthorize("hasRole('Admin')")
	@GetMapping({"/markOrderAsDelivered/{orderId}"})
	public void markOrderAsDelivered(@PathVariable(name = "orderId")Integer orderId) {
		orderDetailsService.markOrderAsDelivered(orderId);
		
	}
	
	
	 @PreAuthorize("hasRole('User')")
	    @GetMapping("/createTransition/{amount}")
	    public TransactionDetails createTransition(@PathVariable("amount") Double amount) {
	        return orderDetailsService.createTransition(amount);  // Call the instance method
	    }
}



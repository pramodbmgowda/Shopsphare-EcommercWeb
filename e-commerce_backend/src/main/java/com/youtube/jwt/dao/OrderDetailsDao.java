package com.youtube.jwt.dao;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.youtube.jwt.entity.OrderDetails;
import com.youtube.jwt.entity.User;


@Repository

public interface OrderDetailsDao extends JpaRepository<OrderDetails, Integer>{
	
	
	public List<OrderDetails> findByUser(User user);
	
	
	public List<OrderDetails> findByOrderStatus(String status);
	

}

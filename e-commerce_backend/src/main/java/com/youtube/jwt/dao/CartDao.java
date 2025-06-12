package com.youtube.jwt.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.youtube.jwt.entity.User;
import com.youtube.jwt.entity.cart;

@Repository
public interface CartDao  extends JpaRepository<cart,Integer> {
	
	public List<cart> findByUser(User user);
		


}

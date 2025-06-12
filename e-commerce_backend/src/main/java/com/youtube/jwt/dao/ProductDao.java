package com.youtube.jwt.dao;



import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.youtube.jwt.entity.Product;

@Repository
public interface ProductDao extends CrudRepository<Product, Integer> {
	public List<Product> findAll(Pageable pageable);
	
	
	public List<Product> findByProductNameContainingIgnoreCaseOrProductDescriptionContainingIgnoreCase(String key1 ,String Key2,Pageable pageable);


}

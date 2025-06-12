package com.youtube.jwt.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.youtube.jwt.entity.ImageModel;
import com.youtube.jwt.entity.Product;
import com.youtube.jwt.service.ProductService;

@RestController
public class ProductController {
	
	
	@Autowired
	private ProductService productService;
	
	
	
	
	@PreAuthorize("hasRole('Admin')")
	@PostMapping(value = {"/addNewProduct"},consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	public Product  addNewProduct(@RequestPart("product") Product product,
			@RequestPart("imageFile")MultipartFile[] file) {
		
		try {
			
			Set<ImageModel> images = uploadImage(file);
			product.setProductImages(images);
			return productService.addNewProduct(product);
			
		}catch(Exception e) {
			System.out.println(e.getMessage());
			
			return null;
		}
		
	}
	
	public Set<ImageModel>  uploadImage(MultipartFile[] multiPartFiles ) throws IOException {
		Set<ImageModel> imageModels = new HashSet<>();
		
		for(MultipartFile file : multiPartFiles) {
			
			ImageModel imageModel  = new ImageModel(
			file.getOriginalFilename(),
			file.getContentType(),
			file.getBytes()
			);
			imageModels.add(imageModel);
			
		}
		
		return imageModels;
		
	}

	@GetMapping("/getAllProducts")
	public List<Product> getAllProducts(@RequestParam(defaultValue = "0")int pageNumber,
			                            @RequestParam(defaultValue = "")String  searchKey){
		return productService.getAllProducts(pageNumber,searchKey);
	}
	
	@GetMapping("/getProductDetailsById/{productId}")
	public Product getProductDetailsById(@PathVariable("productId")Integer productId){
		return productService.getProductDetailsById(productId);
	}
	@PreAuthorize("hasRole('Admin')")
	@DeleteMapping("/deleteProductDetails/{productId}")
	public void deleteProductDetails(@PathVariable("productId") Integer productId) {
		productService.deleteProductDetails(productId);
		
	}
	@PreAuthorize("hasRole('User')")
	@GetMapping("/getProductDetails/{isSingleProductCheckOut}/{productId}")
	public List<Product> getProductDetails(@PathVariable(name = "isSingleProductCheckOut") boolean isSingleProductCheckOut, 
			                      @PathVariable(name = "productId") Integer productId) {
		
		return productService.getProductDetails(isSingleProductCheckOut, productId);
		
	}
	
	
	
}

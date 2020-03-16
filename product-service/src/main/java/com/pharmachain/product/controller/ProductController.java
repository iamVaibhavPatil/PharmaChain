package com.pharmachain.product.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pharmachain.product.domain.Product;
import com.pharmachain.product.exception.ServiceException;
import com.pharmachain.product.service.ProductService;

@RestController
@RequestMapping("/products")
public class ProductController {

	@Autowired
	private ProductService productService;
	
	@GetMapping({"/{productId}"})
	public ResponseEntity<Product> getProduct(@PathVariable String productId) throws ServiceException {
		return new ResponseEntity<Product>(productService.getProduct(productId), HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<Product> addProduct(@RequestBody Product productDTO) throws ServiceException {
		return new ResponseEntity<Product>(productService.addProduct(productDTO), HttpStatus.OK);
	}
	
	@PutMapping({"/{productId}"})
	public ResponseEntity<Product> updateProduct(@PathVariable String productId, @RequestBody Product productDTO) throws ServiceException {
		return new ResponseEntity<Product>(productService.updateProduct(productId, productDTO), HttpStatus.OK);
	}
	
	@DeleteMapping({"/{productId}"})
	public void deleteProduct(@PathVariable String productId) throws ServiceException {
		productService.deleteProduct(productId);
	}
	
	@GetMapping("/search")
	public ResponseEntity<List<Product>> search(@RequestParam(required = true, value = "q") String q) throws ServiceException {
		return new ResponseEntity<List<Product>>(productService.search(q), HttpStatus.OK);
	}
}

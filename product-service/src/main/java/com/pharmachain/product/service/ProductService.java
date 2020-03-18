package com.pharmachain.product.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pharmachain.product.domain.Product;
import com.pharmachain.product.exception.ServiceException;
import com.pharmachain.product.repository.ProductRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ProductService {

	@Autowired
	private ProductRepository productRepository;
	
	public Product getProduct(String productId) throws ServiceException {
		Optional<Product> product = productRepository.findByProductId(productId);
		if(product.isPresent()) {
			return product.get();
		} else {
			log.info("Product not found {} -", productId);
			throw new ServiceException("PS404", "PRODUCT NOT FOUND", HttpStatus.NOT_FOUND);
		}
	}
	
	public List<Product> search(String productName) throws ServiceException {
		List<Product> products = productRepository.findByProductNameContainingIgnoreCase(productName);
		if(products != null && products.size() > 0) { 
			return products;
		} else {
			log.info("Product not found {} -", productName);
			throw new ServiceException("PS404", "PRODUCT NOT FOUND", HttpStatus.NOT_FOUND);
		}
	}
	
	@Transactional
	public Product addProduct(Product product) throws ServiceException {
		
		// Check if Product exist
		if(checkIfProductExist(product.getCompanyName(), product.getProductName())) {
			throw new ServiceException("PS302", "PRODUCT ALREADY EXISTS", HttpStatus.FOUND);
		}
		
		// Create Product
		try {
			product.setProductId(UUID.randomUUID().toString());
			return productRepository.save(product);	
		} catch (Exception ex) {
			log.error("Error occured while creating a product {} -", ex);
			throw new ServiceException("PS910", "PRODUCT CREATION FAILED");
		}
	}

	@Transactional
	public Product updateProduct(String productId, Product product) throws ServiceException {

		Product savedProduct = productRepository.findByProductId(productId).map(p -> {

			// Start -- Map the Updated Product
			p.setProductName(product.getProductName());
			p.setProductDescription(product.getProductDescription());
			p.setCompanyName(product.getCompanyName());
			p.setCategory(product.getCategory());
			p.setPacking(product.getPacking());
			p.setStrength(product.getStrength());
			p.setPrice(product.getPrice());
			p.setIsOTCApproved(product.getIsOTCApproved());
			p.setIngredients(product.getIngredients());
			// End -- Map the Updated Product

			return productRepository.save(p);

		}).orElseThrow(() -> new ServiceException("PS404", "PRODUCT NOT FOUND", HttpStatus.NOT_FOUND));
		
		return savedProduct;
	}

	public void deleteProduct(String productId) throws ServiceException {
		try {
			if(productRepository.findByProductId(productId).isPresent()) {
				productRepository.deleteByProductId(productId);
			} else {
				throw new ServiceException("PS404", "PRODUCT NOT FOUND", HttpStatus.NOT_FOUND);
			}
		} catch (Exception ex) {
			throw new ServiceException("PS500", ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	public boolean checkIfProductExist(String companyName, String productName) {
		return productRepository.findByCompanyNameAndProductName(companyName, productName).isPresent();
	}
}

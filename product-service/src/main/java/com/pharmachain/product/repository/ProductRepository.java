package com.pharmachain.product.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.pharmachain.product.domain.Product;

@Repository
public interface ProductRepository extends MongoRepository<Product, String>{

	Optional<Product> findByProductId(String productId);
	
	void deleteByProductId(String productId);

	List<Product> findByProductNameContainingIgnoreCase(String productName);
	
	Optional<Product> findByCompanyNameAndProductName(String companyName, String productName);
}

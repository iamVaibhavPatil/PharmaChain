package com.pharmachain.gateway.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.pharmachain.gateway.domain.Customer;

@Repository
public interface CustomerRepository extends MongoRepository<Customer, String>{

	public Optional<Customer> findByEmailIgnoreCase(String email);
	
	public Optional<Customer> findByEmailIgnoreCaseAndStoreName(String email, String storeName);
}

package com.pharmachain.gateway.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pharmachain.gateway.domain.Customer;
import com.pharmachain.gateway.domain.Role;
import com.pharmachain.gateway.exception.ServiceException;
import com.pharmachain.gateway.repository.CustomerRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class CustomerService {

	@Autowired
	private CustomerRepository customerRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Transactional
	public Customer addCustomer(Customer customer) throws ServiceException {
		
		// Check If user already exist for the store
		if(checkIfStoreUserExist(customer.getEmail(), customer.getStoreName())) {
			throw new ServiceException("PC302", "USER ALREADY EXISTS FOR THE STORE", HttpStatus.FOUND);
		}
		
		// Check If valid roles provided otherwise default to REGULAR USER
		List<String> roles = customer.getRoles();
		if(roles != null && roles.size() == 0) {
			roles.add(Role.ROLE_STORE_USER.toString());
		}
		
		// Create Store user
		try {
			customer.setCustomerId(UUID.randomUUID().toString());
			customer.setPassword(passwordEncoder.encode(customer.getPassword()));
			return customerRepository.save(customer);	
		} catch (Exception ex) {
			log.error("Error occured while creating a store user {} -", ex);
			throw new ServiceException("PC910", "USER CREATION FAILED");
		}
	}

	public Customer findByEmail(String email) throws ServiceException {
		Optional<Customer> customer = customerRepository.findByEmailIgnoreCase(email);
		if(!customer.isPresent()) {
			throw new ServiceException("PC404", "USER NOT FOUND", HttpStatus.NOT_FOUND);
		}
		return customer.get();
	}
	
	public boolean checkIfStoreUserExist(String email, String storeName) {
		return customerRepository.findByEmailIgnoreCaseAndStoreName(email, storeName).isPresent();
	}
}

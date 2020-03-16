package com.pharmachain.gateway.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pharmachain.gateway.domain.Authentication;
import com.pharmachain.gateway.domain.Customer;
import com.pharmachain.gateway.exception.ServiceException;
import com.pharmachain.gateway.security.JwtTokenProvider;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AuthenticationService {

	@Autowired
	private JwtTokenProvider jwtTokenProvider;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private CustomerService customerService;
	
	@Transactional
	public Authentication registerUser(Authentication authenticationRequest) throws ServiceException {
		Authentication authenticationResponse = new Authentication();
		authenticationResponse.setCustomer(customerService.addCustomer(authenticationRequest.getCustomer()));
		return authenticationResponse;
	}
	
	public Authentication authenticateUser(Authentication authenticationRequest) throws ServiceException {
		Authentication authenticationResponse = new Authentication();
		Customer customer = customerService.findByEmail(authenticationRequest.getCustomer().getEmail());
		if(passwordEncoder.matches(authenticationRequest.getCustomer().getPassword(), customer.getPassword())) {
			authenticationResponse.setCustomer(customer);
			String jwtToken = jwtTokenProvider.generateToken(customer.getEmail(), customer.getRoles());
			authenticationResponse.setJwtToken(jwtToken);
			log.info("Generated new token - {}", jwtToken);
		} else {
			throw new ServiceException("PS360", "PASSWORD DOES NOT MATCH", HttpStatus.UNAUTHORIZED);
		}
		return authenticationResponse;
	}
}

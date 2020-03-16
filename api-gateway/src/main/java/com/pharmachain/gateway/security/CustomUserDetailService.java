package com.pharmachain.gateway.security;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.pharmachain.gateway.domain.Customer;
import com.pharmachain.gateway.exception.ServiceException;
import com.pharmachain.gateway.service.CustomerService;

@Service
public class CustomUserDetailService implements UserDetailsService {
	
	@Autowired
	private CustomerService customerService;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		try {
			Customer customer = customerService.findByEmail(email);
			List<String> roles = customer.getRoles();
			return new UserPrincipal(customer.getEmail(), customer.getPassword(), roles.stream().map(r -> new SimpleGrantedAuthority(r)).collect(Collectors.toList()));
		} catch (ServiceException ex) {
			throw new UsernameNotFoundException(ex.getErrorDescription() + email);
		}
	}
}

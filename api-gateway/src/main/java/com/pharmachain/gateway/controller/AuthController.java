package com.pharmachain.gateway.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pharmachain.gateway.domain.Authentication;
import com.pharmachain.gateway.exception.ServiceException;
import com.pharmachain.gateway.service.AuthenticationService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	private AuthenticationService authenticationService;
	
	@PostMapping("/login")
	public ResponseEntity<Authentication> authenticateUser(@RequestBody Authentication authentication) throws ServiceException {
		return new ResponseEntity<Authentication>(authenticationService.authenticateUser(authentication), HttpStatus.OK);
	}
	
	@PostMapping("/register")
	public ResponseEntity<Authentication> registerUser(@RequestBody Authentication authentication) throws ServiceException {
		return new ResponseEntity<Authentication>(authenticationService.registerUser(authentication), HttpStatus.OK);
	}
}

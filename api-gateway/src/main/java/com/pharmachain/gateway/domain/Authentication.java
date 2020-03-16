package com.pharmachain.gateway.domain;

import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class Authentication {

	@NotNull
	private Customer customer;
	private String jwtToken;
}

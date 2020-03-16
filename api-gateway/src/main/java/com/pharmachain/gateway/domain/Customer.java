package com.pharmachain.gateway.domain;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Document(collection = "customers")
@Data
@EqualsAndHashCode(callSuper = false)
public class Customer extends AuditEntity {
	
	private static final long serialVersionUID = 1L;
	
	@Id
	private String customerId;
	
	@Indexed
	private String email;
	
	private String password;
	
	@Indexed
	private String storeName;

	private String varified;
	private List<String> roles;
}

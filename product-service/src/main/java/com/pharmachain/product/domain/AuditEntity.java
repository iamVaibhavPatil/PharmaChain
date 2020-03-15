package com.pharmachain.product.domain;

import java.io.Serializable;

import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Version;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AuditEntity implements Serializable {

	private static final long serialVersionUID = 2975498148300265695L;

	@CreatedBy
	private String createdBy;
	
	@CreatedDate
	private String createdDate;
	
	@LastModifiedBy
	private String updatedBy;
	
	@LastModifiedDate
	private String updatedDate;
	
	@Version
	private Long version;
}

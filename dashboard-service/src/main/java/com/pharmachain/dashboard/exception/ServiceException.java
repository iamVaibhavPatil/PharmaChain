package com.pharmachain.dashboard.exception;

import org.springframework.http.HttpStatus;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class ServiceException extends Exception {

	private static final long serialVersionUID = 1L;
	private String errorCode;
	private String errorDescription;
	private HttpStatus httpStatus;
	
	public ServiceException() {
		super();
	}
	
	public ServiceException(String errorDescription) {
		super();
		this.errorCode = "P3600";
		this.errorDescription = errorDescription;
	}

	public ServiceException(String errorCode, String errorDescription) {
		super();
		this.errorCode = errorCode;
		this.errorDescription = errorDescription;
	}

	public ServiceException(String errorCode, String errorDescription, HttpStatus httpStatus) {
		super();
		this.errorCode = errorCode;
		this.errorDescription = errorDescription;
		this.httpStatus = httpStatus;
	}
	
	public ServiceException(String errorCode, String errorDescription, Throwable throwable) {
		super(errorDescription, throwable);
		this.errorCode = errorCode;
		this.errorDescription = errorDescription;
	}
}

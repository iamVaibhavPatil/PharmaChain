package com.pharmachain.order.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionsHandler {
	
	private ResponseEntity<ServiceError> buildResponse(ServiceError serviceError) {
		return new ResponseEntity<ServiceError>(serviceError, serviceError.getStatus()); 
	}
	
	@ExceptionHandler(ServiceException.class)
	public ResponseEntity<ServiceError> handleServiceException(ServiceException ex) {
		ServiceError serviceError = null;
		if(ex.getHttpStatus() != null) {
			serviceError = new ServiceError(ex.getHttpStatus());
		} else {
			serviceError = new ServiceError(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		serviceError.setCode(ex.getErrorCode());
		serviceError.setMessage(ex.getErrorDescription());
		return buildResponse(serviceError);
	}
	
	@ExceptionHandler(Exception.class)
	public ResponseEntity<ServiceError> handleException(Exception ex) {
		ServiceError serviceError = new ServiceError(HttpStatus.INTERNAL_SERVER_ERROR);
		serviceError.setCode("PC500");
		serviceError.setMessage(ex.getMessage());
		return buildResponse(serviceError);
	}
}

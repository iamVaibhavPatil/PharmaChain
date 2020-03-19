package com.pharmachain.dashboard.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pharmachain.dashboard.domain.OrderSummary;
import com.pharmachain.dashboard.exception.ServiceException;

@RestController
@RequestMapping("/dashboards")
public class DashboardController {
	
	@GetMapping({"ordersummary/{customerId}"})
	public ResponseEntity<OrderSummary> getOrderSummary(@PathVariable String customerId) throws ServiceException {
		return new ResponseEntity<OrderSummary>(new OrderSummary(), HttpStatus.OK);
	}
}

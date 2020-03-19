package com.pharmachain.dashboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pharmachain.dashboard.domain.OrderSummary;
import com.pharmachain.dashboard.exception.ServiceException;
import com.pharmachain.dashboard.service.OrderService;

@RestController
@RequestMapping("/dashboards")
public class DashboardController {

	@Autowired
	private OrderService orderService;
	
	@PostMapping("/ordersummary")
	public ResponseEntity<OrderSummary> getOrderSummary(@RequestBody OrderSummary orderSummary) throws ServiceException {
		return new ResponseEntity<OrderSummary>(orderService.getOrderSummary(orderSummary), HttpStatus.OK);
	}
}

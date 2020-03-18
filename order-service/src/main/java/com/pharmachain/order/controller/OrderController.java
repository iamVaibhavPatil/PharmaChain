package com.pharmachain.order.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pharmachain.order.domain.Order;
import com.pharmachain.order.exception.ServiceException;
import com.pharmachain.order.service.OrderService;

@RestController
@RequestMapping("/orders")
public class OrderController {

	@Autowired
	private OrderService orderService;
	
	@GetMapping({"/{orderId}"})
	public ResponseEntity<Order> getOrder(@PathVariable String orderId) throws ServiceException {
		return new ResponseEntity<Order>(orderService.getOrder(orderId), HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<Order> addOrder(@RequestBody Order order) throws ServiceException {
		return new ResponseEntity<Order>(orderService.createOrder(order), HttpStatus.OK);
	}
	
	@PutMapping({"/{orderId}"})
	public ResponseEntity<Order> updateOrder(@PathVariable String orderId, @RequestBody Order order) throws ServiceException {
		return new ResponseEntity<Order>(orderService.updateOrder(orderId, order), HttpStatus.OK);
	}
	
	@DeleteMapping({"/{orderId}"})
	public void deleteOrder(@PathVariable String orderId) throws ServiceException {
		orderService.deleteOrder(orderId);
	}
	
	@GetMapping("/history")
	public ResponseEntity<List<Order>> orderHistory(@PathVariable String customerId) throws ServiceException {
		return new ResponseEntity<List<Order>>(orderService.orderHistory(customerId), HttpStatus.OK);
	}
}

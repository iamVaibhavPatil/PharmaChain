package com.pharmachain.order.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pharmachain.order.domain.Order;
import com.pharmachain.order.exception.ServiceException;
import com.pharmachain.order.repository.OrderRepository;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class OrderService {

	@Autowired
	private OrderRepository orderRepository;
	
	public Order getOrder(String orderId) throws ServiceException {
		Optional<Order> order = orderRepository.findByOrderId(orderId);
		if(order.isPresent()) {
			return order.get();
		} else {
			log.info("Order not found {} -", orderId);
			throw new ServiceException("OS404", "ORDER NOT FOUND", HttpStatus.NOT_FOUND);
		}
	}

	public List<Order> orderHistory(String customerId) throws ServiceException {
		List<Order> orders = orderRepository.findByCustomerId(customerId);
		if(orders != null && orders.size() > 0) { 
			return orders;
		} else {
			log.info("Orders not found for customer {} -", customerId);
			throw new ServiceException("OS404", "NO ORDER HISTORY FOUND", HttpStatus.NOT_FOUND);
		}
	}

	@Transactional
	public Order createOrder(Order order) throws ServiceException {

		// Create Order
		try {
			order.setOrderId(UUID.randomUUID().toString());
			return orderRepository.save(order);	
		} catch (Exception ex) {
			log.error("Error occured while creating a order {} -", ex);
			throw new ServiceException("OS910", "ORDER CREATION FAILED");
		}
	}

	@Transactional
	public Order updateOrder(String orderId, Order order) throws ServiceException {

		Order savedOrder = orderRepository.findByOrderId(orderId).map(o -> {

			// Start -- Map the Updated Order
			o.setTotalItems(order.getTotalItems());
			o.setOrderItems(order.getOrderItems());
			o.setOrderAmount(order.getOrderAmount());
			o.setDiscount(order.getDiscount());
			o.setTotalTax(order.getTotalTax());
			o.setShippingCharge(order.getShippingCharge());
			o.setNetPayoutAmount(order.getNetPayoutAmount());
			o.setOrderStatus(order.getOrderStatus());
			// End -- Map the Updated Order

			return orderRepository.save(o);

		}).orElseThrow(() -> new ServiceException("OS404", "ORDER NOT FOUND", HttpStatus.NOT_FOUND));
		
		return savedOrder;
	}

	public void deleteOrder(String orderId) throws ServiceException {
		try {
			if(orderRepository.findByOrderId(orderId).isPresent()) {
				orderRepository.deleteByOrderId(orderId);
			} else {
				throw new ServiceException("OS404", "ORDER NOT FOUND", HttpStatus.NOT_FOUND);
			}
		} catch (Exception ex) {
			throw new ServiceException("OS500", ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}

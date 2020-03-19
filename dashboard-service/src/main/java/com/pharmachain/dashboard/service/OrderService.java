package com.pharmachain.dashboard.service;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.pharmachain.dashboard.domain.OrderSummary;
import com.pharmachain.dashboard.exception.ServiceException;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class OrderService {

	public OrderSummary getOrderSummary(OrderSummary orderSummary) throws ServiceException {
		try {
			orderSummary.setTotal(100);
			orderSummary.setInProgress(10);
			orderSummary.setCancelled(3);
			orderSummary.setCompleted(87);
			orderSummary.setFilterStartDate("01-MAR-2020");
			orderSummary.setFilterEndDate("20-MAR-2020");
			return orderSummary;	
		} catch (Exception e) {
			log.info("Order summary not found for customer {} -", orderSummary.getCustomerId());
			throw new ServiceException("DS404", "NO ORDER SUMMARY", HttpStatus.NOT_FOUND);
		}
	}
}
